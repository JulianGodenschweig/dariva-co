export interface Coach {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  /** Calendly / Google Calendar appointment scheduling link. Leave unset to
   * fall back to a WhatsApp "book by message" button until a real link exists. */
  bookingUrl?: string;
}

// Placeholder roster — replace with Dariva.co's real coaches (photo, bio,
// booking link) before this goes live. Add more entries the same shape.
export const coaches: Coach[] = [
  {
    id: "sheena",
    name: "Sheena A. Schwartz",
    role: "Founder & Lead Coach",
    bio: "Leads Dariva.co's community mental wellness and coaching work across Namibia, Africa.",
  },
];
