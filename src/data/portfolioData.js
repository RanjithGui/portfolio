export const portfolioData = {
  navigation: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
    { label: "Skills", href: "#skills" }
  ],
  hero: {
    eyebrow: "Senior Android Developer • Bengaluru, India",
    title:
      "Building premium mobile experiences with cinematic clarity and production-grade Android architecture.",
    description:
      "I design and ship scalable Android products across telecom, automotive, and retail journeys with Kotlin, Jetpack Compose, clean architecture, and a sharp focus on performance, usability, and measurable business outcomes.",
    actions: [
      { label: "View Projects", href: "#projects", variant: "primary" },
      { label: "Contact Me", href: "#contact", variant: "secondary" }
    ],
    metrics: [
      { value: "5+", label: "Years in Android delivery" },
      { value: "30+", label: "Modules shaped at enterprise scale" },
      { value: "~$500K", label: "Projected annual care cost savings" }
    ]
  },
  heroFloatingCards: [
    {
      className: "panel panel-top",
      depth: 0.24,
      rotate: 6,
      eyebrow: "Compose-first UI systems",
      text: "Modernize legacy Android products with faster iteration."
    },
    {
      className: "panel panel-bottom",
      depth: 0.28,
      rotate: -10,
      eyebrow: "Enterprise delivery",
      text: "Billing, onboarding, verification, usage, and customer self-service."
    },
    {
      className: "mini-card mini-card-left",
      depth: 0.22,
      rotate: -14,
      eyebrow: "Stack",
      list: ["Kotlin", "Jetpack Compose", "Hilt + MVVM"]
    },
    {
      className: "mini-card mini-card-right",
      depth: 0.3,
      rotate: 14,
      eyebrow: "Impact",
      list: ["9% spillover reduction", "Performance optimization", "Scalable module architecture"]
    }
  ],
  about: {
    title:
      "Android engineering with product thinking, system depth, and delivery discipline.",
    cards: [
      {
        kicker: "Profile",
        title: "Senior Android Developer based in Bengaluru",
        body:
          "I build resilient mobile experiences for large-scale consumer apps, focusing on architecture that stays maintainable while delivering polished UI and practical business value."
      },
      {
        kicker: "Approach",
        title: "Clean code, clear journeys, measurable outcomes",
        body:
          "My work spans feature ownership, modernization, performance tuning, onboarding flows, secure document experiences, and customer self-service journeys."
      }
    ],
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "MVVM",
      "Hilt",
      "Clean Architecture",
      "Retrofit",
      "GitLab CI/CD",
      "Jira",
      "GitHub Copilot",
      "Agile"
    ],
    highlights: [
      {
        id: "01",
        title: "Enterprise-scale telecom delivery",
        body:
          "Led critical billing and account-management modules across T-Mobile and Verizon ecosystems."
      },
      {
        id: "02",
        title: "Modern Android migration",
        body:
          "Helped shift product surfaces from XML-heavy UI into Jetpack Compose-driven experiences."
      },
      {
        id: "03",
        title: "User journeys that reduce support load",
        body:
          "Built flows that improve discoverability, self-service, and lower operational friction."
      }
    ]
  },
  projects: {
    title:
      "Selected mobile work shaped for scale, clarity, and customer impact.",
    items: [
      {
        variant: "billing",
        title: "T-Life Billing Hub",
        description:
          "Led one of the most critical modules in a 30+ module Android application, simplifying billing journeys and enabling better self-service access for customers.",
        stack: ["Kotlin", "Compose", "MVVM", "Hilt"],
        actions: [
          { label: "Discuss This Project", href: "#contact" },
          { label: "GitHub Profile", href: "https://github.com/ranjithgui", external: true }
        ]
      },
      {
        variant: "retail",
        title: "Retail Check-In Flow",
        description:
          "Developing in-store visit preparation and queue reduction experiences that connect digital journeys to retail support.",
        stack: ["Kotlin", "Android", "Customer Experience"],
        actions: [
          { label: "See Work History", href: "#resume" },
          { label: "Discuss This Project", href: "#contact" }
        ]
      },
      {
        variant: "auto",
        title: "Toyota i-Connect Onboarding",
        description:
          "Built registration and ownership verification experiences, then delivered a multi-step onboarding journey from verification to successful app entry.",
        stack: ["Onboarding", "Verification", "UX Flow"],
        actions: [
          { label: "Discuss This Project", href: "#contact" },
          {
            label: "Connect on LinkedIn",
            href: "https://www.linkedin.com/in/ranjith-anthoti/",
            external: true
          }
        ]
      },
      {
        variant: "verizon",
        title: "Verizon App Modernization",
        description:
          "Supported modernization from legacy XML layouts toward a more modern Compose-based UI approach while improving performance for data-heavy billing and usage screens.",
        stack: ["Jetpack Compose", "Performance", "Scalability"],
        actions: [
          { label: "View My Stack", href: "#about" },
          { label: "Discuss This Project", href: "#contact" }
        ]
      },
      {
        variant: "staycured",
        title: "StayCured — Health & Wellness App",
        description:
          "A cross-platform health and wellness application built under Techunity, connecting users with curated wellness content, appointment scheduling, and personalised health tracking. Delivered end-to-end feature ownership from architecture design to production release.",
        stack: ["React Native", "TypeScript", "Node.js", "REST APIs", "Techunity"],
        actions: [
          { label: "Discuss This Project", href: "#contact" },
          {
            label: "Connect on LinkedIn",
            href: "https://www.linkedin.com/in/ranjith-anthoti/",
            external: true
          }
        ]
      }
    ]
  },
  resume: {
    title:
      "Experience grounded in modern Android delivery, architecture, and product execution.",
    summaryTitle: "Senior Android Developer with enterprise product depth",
    summary:
      "Strong experience across Kotlin, Jetpack Compose, clean architecture, dependency injection, and customer-facing mobile flows that balance UI quality with operational impact.",
    downloadHref: "/assets/Ranjith-Anthoti-Resume.pdf",
    timeline: [
      {
        date: "Mar 2023 – Present",
        title: "Senior Android Developer • Infosys Ltd, Bengaluru",
        body:
          "Leading billing and retail experiences in the T-Life ecosystem, including feature ownership across critical customer journeys in a 30+ module Android application."
      },
      {
        date: "May 2022 – Mar 2023",
        title: "Senior Android Developer • GlobalLogic, Bengaluru",
        body:
          "Worked on Verizon Android modernization with Jetpack Compose, scalable data handling, and enterprise-quality compliance across billing and usage screens."
      },
      {
        date: "Jun 2021 – Apr 2022",
        title: "Android Developer • TechUnity, Coimbatore",
        body:
          "Built a comprehensive healthcare app (StayCured) covering online consultations, COVID-19 triage, vital sign tracking, medication management, family profiles, and Razorpay payment integration. Integrated and customised open-source pregnancy and menstruation tracking modules. Stack: Java, XML, Android SDK, REST APIs, Firebase, Razorpay, Git."
      },
      {
        date: "Sep 2020 – May 2021",
        title: "Android Developer • Atidhi Innovative Solutions, Hyderabad",
        body:
          "Developed a healthcare app enabling pharmaceutical purchases, appointment scheduling, diagnostic test booking, and video consultations. Engineered an OTT service with ADDBOX integration and implemented video watermarking via ADDONAD for content protection. Stack: Java, XML, Android SDK, REST APIs, ADDBOX, ADDONAD, Firebase, Git."
      }
    ]
  },
  contact: {
    title:
      "Let’s build mobile products that feel polished, fast, and genuinely useful.",
    panelTitle:
      "Available for senior Android engineering opportunities and product collaborations.",
    email: "nanilukso@gmail.com",
    phone: "+91 9346281040",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ranjith-anthoti/" },
      { label: "GitHub", href: "https://github.com/ranjithgui" }
    ]
  }
};
