import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

export class GoogleAuthService {
  private static async loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
    try {
      const content = await fs.readFile(TOKEN_PATH, 'utf8');
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials) as OAuth2Client;
    } catch (err) {
      return null;
    }
  }

  private static async saveCredentials(
    client: OAuth2Client
  ): Promise<void> {
    console.log("CREDENTIALS_PATH",CREDENTIALS_PATH);
    const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  public static async authorize(): Promise<OAuth2Client> {
    let client = await this.loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = (await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    })) as OAuth2Client;
    if (client.credentials) {
      await this.saveCredentials(client);
    }
    return client;
  }

//   public static async listEvents(auth: OAuth2Client): Promise<void> {
//     const calendar = google.calendar({ version: 'v3', auth });
//     const res = await calendar.events.list({
//       calendarId: 'primary',
//       timeMin: new Date().toISOString(),
//       maxResults: 10,
//       singleEvents: true,
//       orderBy: 'startTime',
//     });
//     const events = res.data.items;
//     if (!events || events.length === 0) {
//       console.log('No upcoming events found.');
//       return;
//     }
//     console.log('Upcoming 10 events:');
//     events.forEach((event, i) => {
//       const start =
//         event.start?.dateTime || event.start?.date || 'N/A';
//       console.log(`${start} - ${event.summary}`);
//     });
//   }
}
