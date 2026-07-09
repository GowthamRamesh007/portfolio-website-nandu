/**
 * data.js — Central Data Registry for Nandhu's Portfolio
 * All content is sourced from the PowerPoint presentation and matched
 * media files in assests/images, assests/videos, assests/logos, assests/icons
 *
 * IMPORTANT: The assets folder on disk is spelled "assests" (not "assets").
 * All paths reference this exact spelling.
 */

// ─── PROFILE ─────────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Nandhu's",
  fullName: "Nethra Nandhu A C",
  title: "Editor & Designer",
  roles: ["Video Editor", "Graphic Designer", "Visual Storyteller", "Creative Director"],
  tagline: "Blending creativity with precision to bring ideas to life.",
  bio: "I'm Nethra Nandhu A C, an Editor and Designer with a strong passion for visual storytelling. I create visuals that connect with people. My focus is on blending creativity with precision to bring ideas to life in a unique and impactful way.",
  instagramHandle: "@rxne.efx",
  instagramPage: "nandhuuu.yoo",
  instagramUrl: "https://www.instagram.com/rxne.efx",
  email: "nethranandhuac25@gmail.com",
  phone: "+91 9080229122",
  experience: "3+",
  experienceUnit: "Years of Experience",
  backgroundImage: "assests/images/background-intro.webp",
  socialLinks: [
    {
      name: "Instagram",
      url: "https://www.instagram.com/rxne.efx",
      icon: "assests/icons/social-instagram.webp",
      handle: "@rxne.efx"
    },
    {
      name: "Email",
      url: "mailto:nethranandhuac25@gmail.com",
      icon: "assests/icons/social-email.webp",
      handle: "nethranandhuac25@gmail.com"
    },
    {
      name: "Phone",
      url: "tel:+919080229122",
      icon: "assests/icons/social-phone.webp",
      handle: "+91 9080229122"
    }
  ]
};

// ─── CREATIVE JOURNEY / TIMELINE ─────────────────────────────────────────────
const TIMELINE = [
  {
    year: "2022",
    title: "The Beginning",
    description: "Discovered a passion for visual storytelling. Started creating Anime edits, experimenting with pacing, transitions, and colour grading.",
    milestone: "Anime Edits",
    icon: "✦"
  },
  {
    year: "2023",
    title: "Expanding Horizons",
    description: "Ventured into apparel design, creating T-shirt designs for the brand swelix.com. Learned to balance aesthetics with commercial viability.",
    milestone: "T-Shirt Designing @ swelix.com",
    icon: "✦"
  },
  {
    year: "2024",
    title: "Going Freelance",
    description: "Took the leap into freelance work — creating gym edits for Instagram influencers and delivering professional-grade visual content for clients.",
    milestone: "Freelance Projects",
    icon: "✦"
  },
  {
    year: "2025",
    title: "Creative Evolution",
    description: "Continuing to push creative boundaries — mastering cinematic techniques, refining design aesthetics, and building a distinctive visual identity.",
    milestone: "Ongoing Growth",
    icon: "✦"
  }
];

// ─── SOFTWARE SKILLS ──────────────────────────────────────────────────────────
const SOFTWARE_SKILLS = [
  {
    name: "Adobe After Effects",
    logo: "assests/logos/after-effects-logo.png",
    category: "Video Editing",
    proficiency: 90,
    description: "Motion graphics, transitions, VFX compositing"
  },
  {
    name: "CapCut",
    logo: "assests/logos/capcut-logo.png",
    category: "Video Editing",
    proficiency: 95,
    description: "Mobile-first editing, fast cuts, beat sync"
  },
  {
    name: "Topaz Video AI",
    logo: "assests/logos/topaz-logo.png",
    category: "Video Enhancement",
    proficiency: 85,
    description: "AI-powered upscaling and video clarity enhancement"
  },
  {
    name: "Adobe Photoshop",
    logo: "assests/logos/photoshop-logo.png",
    category: "Design",
    proficiency: 88,
    description: "Photo manipulation, poster design, compositing"
  },
  {
    name: "PicsArt",
    logo: "assests/logos/picsart-logo.jpeg",
    category: "Design",
    proficiency: 92,
    description: "Creative editing, stickers, filters, quick design"
  },
  {
    name: "Adobe Premiere Pro",
    logo: "assests/logos/premier-pro-logo.png",
    category: "Video Editing",
    proficiency: 82,
    description: "Professional video editing, colour grading, audio sync"
  }
];

// ─── CREATIVE SKILLS ──────────────────────────────────────────────────────────
const CREATIVE_SKILLS = [
  { name: "Video Editing", icon: "🎬", level: "Expert" },
  { name: "Motion Graphics", icon: "✨", level: "Advanced" },
  { name: "Colour Grading", icon: "🎨", level: "Advanced" },
  { name: "Poster Design", icon: "🖼️", level: "Expert" },
  { name: "T-Shirt Design", icon: "👕", level: "Advanced" },
  { name: "Visual Storytelling", icon: "📽️", level: "Expert" },
  { name: "Transition Design", icon: "⚡", level: "Expert" },
  { name: "Typography", icon: "Aa", level: "Advanced" }
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  // ── VIDEO EDITING ──────────────────────────────────────────────────────────
  {
    id: "gym-edit-1",
    title: "Gym Edit — Influencer Reel #1",
    category: "video-editing",
    categoryLabel: "Video Editing",
    description: "A high-energy gym edit created for an Instagram influencer. Featuring sharp transitions, dynamic pacing, and AI-enhanced footage clarity. Built to stop the scroll and showcase the client's fitness journey.",
    softwareUsed: ["Adobe After Effects", "CapCut", "Topaz Video AI"],
    date: "2024",
    tags: ["Gym Edit", "Instagram Reel", "Transitions", "Fitness"],
    client: "Instagram Influencer",
    featured: true,
    type: "video",
    thumbnail: "assests/images/preview-gym-edit-1.webp",
    video: "assests/videos/media1.mp4",
    images: ["assests/images/preview-gym-edit-1.webp"]
  },
  {
    id: "gym-edit-2",
    title: "Gym Edit — Influencer Reel #2",
    category: "video-editing",
    categoryLabel: "Video Editing",
    description: "A glow-up edit for the influencer's associate — considered my finest edit for a client. Packed with numerous creative transitions, AI-upscaled quality, and a cinematic glow-up narrative arc.",
    softwareUsed: ["Adobe After Effects", "CapCut", "Topaz Video AI"],
    date: "2024",
    tags: ["Gym Edit", "Glow-up", "Instagram", "Cinematic"],
    client: "Instagram Influencer",
    featured: true,
    type: "video",
    thumbnail: "assests/images/preview-gym-edit-2.webp",
    video: "assests/videos/media2.mp4",
    images: ["assests/images/preview-gym-edit-2.webp"]
  },
  {
    id: "vinayagar-edit",
    title: "Vinayagar Chaturthi Celebration Edit",
    category: "video-editing",
    categoryLabel: "Video Editing",
    description: "A heartfelt occasion edit created for a friend celebrating Vinayagar Chaturthi. Blended traditional cultural elements with smooth modern transitions and vibrant colour grading.",
    softwareUsed: ["Adobe After Effects", "CapCut", "Topaz Video AI"],
    date: "2024",
    tags: ["Occasion Edit", "Vinayagar Chaturthi", "Cultural", "Celebration"],
    client: "Personal",
    featured: false,
    type: "video",
    thumbnail: "assests/images/preview-vinayagar-chaturthi.webp",
    video: "assests/videos/media3.mp4",
    images: ["assests/images/preview-vinayagar-chaturthi.webp"]
  },

  // ── POSTERS ───────────────────────────────────────────────────────────────
  {
    id: "symposium-posters",
    title: "College Symposium Posters",
    category: "poster-design",
    categoryLabel: "Poster Design",
    description: "A series of professional event posters designed for my college symposium. Each poster communicates the event's theme through bold typography, vivid imagery, and structured layout — crafted using Picsart and Adobe Photoshop.",
    softwareUsed: ["PicsArt", "Adobe Photoshop"],
    date: "2023",
    tags: ["Poster", "College", "Symposium", "Event Design", "Typography"],
    client: "College",
    featured: true,
    type: "image",
    images: [
      "assests/images/poster-symposium-1.jpeg",
      "assests/images/poster-symposium-2.jpeg",
      "assests/images/poster-symposium-3.jpeg",
      "assests/images/poster-symposium-4.png",
      "assests/images/poster-symposium-5.png"
    ],
    video: null
  },

  // ── T-SHIRT DESIGNS ───────────────────────────────────────────────────────
  {
    id: "tshirt-swelix",
    title: "Apparel Design — Swelix.com",
    category: "tshirt-design",
    categoryLabel: "T-Shirt Design",
    description: "A collection of T-shirt designs created for the apparel brand Swelix.com. Each design balances bold graphic impact with wearable commercial aesthetics — ranging from minimalist line-art to statement typography.",
    softwareUsed: ["Adobe Photoshop", "PicsArt"],
    date: "2023",
    tags: ["T-Shirt", "Apparel", "Brand Design", "Swelix", "Graphic Design"],
    client: "swelix.com",
    featured: true,
    type: "image",
    images: [
      "assests/images/tshirt-design-1.png",
      "assests/images/tshirt-design-2.png",
      "assests/images/tshirt-design-3.png",
      "assests/images/tshirt-design-4.png",
      "assests/images/tshirt-design-5.png",
      "assests/images/tshirt-design-6.png"
    ],
    video: null
  },

  // ── PERSONAL WORKS ────────────────────────────────────────────────────────
  {
    id: "personal-artworks",
    title: "Personal Graphic Artworks",
    category: "personal",
    categoryLabel: "Personal Work",
    description: "A curated selection of personal graphic artworks created for self-expression and creative exploration. These pieces reflect my aesthetic sensibilities beyond client work.",
    softwareUsed: ["Adobe Photoshop", "PicsArt"],
    date: "2022–2025",
    tags: ["Personal", "Artwork", "Graphic Design", "Creative"],
    client: "Self",
    featured: false,
    type: "image",
    images: [
      "assests/images/personal-work-1.webp",
      "assests/images/personal-work-2.webp"
    ],
    video: null
  },
  {
    id: "personal-edits",
    title: "Personal Video Edits — @rxne.efx",
    category: "personal",
    categoryLabel: "Personal Work",
    description: "My personal video editing showcase published on Instagram under @rxne.efx. These edits represent my creative vision without client constraints — experimenting with styles, pacing, and visual effects.",
    softwareUsed: ["Adobe After Effects", "CapCut", "Topaz Video AI"],
    date: "2022–2025",
    tags: ["Personal", "Instagram", "@rxne.efx", "Video Edit", "Creative"],
    client: "Self / Instagram",
    featured: true,
    type: "mixed",
    images: [
      "assests/images/preview-personal-edit-1.webp",
      "assests/images/preview-personal-edit-2.webp",
      "assests/images/preview-personal-edit-3.webp",
      "assests/images/preview-personal-edit-4.webp"
    ],
    videos: [
      { src: "assests/videos/media4.mp4", thumbnail: "assests/images/preview-personal-edit-1.webp" },
      { src: "assests/videos/media5.mp4", thumbnail: "assests/images/preview-personal-edit-2.webp" },
      { src: "assests/videos/media6.mp4", thumbnail: "assests/images/preview-personal-edit-3.webp" },
      { src: "assests/videos/media7.mp4", thumbnail: "assests/images/preview-personal-edit-4.webp" }
    ],
    video: null
  }
];

// ─── STATISTICS ───────────────────────────────────────────────────────────────
const STATISTICS = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Completed" },
  { value: 6, suffix: "", label: "Software Mastered" },
  { value: 100, suffix: "%", label: "Creative Passion" }
];

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" }
];

// ─── MEDIA REGISTRY ───────────────────────────────────────────────────────────
const MEDIA_REGISTRY = {
  images: {
    // Background / Hero
    backgroundIntro: "assests/images/background-intro.webp",

    // Video Thumbnails / Previews
    previewGymEdit1: "assests/images/preview-gym-edit-1.webp",
    previewGymEdit2: "assests/images/preview-gym-edit-2.webp",
    previewVinayagar: "assests/images/preview-vinayagar-chaturthi.webp",
    previewPersonalEdit1: "assests/images/preview-personal-edit-1.webp",
    previewPersonalEdit2: "assests/images/preview-personal-edit-2.webp",
    previewPersonalEdit3: "assests/images/preview-personal-edit-3.webp",
    previewPersonalEdit4: "assests/images/preview-personal-edit-4.webp",

    // Poster Designs
    posterSymposium1: "assests/images/poster-symposium-1.jpeg",
    posterSymposium2: "assests/images/poster-symposium-2.jpeg",
    posterSymposium3: "assests/images/poster-symposium-3.jpeg",
    posterSymposium4: "assests/images/poster-symposium-4.png",
    posterSymposium5: "assests/images/poster-symposium-5.png",

    // T-Shirt Designs
    tshirt1: "assests/images/tshirt-design-1.png",
    tshirt2: "assests/images/tshirt-design-2.png",
    tshirt3: "assests/images/tshirt-design-3.png",
    tshirt4: "assests/images/tshirt-design-4.png",
    tshirt5: "assests/images/tshirt-design-5.png",
    tshirt6: "assests/images/tshirt-design-6.png",

    // Personal Works
    personalWork1: "assests/images/personal-work-1.webp",
    personalWork2: "assests/images/personal-work-2.webp"
  },
  videos: {
    // Freelance Gym Edits
    gymEdit1: "assests/videos/media1.mp4",
    gymEdit2: "assests/videos/media2.mp4",
    vinayagarEdit: "assests/videos/media3.mp4",

    // Personal Edits (@rxne.efx)
    personalEdit1: "assests/videos/media4.mp4",
    personalEdit2: "assests/videos/media5.mp4",
    personalEdit3: "assests/videos/media6.mp4",
    personalEdit4: "assests/videos/media7.mp4"
  },
  logos: {
    afterEffects: "assests/logos/after-effects-logo.png",
    capcut: "assests/logos/capcut-logo.png",
    topaz: "assests/logos/topaz-logo.png",
    photoshop: "assests/logos/photoshop-logo.png",
    picsart: "assests/logos/picsart-logo.jpeg",
    premierePro: "assests/logos/premier-pro-logo.png"
  },
  icons: {
    instagram: "assests/icons/social-instagram.webp",
    email: "assests/icons/social-email.webp",
    phone: "assests/icons/social-phone.webp"
  }
};

// Export as a single global DATA object for app.js to consume
const DATA = {
  profile: PROFILE,
  timeline: TIMELINE,
  softwareSkills: SOFTWARE_SKILLS,
  creativeSkills: CREATIVE_SKILLS,
  projects: PROJECTS,
  statistics: STATISTICS,
  navLinks: NAV_LINKS,
  mediaRegistry: MEDIA_REGISTRY
};
