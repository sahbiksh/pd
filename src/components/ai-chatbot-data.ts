export type FaqItem = {
  question: string;
  answer: string;
  keywords: string[];
};

export const faqKnowledgeBase: FaqItem[] = [
  {
    question: "What is AI-Solutions?",
    answer:
      "AI-Solutions is a Sunderland-based technology company that provides AI-powered software solutions, virtual assistants, and rapid prototyping services to help businesses improve efficiency and innovation.",
    keywords: ["what is ai solutions", "ai solutions", "about ai solutions", "who are you"],
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer AI-powered virtual assistants, AI-based software prototyping, predictive analytics, digital employee experience optimization, custom AI software development, and AI consulting services.",
    keywords: ["services", "offer", "what do you offer", "service offerings"],
  },
  {
    question: "How can AI help my business?",
    answer:
      "AI can automate repetitive tasks, improve decision-making, enhance customer support, increase productivity, and provide valuable business insights through data analysis.",
    keywords: ["how can ai help", "help my business", "ai help", "business ai"],
  },
  {
    question: "What is an AI virtual assistant?",
    answer:
      "An AI virtual assistant is an intelligent software application that understands user questions and provides instant responses, helping businesses deliver faster support and improved customer experiences.",
    keywords: ["ai virtual assistant", "virtual assistant", "what is ai assistant"],
  },
  {
    question: "What is AI-based prototyping?",
    answer:
      "AI-based prototyping uses intelligent tools to quickly transform ideas into interactive models or software prototypes, allowing businesses to validate concepts before full development.",
    keywords: ["ai-based prototyping", "prototyping", "prototype"],
  },
  {
    question: "How do I request a service?",
    answer:
      "You can submit your project requirements through our Contact Us form, and our team will get back to you with a tailored solution.",
    keywords: ["request a service", "contact us form", "submit project requirements", "request service"],
  },
  {
    question: "Do I need an account to contact AI-Solutions?",
    answer:
      "No. Customers can submit inquiries directly through the Contact Us form without creating an account.",
    keywords: ["need an account", "account to contact", "contact without account"],
  },
  {
    question: "How long does it take to receive a response?",
    answer: "We typically respond to customer inquiries within 24–48 business hours.",
    keywords: ["how long", "response time", "receive a response", "time to respond"],
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work with healthcare, finance, education, retail, manufacturing, logistics, and many other industries.",
    keywords: ["industries", "work with", "industry"],
  },
  {
    question: "Do you provide custom software development?",
    answer:
      "Yes. We design and develop custom AI-powered software solutions based on each client's specific requirements.",
    keywords: ["custom software development", "custom software", "custom development"],
  },
  {
    question: "Can AI-Solutions help startups?",
    answer:
      "Yes. We provide affordable prototyping and consulting services specifically designed to help startups validate and launch their ideas.",
    keywords: ["startups", "help startups", "for startups"],
  },
  {
    question: "How much do your services cost?",
    answer:
      "Pricing depends on project scope, complexity, and requirements. Contact us for a customized quotation.",
    keywords: ["cost", "pricing", "how much", "quote", "quotation"],
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes. We offer maintenance, updates, technical support, and consulting services after deployment.",
    keywords: ["ongoing support", "maintenance", "after project", "support after"],
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We implement industry-standard security practices to protect customer information and project data.",
    keywords: ["data secure", "secure", "security", "data protection"],
  },
  {
    question: "Where is AI-Solutions located?",
    answer: "AI-Solutions is based in Sunderland, United Kingdom.",
    keywords: ["located", "location", "sunderland", "uk", "united kingdom"],
  },
  {
    question: "Do you offer online consultations?",
    answer:
      "Yes. We provide virtual consultations through video meetings and online collaboration platforms.",
    keywords: ["online consultations", "virtual consultations", "video meetings", "online meetings"],
  },
  {
    question: "Can you integrate AI into existing systems?",
    answer:
      "Yes. Our team can integrate AI capabilities into your existing software and business processes.",
    keywords: ["integrate ai", "existing systems", "existing software", "integration"],
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern technologies including Artificial Intelligence, Machine Learning, React.js, Node.js, Python, cloud platforms, and data analytics tools.",
    keywords: ["technologies", "tech stack", "what technologies"],
  },
  {
    question: "How can I stay updated with your latest news?",
    answer:
      "You can visit our Blog and Events pages to stay informed about our latest projects, innovations, and upcoming events.",
    keywords: ["stay updated", "latest news", "blog", "events"],
  },
  {
    question: "How can I contact AI-Solutions?",
    answer:
      "You can use the Contact Us form on our website or reach out through our official email and phone channels.",
    keywords: ["how can i contact", "contact", "contact ai solutions", "contact us"],
  },
];

const genericPrompts = [
  {
    pattern: /\b(hi|hello|hey|good morning|good afternoon|good evening|greetings)\b/i,
    answer:
      "Hello! Welcome to AI-Solutions. How can I help you today? You can ask about our services, AI solutions, pricing, events, or project requirements.",
  },
  {
    pattern: /\b(what services do you provide|which services do you provide|what services|offerings|services do you offer)\b/i,
    answer:
      "AI-Solutions provides AI-powered virtual assistants, custom software development, predictive analytics, AI consulting, digital employee experience optimization, and rapid prototyping services.",
  },
  {
    pattern: /\b(i want a software solution|want a software solution|need a software solution|project requirements|contact us form|let's talk about my project)\b/i,
    answer:
      "Great! Please tell me about your company, project requirements, and goals. You can also submit your details through our Contact Us form, and our team will contact you shortly.",
  },
];

export function getKnowledgeResponse(message: string) {
  const normalized = message.trim().toLowerCase();
  if (!normalized) {
    return "Please tell me how I can help. Ask about our services, pricing, contact options, or AI solutions.";
  }

  for (const prompt of genericPrompts) {
    if (prompt.pattern.test(message)) {
      return prompt.answer;
    }
  }

  const match = faqKnowledgeBase
    .map((item) => {
      const score = item.keywords.reduce((acc, keyword) => acc + (normalized.includes(keyword) ? 1 : 0), 0);
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)[0];

  if (match?.score > 0) {
    return match.item.answer;
  }

  return (
    "I’m here to help with AI-Solutions FAQs. You can ask about our services, pricing, contact details, security, industries, or project support. " +
    "If you'd like, try asking: \"What services do you offer?\" or \"How can I contact AI-Solutions?\""
  );
}
