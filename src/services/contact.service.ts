import { apiService } from "./api";

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class ContactService {
  async submit(data: ContactSubmission): Promise<{ success: boolean; message?: string }> {
    return apiService.post<{ success: boolean; message?: string }>("/contact", data);
  }
}

export const contactService = new ContactService();