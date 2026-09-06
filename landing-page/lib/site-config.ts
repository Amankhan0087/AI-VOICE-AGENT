export const siteConfig = {
  name: "Voxa AI Receptionist",
  shortName: "Voxa",
  tagline: "The AI voice agent that never lets a call go to voicemail.",
  description:
    "Voxa is an AI voice receptionist that answers every call, books, cancels, and reschedules appointments in natural language, and syncs everything to a live dashboard in real time.",
  url: "https://www.voxa.ai",
  ogImage: "/images/og-cover.png",
  contactEmail: "hello@voxa.ai",
  demoBookingNote: "No credit card required. 20-minute walkthrough with a real setup specialist.",
  social: {
    twitter: "https://twitter.com/voxa_ai",
    linkedin: "https://www.linkedin.com/company/voxa-ai",
    instagram: "https://www.instagram.com/voxa.ai",
  },
  repo: "https://github.com/Amankhan0087/AI-VOICE-AGENT",
};

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const trustStats = [
  { value: "24/7", label: "Call Availability" },
  { value: "<2s", label: "Average Answer Time" },
  { value: "<5 min", label: "Setup Time" },
  { value: "0", label: "Calls Sent to Voicemail" },
];

export const painPoints = [
  {
    title: "Missed calls are missed revenue",
    detail:
      "Every unanswered call is a customer who books with a competitor instead. Front desks can't answer while mid-appointment, after hours, or during lunch.",
  },
  {
    title: "No-shows drain the schedule",
    detail:
      "Manual reminder calls get skipped. Cancellations come in as voicemails nobody hears until the slot is already wasted.",
  },
  {
    title: "Staff time goes to the phone, not the customer in front of them",
    detail:
      "Reception staff juggle in-person guests and ringing phones at once, and one of the two always loses.",
  },
  {
    title: "No visibility into what's happening on the phone",
    detail:
      "Owners have no record of who called, why, or whether the request was ever handled.",
  },
];

export const solutions = [
  {
    title: "Every call answered, instantly, 24/7",
    detail:
      "Voxa picks up in under two seconds, day or night, holidays included, in a natural conversational voice.",
  },
  {
    title: "Automatic reminders and easy rescheduling",
    detail:
      "Callers can confirm, cancel, or reschedule by simply saying so — no hold music, no phone tag.",
  },
  {
    title: "Staff stay focused on who's in front of them",
    detail:
      "Voxa handles the phone entirely, freeing your team to give full attention to walk-ins and in-progress appointments.",
  },
  {
    title: "A live dashboard for every call and booking",
    detail:
      "Every call is logged, transcribed, and synced in real time so you always know what happened and why.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Caller dials in",
    detail:
      "A customer calls your existing business number, any time of day — Voxa answers on the first or second ring.",
  },
  {
    step: "02",
    title: "AI understands intent",
    detail:
      "Using natural language understanding tuned for your business, Voxa figures out whether the caller wants to book, cancel, reschedule, or ask a question.",
  },
  {
    step: "03",
    title: "Action taken in real time",
    detail:
      "Voxa checks live availability and books, cancels, or reschedules the appointment on the spot — no back-and-forth required.",
  },
  {
    step: "04",
    title: "Synced to your dashboard",
    detail:
      "The appointment, transcript, and call recording appear instantly in your dashboard and connected calendar.",
  },
];

export const features = [
  {
    title: "Natural language booking",
    detail:
      "Callers speak normally — \"can I come in Thursday afternoon\" — and Voxa maps it to real availability.",
  },
  {
    title: "Cancellations & rescheduling",
    detail:
      "Handled conversationally, with automatic calendar updates and confirmation messages.",
  },
  {
    title: "Real-time dashboard",
    detail:
      "Live view of every call, transcript, and booking as it happens, from any device.",
  },
  {
    title: "CSV export",
    detail:
      "Export call logs and appointment data any time for reporting or your own systems.",
  },
  {
    title: "Live server status",
    detail:
      "Always-on monitoring so you know your line is covered, with instant alerts if anything needs attention.",
  },
  {
    title: "Secure data handling",
    detail:
      "Call data and customer information are encrypted in transit and at rest, with role-based dashboard access.",
  },
];

export type BillingPeriod = "monthly" | "yearly";

export const pricingTiers: {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}[] = [
  {
    name: "Starter",
    monthlyPrice: 149,
    yearlyPrice: 1430,
    description: "For single-location businesses getting started with AI call handling.",
    features: [
      "Up to 300 calls / month",
      "Natural language booking & rescheduling",
      "Real-time dashboard access",
      "Email support",
      "1 phone number",
    ],
  },
  {
    name: "Growth",
    monthlyPrice: 349,
    yearlyPrice: 3350,
    description: "For growing teams that need higher call volume and deeper integrations.",
    features: [
      "Up to 1,500 calls / month",
      "Everything in Starter",
      "Calendar & CRM integrations",
      "CSV export & custom reporting",
      "Priority support",
      "Up to 3 phone numbers",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    monthlyPrice: 749,
    yearlyPrice: 7190,
    description: "For multi-location businesses with high call volume and custom needs.",
    features: [
      "Unlimited calls",
      "Everything in Growth",
      "Multi-location dashboard",
      "Dedicated onboarding specialist",
      "Custom voice & call flows",
      "SLA-backed support",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "We stopped losing appointments to voicemail the week we turned it on. Our front desk finally gets to focus on the people standing in front of them.",
    name: "Priya Nathan",
    role: "Practice Manager",
    company: "Placeholder Dental Clinic",
  },
  {
    quote:
      "Clients book and reschedule at 10pm and it just works. The dashboard shows me exactly what happened on every call the next morning.",
    name: "Marcus Ibe",
    role: "Owner",
    company: "Placeholder Hair Studio",
  },
  {
    quote:
      "Setup took less time than training a new receptionist, and it never has an off day.",
    name: "Dana Whitfield",
    role: "Office Manager",
    company: "Placeholder Law Group",
  },
];

export const faqs = [
  {
    question: "How long does setup actually take?",
    answer:
      "Most businesses are live in under 5 minutes for a basic configuration. Connecting your calendar, defining your services, and tuning the voice for your business typically takes a short onboarding call with our team.",
  },
  {
    question: "What phone systems and calendars does it integrate with?",
    answer:
      "Voxa forwards from your existing business number, so you keep the number customers already know. It integrates with common scheduling and calendar tools; if you use something custom, our team can scope a direct integration.",
  },
  {
    question: "Is customer data handled securely?",
    answer:
      "Yes. Call data and customer information are encrypted in transit and at rest, access is role-based within your dashboard, and data is never sold or shared with third parties.",
  },
  {
    question: "What industries is this built for?",
    answer:
      "Voxa is used by clinics, salons and spas, law firms, and other appointment-based small and medium businesses — anywhere missed calls and no-shows directly cost revenue.",
  },
  {
    question: "How is pricing determined?",
    answer:
      "Plans are based on monthly call volume and the number of phone lines connected. Every plan includes the full booking, cancellation, and rescheduling feature set — higher tiers add volume, integrations, and support.",
  },
  {
    question: "Can it actually cancel or reschedule an appointment, not just book new ones?",
    answer:
      "Yes. Callers can cancel or reschedule an existing appointment by describing what they want in plain language, and the change is reflected on your calendar and dashboard immediately.",
  },
];

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "Book a Demo", href: "#contact" },
    { label: "Contact", href: `mailto:${siteConfig.contactEmail}` },
  ],
};
