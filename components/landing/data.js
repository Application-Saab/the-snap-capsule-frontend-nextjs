// Copy and image references for the landing page, transcribed from the Figma
// landing page design, frame 10750:5359 (mobile, 393px).
// Images live in /public/landing. Copy is kept as it appears in the design;
// see TODO notes for spots that still need product input.

const img = (name) => `/landing/${name}.png`;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Plans", href: "#plans" },
  { label: "Free Demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
];

export const SMART_FEATURES = [
  { title: "Private Host Locker", text: "Secure & private memory locker.", image: img("feature-private-locker") },
  { title: "Create Galleries", text: "Keep memories safe & organized.", image: img("feature-galleries") },
  { title: "Like, Share", text: "Enjoy, share & save memories.", image: img("feature-like-share") },
  { title: "Face Recognition", text: "Faces tagged automatically.", image: img("feature-face-recognition") },
  { title: "Album Creation", text: "Auto-sorted into My Photos.", image: img("feature-albums") },
  { title: "Add New Photos", text: "Upload photos & videos.", image: img("feature-add-photos") },
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
  { title: "Get The Invite", text: "Your host will share a link via WhatsApp, SMS, or social media.", image: img("guest-invite") },
  { title: "Create Your Profile", text: "Click the link and quickly log in to get started.", image: img("guest-profile") },
  { title: "Share Your Moments", text: "Upload photos, videos, or messages to the event gallery.", image: null },
  { title: "Like & Comment", text: "React to guests’ posts and be part of the celebration.", image: null },
  { title: "Relive the Memories", text: "Enjoy all the shared moments in one place, forever!", image: null },
];

export const DEMO_PERKS = [
  { icon: "bolt", title: "Full Access", text: "Get complete access to all features and tools - no limits.", side: "right", top: 128 },
  { icon: "shield", title: "No Credit Card Required", text: "Just sign up and start exploring for free.", side: "left", top: 186 },
  { icon: "clock", title: "Quick & Easy", text: "It only takes a minute to get started.", side: "right", top: 238 },
  { icon: "cursor", title: "Hands-on Experience", text: "Try it out yourself and see how it fits your needs.", side: "left", top: 270 },
];

export const HOW_IT_WORKS = [
  { title: "Create Capsule", text: "Create your unique Event Capsule in seconds.", image: img("how-create"), bg: "#f6f2fe" },
  { title: "Add Photos", text: "You & your guests upload photos from the event.", image: img("how-add-photos"), bg: "#fdf8f3" },
  { title: "Share Link", text: "Share the link with your guests instantly.", image: img("how-share-link"), bg: "#f5f3fe" },
  { title: "AI Magic", text: "Our AI detects faces and organizes everything.", image: img("how-ai"), bg: "#f1f5fe" },
  { title: "Enjoy Memories", text: "Like, share, download and relive memories.", image: img("how-enjoy"), bg: "#fdf2fa" },
  { title: "Scan QR Code", text: "Share the QR code with your guests to view images.", image: img("how-scan-qr"), bg: "#fff7ec" },
];

// "Baby Shower" has no image yet (cut off at the edge of the Figma frame).
export const OCCASIONS = [
  { label: "Birthday Party", image: img("occ-birthday") },
  { label: "Weddings & Engagements", image: img("occ-wedding") },
  { label: "Corporate Event", image: img("occ-corporate") },
  { label: "Trip & Vacations", image: img("occ-trip") },
  { label: "Baby Shower", image: null },
];

// TODO(content): the design repeats one placeholder review for every card.
// Replace with real customer quotes and names before launch.
export const TESTIMONIALS = [
  {
    name: "Mohit Sharma",
    quote: "You guys did a very great job in preparing everything so quick and making my event happen! Will book next time too.",
    image: img("testimonial-1"),
  },
  {
    name: "Mohit Sharma",
    quote: "You guys did a very great job in preparing everything so quick and making my event happen! Will book next time too.",
    image: img("testimonial-2"),
  },
  {
    name: "Mohit Sharma",
    quote: "You guys did a very great job in preparing everything so quick and making my event happen! Will book next time too.",
    image: null,
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
  appPhone: img("app-phone"),
  heroAvatars: img("hero-avatars"),
  qrPhoto: img("qr-share-photo"),
  qrSteps: img("qr-share-steps"),
  oldWayFolder: img("old-way-folder"),
  capsuleFolder: img("capsule-folder"),
  createCapsuleBox: img("create-capsule-box"),
};
