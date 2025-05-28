// services/googleMeeting.service.ts
import applicationService from '@/modules/application/service/application.service';
import { google } from 'googleapis';
import { Auth } from 'googleapis';

export interface CreateMeetingParams {
  summary: string;
  description?: string;
  startDateTime: string; // ISO string, e.g. '2025-05-27T10:00:00-07:00'
  endDateTime: string;   // ISO string, e.g. '2025-05-27T11:00:00-07:00'
  attendeesEmails?: string[]; // optional list of attendee emails
  location?: string;
  applicationId?: string;
}

export class GoogleMeetingService {
  private auth: Auth.OAuth2Client;

  constructor(auth: Auth.OAuth2Client) {
    this.auth = auth;
  }

  // Create a calendar event (meeting)
  public async createMeeting(params: CreateMeetingParams) {
    const calendar = google.calendar({ version: 'v3', auth: this.auth });

    const event = {
      summary: params.summary,
      description: params.description,
      start: {
        dateTime: params.startDateTime,
        timeZone: 'UTC', // Adjust or accept as parameter
      },
      end: {
        dateTime: params.endDateTime,
        timeZone: 'UTC', // Adjust or accept as parameter
      },
      attendees: params.attendeesEmails?.map(email => ({ email })) || [],
      location: params.location,
      conferenceData: {
        createRequest: {
          requestId: params.applicationId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all',
      conferenceDataVersion: 1,
    });

    console.log("response",response);

    if (params.applicationId) {
        await applicationService.saveMeetingDetails({
          applicationId: params.applicationId,
          eventId: response.data.id || '',
          meetingLink: response.data.htmlLink || '',
          start: params.startDateTime,
          end: params.endDateTime,
          summary: params.summary,
          description: params.description || '',
          attendees: params.attendeesEmails?.map(email => ({ email })) || []
        });
      }

    return response.data;
  }
}
