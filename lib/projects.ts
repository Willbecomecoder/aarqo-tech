export type ProjectCategory = "websites" | "automation" | "calling-agents" | "chatbots";

export type Project = {
  id: string;
  number: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  tags: string[];
  color: string;
  glow: string;
  liveUrl?: string;
  workflowImage?: string;
  featured?: boolean;
};

export const categoryNames: Record<ProjectCategory, string> = {
  websites: "Websites",
  automation: "Automation",
  "calling-agents": "Calling Agents",
  chatbots: "Chatbots",
};

export const projects: Project[] = [
  {
    id: "voice-ai",
    number: "01",
    title: "Autonomous Voice Calling Bot",
    category: "calling-agents",
    categoryLabel: "AI Voice Intelligence & Twilio Sync",
    description:
      "An AI phone agent that calls your leads, talks naturally like a real person, and books appointments straight into your calendar.",
    tags: ["Twilio Voice", "OpenAI Realtime API", "Node.js", "Python"],
    color: "from-cyan-500 to-blue-600",
    glow: "#00F0FF",
    featured: true,
    workflowImage: "/workflows/ai-calling.jpeg",
  },
  {
    id: "chatbot-engine",
    number: "02",
    title: "24/7 AI Chat Support",
    category: "chatbots",
    categoryLabel: "Multi-Channel AI Support & Vector DB",
    description:
      "Answers customer questions instantly, day or night, so no lead ever waits or slips away.",
    tags: ["Next.js 16", "LangChain", "Pinecone", "Tailwind CSS"],
    color: "from-purple-500 to-pink-600",
    glow: "#A855F7",
    featured: true,
    workflowImage: "/workflows/whatsapp-chatbot.jpeg",
  },
  {
    id: "crm-pipeline",
    number: "03",
    title: "Zero-Manual-Effort Workflow Sync",
    category: "automation",
    categoryLabel: "Operations & CRM Automation",
    description:
      "Multi-step automation pipeline routing lead notifications, syncing HubSpot CRM, and triggering instant WhatsApp followups.",
    tags: ["Make.com", "Zapier", "HubSpot API", "WhatsApp Cloud API"],
    color: "from-blue-500 to-indigo-600",
    glow: "#3B82F6",
    featured: true,
    workflowImage: "/workflows/booking-automation.jpeg",
  },
  {
    id: "webgl-identity",
    number: "04",
    title: "High-Converting 3D Digital Identity",
    category: "websites",
    categoryLabel: "Modern Web & WebGL Design",
    description:
      "Fast, animated, ultra-modern landing page powered by Three.js particle math and GSAP scroll interactions for high conversion.",
    tags: ["Next.js 16", "Three.js", "React Three Fiber", "GSAP"],
    color: "from-pink-500 to-orange-500",
    glow: "#EC4899",
    featured: true,
  },
  {
    id: "solara-pool-club",
    number: "05",
    title: "Solara Pool Club",
    category: "websites",
    categoryLabel: "Hospitality & Resort Web Design",
    description:
      "A cinematic pool club and resort site built to sell the experience and turn visitors into enquiries.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    color: "from-cyan-500 to-blue-600",
    glow: "#00F0FF",
    liveUrl: "https://solarapool.vercel.app/",
  },
  {
    id: "blushbeautypro",
    number: "06",
    title: "BLUSHBEAUTYPRO",
    category: "websites",
    categoryLabel: "Bridal & Beauty Web Design",
    description:
      "A luxury bridal and event makeup artist site that showcases the work and makes it easy for brides to get in touch.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    color: "from-pink-500 to-purple-600",
    glow: "#EC4899",
    liveUrl: "https://bridal-makeup-rouge.vercel.app/",
  },
];
