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
    amount: 199, // INR, used for structured data
    // TODO(pricing): prices other than INR are placeholders (≈ the INR price,
    // rounded). Set the real price for each currency before launch.
    prices: { INR: 199, USD: 2.49, EUR: 1.99, SAR: 8.99, CNY: 15.99, JPY: 349, KRW: 3300, THB: 79, IDR: 35000, MYR: 9.9 },
    period: "year",
    cta: "Choose Annual Plan →",
  },
  {
    name: "Single Capsule Plan",
    variant: "(Photos & Videos)",
    features: ["Photos & Videos", "Up to 1500 Photos", "Annual Renewal"],
    amount: 399, // INR, used for structured data
    prices: { INR: 399, USD: 4.99, EUR: 3.99, SAR: 17.99, CNY: 32.99, JPY: 699, KRW: 6500, THB: 159, IDR: 69000, MYR: 19.9 },
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

// "What is Snap Capsule?" section: plain-language copy for people (and
// search engines) looking for an event photo sharing app. Every statement
// here matches what the rest of the page already promises; update both
// together if a feature changes.
export const ABOUT = {
  title: "The event photo sharing app for every celebration",
  intro: [
    "Snap Capsule collects every photo from your event in one private online album, called an Event Capsule. Create a capsule, share one link or QR code with your guests, and everyone adds the photos they took. No more chasing pictures across WhatsApp groups, Drive links and camera rolls.",
    "Our AI face recognition sorts the photos for you, so every guest can find the pictures they appear in within seconds. Weddings, birthdays, corporate events, trips and baby showers: every memory stays together, organized and easy to relive.",
  ],
  points: [
    {
      icon: "qr",
      title: "Collect photos from every guest",
      text: "Share your capsule by link on WhatsApp, SMS or social media, or put the QR code on a table card. Guests join in seconds and upload their photos and videos.",
    },
    {
      icon: "face",
      title: "Find your photos with face recognition",
      text: "AI detects faces and sorts photos into albums automatically, so nobody has to scroll through thousands of pictures to find themselves.",
    },
    {
      icon: "lock",
      title: "One private album per event",
      text: "Each event gets its own private capsule. Only the people you share your link or QR code with can join, and you stay in control as the host.",
    },
    {
      icon: "globe",
      title: "Made for events around the world",
      text: "Snap Capsule works in any modern browser, and the site is available in 15 languages, so friends and family can join from anywhere.",
    },
  ],
  keywords: [
    "Wedding photo sharing",
    "Birthday party photos",
    "Corporate event photos",
    "Baby shower photos",
    "Trip & vacation albums",
    "QR code photo sharing",
  ],
};

// Answers stick to what the page already states (plans, features, demo).
// The same text is published as FAQPage structured data for Google.
// Only answered questions are shown; leave `a` as FAQ_PLACEHOLDER to hide one.
export const FAQ_PLACEHOLDER = "Answer coming soon — reach out to our team and we’ll help you right away.";
export const FAQS = [
  {
    q: "What is Snap Capsule?",
    a: "Snap Capsule is an event photo sharing app. You create a private Event Capsule for your celebration, share it with a link or QR code, and you and your guests upload every photo to one place. AI face recognition then helps everyone find the photos they appear in.",
  },
  {
    q: "How do guests add photos to my event?",
    a: "Share your capsule link on WhatsApp, SMS or social media, or let guests scan your QR code. They open the link, log in quickly, and upload their photos (and videos on the Photos & Videos plan) straight to your event gallery.",
  },
  {
    q: "How does face recognition help me find my photos?",
    a: "Our AI detects the faces in uploaded photos and sorts them automatically, so you can see every photo featuring you without scrolling through the whole event.",
  },
  {
    q: "Is my event capsule private?",
    a: "Yes. Every event gets its own private capsule, and only the people you share your link or QR code with can join it. As the host, your photos are kept in your private host locker.",
  },
  {
    q: "How many photos can I add to one capsule?",
    a: "Each Single Capsule Plan includes one Event Capsule with up to 1,500 photos, and every guest you invite can upload to it.",
  },
  {
    q: "Can guests upload videos too?",
    a: "Yes, with the Single Capsule Plan (Photos & Videos). The Photos Only plan is for pictures.",
  },
  {
    q: "How much does Snap Capsule cost?",
    a: "There are two yearly plans: Photos Only, and Photos & Videos. Both include one Event Capsule and renew every year. See the Plans section on this page for the current price in your currency.",
  },
  {
    q: "Can I try it before I pay?",
    a: "Yes. The free demo gives you full access to all features, and no credit card is required. It only takes a minute to get started.",
  },
  {
    q: "Which events can I use Snap Capsule for?",
    a: "Any event where people take photos: weddings and engagements, birthday parties, corporate events, trips and vacations, baby showers, reunions and more.",
  },
  {
    q: "Can I download and share the photos?",
    a: "Yes. You and your guests can like, share and download photos from the capsule and relive the memories together.",
  },
  {
    q: "Can I use Snap Capsule outside India?",
    a: "Yes. Snap Capsule works in any modern web browser, wherever you and your guests are. Use the language menu at the top of the page to switch between 15 languages and regions.",
  },
].filter((f) => f.a && f.a !== FAQ_PLACEHOLDER);

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