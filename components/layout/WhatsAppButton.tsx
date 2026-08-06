import { contact } from "@/lib/content";

/**
 * WhatsApp is the default way people reach an organisation in Namibia, so it
 * gets a persistent affordance rather than being buried on the contact page.
 */
export function WhatsAppButton() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message Dariva.co on WhatsApp at ${contact.phone}`}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-black/25 transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <svg
        width="27"
        height="27"
        viewBox="0 0 32 32"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16 2C8.27 2 2 8.27 2 16c0 2.44.65 4.73 1.79 6.72L2 30l7.5-1.96A13.93 13.93 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.19 19.19c-.3.84-1.75 1.61-2.4 1.71-.62.1-1.41.14-4.07-.87-3.44-1.24-5.65-4.74-5.82-4.96-.17-.22-1.4-1.86-1.4-3.55 0-1.69.88-2.52 1.19-2.86.31-.34.68-.43.91-.43h.65c.21 0 .5-.08.77.59.3.73 1.01 2.48 1.1 2.66.09.18.14.4.03.64-.11.24-.17.39-.34.6l-.51.6c-.17.17-.35.36-.15.7.2.34.9 1.48 1.93 2.4 1.33 1.18 2.44 1.55 2.78 1.72.34.17.54.14.74-.08.2-.22.85-1 1.08-1.34.22-.34.45-.28.77-.17.31.11 1.99.94 2.33 1.11.34.17.57.25.65.4.09.14.09.8-.21 1.63z" />
      </svg>
    </a>
  );
}
