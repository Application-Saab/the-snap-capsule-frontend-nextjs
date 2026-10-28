// Copy and image references for the landing page, transcribed from the Figma
// landing page design, frame 10750:5359 (mobile, 393px).
// Images live in /public/landing. Copy is kept as it appears in the design;
// see TODO notes for spots that still need product input.

const img = (name, ext = "png") => `/landing/${name}.${ext}`;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Plans", href: "#plans" },
  { label: "Free Demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
];

export const SMART_FEATURES = [
  { title: "Private Host Locker", text: "Secure & private memory locker.", image: img("feature-private-locker", "webp") },
  { title: "Create Galleries", text: "Keep memories safe & organized.", image: img("feature-galleries", "webp") },
  { title: "Like, Share", text: "Enjoy, share & save memories.", image: img("feature-like-share", "webp") },
  { title: "Face Recognition", text: "Faces tagged automatically.", image: img("feature-face-recognition", "webp") },
  { title: "Album Creation", text: "Auto-sorted into My Photos.", image: img("feature-albums", "webp") },
  { title: "Add New Photos", text: "Upload photos & videos.", image: img("feature-add-photos", "webp") },
];

export const OLD_WAY = [
  ["Photos Get Lost", "Memories scattered across phones & chats"],
  ["WhatsApp Storage Fills Up", "Important photos get deleted with old chats"],
  ["No Easy Photo Search", "Finding one photo means scrolling through thousands"],
  ["Everyone Has Different Photos", "No one has the complete collection"],
  ["Links & Files Expire", "Drive links get lost, blocked or forgotten"],
  ["Memories Fade Over Time", "Photos stay buried across devices"],
];

export const CAPSULE_WAY = [
  ["All Photos in One Place", "Every guest uploads to one private event space"],
  ["Unlimited Guest Uploads", "Collect every special moment from everyone"],
  ["AI Face Recognition", "Find every photo featuring you instantly"],
  ["Complete Event Memories", "Bring everyone’s moments together"],
  ["One Private Event Link", "Share once and give everyone easy access"],
  ["Memories Stay Forever", "Keep your event memories safe and accessible"],
];

export const PLANS = [
  {
    name: "Single Capsule Plan",
    variant: "(Photos Only)",
    features: ["1 Event Capsule", "Up to 1500 Photos", "Annual Renewal"],
    price: "₹199/-",
    amount: 199, // INR, used for structured data
    period: "year",
    cta: "Choose Annual Plan →",
  },
  {
    name: "Single Capsule Plan",
    variant: "(Photos & Videos)",
    features: ["Photos & Videos", "Up to 1500 Photos", "Annual Renewal"],
    price: "₹399/-",
    amount: 399, // INR, used for structured data
    period: "year",
    cta: "Choose Annual Plan →",
  },
];

// Cards 3–5 have no image yet: they sit outside the Figma frame's visible
// area and could not be exported. Drop the files into /public/landing with
// these names and set `image` to show them.
export const GUEST_STEPS = [
  { title: "Get The Invite", text: "Your host will share a link via WhatsApp, SMS, or social media.", image: img("guest-invite","webp") },
  { title: "Create Your Profile", text: "Click the link and quickly log in to get started.", image: img("guest-profile","webp") },
  { title: "Share Your Moments", text: "Upload photos, videos, or messages to the event gallery.", image:img("guest-moment","webp") },
  { title: "Like & Comment", text: "React to guests’ posts and be part of the celebration.", image: img("guest-like-comment","webp") },
  { title: "Relive the Memories", text: "Enjoy all the shared moments in one place, forever!", image: img("guest-memories","webp")},
];

export const DEMO_PERKS = [
  { icon: "bolt", title: "Full Access", text: "Get complete access to all features and tools - no limits.", side: "right", top: 120 },
  { icon: "shield", title: "No Credit Card Required", text: "Just sign up and start exploring for free.", side: "left", top: 155 },
  { icon: "clock", title: "Quick & Easy", text: "It only takes a minute to get started.", side: "right", top: 210 },
  { icon: "cursor", title: "Hands-on Experience", text: "Try it out yourself and see how it fits your needs.", side: "left", top: 240 },
];

export const HOW_IT_WORKS = [
  { title: "Create Capsule", text: "Create your unique Event Capsule in seconds.", image: img("how-create","webp"), bg: "#f6f2fe" },
  { title: "Add Photos", text: "You & your guests upload photos from the event.", image: img("how-add-photos","webp"), bg: "#fdf8f3" },
  { title: "Share Link", text: "Share the link with your guests instantly.", image: img("how-share-link","webp"), bg: "#f5f3fe" },
  { title: "AI Magic", text: "Our AI detects faces and organizes everything.", image: img("how-ai","webp"), bg: "#f1f5fe" },
  { title: "Enjoy Memories", text: "Like, share, download and relive memories.", image: img("how-enjoy","webp"), bg: "#fdf2fa" },
  { title: "Scan QR Code", text: "Share the QR code with your guests to view images.", image: img("how-scan-qr","webp"), bg: "#fff7ec" },
];

// "Baby Shower" has no image yet (cut off at the edge of the Figma frame).
export const OCCASIONS = [
  { label: "Birthday Party", image: img("occ-birthday","webp") },
  { label: "Weddings & Engagements", image: img("occ-wedding","webp") },
  { label: "Corporate Event", image: img("occ-corporate","webp") },
  { label: "Trip & Vacations", image: img("occ-trip","webp") },
  { label: "Baby Shower", image:  img("occ-babyshower","webp") },
];

// TODO(content): the design repeats one placeholder review for every card.
export const TESTIMONIALS = [
 {
    name: "Neha Gupta",
    quote: "All our guests uploaded their photos in one place. Every moment of my sister's wedding is now safe in one capsule!",
    image: img("testimonial-1", "webp"),
  },
  {
    name: "Rajesh Kumar",
    quote: "The face recognition is amazing. I found every photo of my family from the event within a few seconds.",
    image: img("testimonial-2", "webp"),
  },
  {
    name: "Amit Verma",
    quote: "Very easy to set up and share. The QR code worked perfectly and everyone loved reliving the party together.",
    image: img("testimonial-3", "webp"),
  },
];

// TODO(content): these questions come from the Figma file as-is and look
// carried over from a balloon-decoration site. The design has no
// answers, so each one shows a placeholder until real copy is added.
// FAQ structured data is only emitted for answers that differ from this
// placeholder, so search engines never see unfinished copy.
export const FAQ_PLACEHOLDER = "Answer coming soon — reach out to our team and we’ll help you right away.";
export const FAQS = [
  "How much does balloon decoration cost at home?",
  "Do you offer same-day and midnight balloon decoration?",
  "It's a surprise. How do you manage that without giving it away?",
  "What kinds of balloons do you use?",
  "Will the setup fit my room, and can I change the theme?",
  "Do you decorate venues and offices, or only homes?",
  "Is balloon decoration safe around babies and small children?",
  "Which cities does Snap Capsule cover?",
  "How long does the setup take, and do you clean up afterward?",
].map((q) => ({ q, a: FAQ_PLACEHOLDER }));

export const IMAGES = {
  appPhone: img("app-phone","webp"),
  heroAvatars: img("hero-avatars"),
  qrPhoto: img("qr-share-photo","webp"),
  qrSteps: img("qr-share-steps"),
  oldWayFolder: img("old-way-folder","webp"),
  capsuleFolder: img("capsule-folder","webp"),
  createCapsuleBox: img("create-capsule-box","webp"),
};

export const AVATARS = [
  { initials: "A", color: "#F4A261" },
  { initials: "R", color: "#2A9D8F" },
  { initials: "S", color: "#E76F51" },
  { initials: "M", color: "#8E7DBE" },
];