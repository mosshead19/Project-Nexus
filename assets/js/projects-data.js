// Projects Data
const projects = {
  1: {
    title: "Inventory Management System",
    creator: "Juan Dela Cruz",
    yearLevel: "3rd Year",
    category: "Extension Service",
    projectDate: "January 2026",
    image: "assets/img/portfolio/app-1.jpg",
    images: [
      "assets/img/portfolio/app-1.jpg",
      "assets/img/portfolio/product-1.jpg",
      "assets/img/portfolio/branding-1.jpg",
      "assets/img/portfolio/books-1.jpg"
    ],
    description: `Web-based inventory system for a local hardware store in Puerto Princesa with real-time stock monitoring and sales tracking.`,
    fullDescription: `A comprehensive web-based inventory management system developed for a local hardware store in Puerto Princesa. This project aims to streamline inventory tracking, improve stock management, and provide real-time sales analytics. The system features automated stock alerts, barcode scanning integration, multi-user support with different access levels, and detailed reporting capabilities. It significantly reduced manual inventory errors and improved operational efficiency for the business partner.`,
    technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript", "AJAX"],
    techCategory: "web",
    projectCategory: "extension"
  },
  2: {
    title: "Palawan Tourism Mobile App",
    creator: "Maria Santos",
    yearLevel: "4th Year",
    category: "Member Project",
    projectDate: "December 2025",
    image: "assets/img/portfolio/product-1.jpg",
    images: [
      "assets/img/portfolio/product-1.jpg",
      "assets/img/portfolio/app-1.jpg",
      "assets/img/portfolio/branding-1.jpg"
    ],
    description: `Cross-platform mobile app showcasing tourist destinations in Palawan with interactive maps and booking features.`,
    fullDescription: `This innovative mobile application serves as a comprehensive guide to Palawan's tourist destinations. Features include interactive maps with GPS navigation, detailed information about beaches, dive sites, and attractions, hotel and tour booking integration, user reviews and ratings, and offline map functionality. The app helps tourists discover hidden gems and plan their perfect Palawan adventure while supporting local tourism businesses.`,
    technologies: ["React Native", "Firebase", "Google Maps API", "React Navigation"],
    techCategory: "mobile",
    projectCategory: "member"
  },
  3: {
    title: "PSU Student Portal Enhancement",
    creator: "Pedro Reyes",
    yearLevel: "2nd Year",
    category: "Community",
    projectDate: "November 2025",
    image: "assets/img/portfolio/branding-1.jpg",
    images: [
      "assets/img/portfolio/branding-1.jpg",
      "assets/img/portfolio/product-1.jpg",
      "assets/img/portfolio/app-2.jpg"
    ],
    description: `Improved UI/UX redesign concept for the university student portal with modern interface and better navigation.`,
    fullDescription: `A complete UI/UX overhaul of the existing PSU student portal, focusing on improved user experience, modern design principles, and enhanced navigation. The redesign includes a responsive dashboard, intuitive menu structure, quick access to frequently used features, dark mode support, and mobile-first design approach. User testing showed a 40% improvement in task completion time and higher user satisfaction scores.`,
    technologies: ["Vue.js", "Tailwind CSS", "Node.js", "Express"],
    techCategory: "web",
    projectCategory: "community"
  },
  4: {
    title: "WILMS User Training & On-Premise Deployment",
    creator: "Ross Ivan T. Venturillo, Juan Miguel Malate, Kristine Joy Martinez, Jennifer Rabang",
    yearLevel: "3rd Year",
    category: "Extension Service",
    projectDate: "October 2025",
    image: "assets/img/portfolio/wilms/wilms-1.png",
    images: [
      "assets/img/portfolio/wilms/wilms-1.png",
      "assets/img/portfolio/wilms/wilms-2.png",
      "assets/img/portfolio/wilms/wilms-3.png"
    ],
    description: `WILMS is a collaborative extension project of Project Nexus, developed and deployed in partnership with Palawan State University (PSU), DOST, and Puerto Princesa City MSMEs. Implemented on December 5, 2025 in Puerto Princesa City, the project delivers a practical, production-ready solution for managing inventory and logistics operations of local businesses.
`,
    fullDescription: `The initiative includes user training and on-premise system deployment, allowing MSME partners to adopt digital workflows for tracking stocks and logistics efficiently. Built using modern technologies such as Django, Docker, Git/GitHub, Bootstrap, HTML, and CSS, WILMS provides both Nexians and partner organizations with real-world experience in collaborative development, deployment strategies, and client-facing system implementation.

`,
    technologies: ["Django", "Python", "HTML", "Tailwind CSS", "Git", "Docker", "MySQL"],
    techCategory: "web",
    projectCategory: "extension"
  },
  5: {
    title: "Certificate Mailer System",
    creator: "Reymart Dela Cruz",
    yearLevel: "3rd Year",
    category: "Member Project",
    projectDate: "September 2025",
    image: "assets/img/portfolio/certMailerSystem/mailer-3.jpg",
    images: [
      "assets/img/portfolio/certMailerSystem/mailer-1.png",
      "assets/img/portfolio/certMailerSystem/mailer-2.png",
      "assets/img/portfolio/certMailerSystem/mailer-3.webp"
    ],
    description: `Machine learning model for sentiment analysis of Filipino social media posts using natural language processing.`,
    fullDescription: `An advanced machine learning project that analyzes sentiment in Filipino text, including Tagalog and Taglish (mixed Filipino-English). The system was trained on thousands of social media posts and can accurately classify text as positive, negative, or neutral. Applications include brand monitoring, customer feedback analysis, and social media trend detection. The model achieved 87% accuracy on test data, addressing the unique challenges of Filipino language sentiment analysis.`,
    technologies: ["Python", "Django", "HTML", "CSS", "Git"],
    techCategory: "ai",
    projectCategory: "member"
  },
  6: {
    title: "CodeType: Programming Quiz Game",
    creator: "Carlo Mendoza",
    yearLevel: "2nd Year",
    category: "Community",
    projectDate: "August 2025",
    image: "assets/img/portfolio/product-2.jpg",
    images: [
      "assets/img/portfolio/product-2.jpg",
      "assets/img/portfolio/app-3.jpg",
      "assets/img/portfolio/branding-2.jpg"
    ],
    description: `Educational typing game designed to help students improve coding speed and learn programming syntax.`,
    fullDescription: `An engaging educational game that combines typing practice with programming concept learning. Players type code snippets in various programming languages (Python, Java, JavaScript, C++) as quickly and accurately as possible. Features include difficulty levels, leaderboards, progress tracking, syntax highlighting, and code explanation for each snippet. The game has been used by over 200 students to improve their coding speed and syntax familiarity.`,
    technologies: ["Unity", "C#", "Game Development", "Firebase"],
    techCategory: "game",
    projectCategory: "community"
  },
  7: {
    title: "University Library Management",
    creator: "Sofia Garcia",
    yearLevel: "3rd Year",
    category: "Member Project",
    projectDate: "July 2025",
    image: "assets/img/portfolio/branding-2.jpg",
    images: [
      "assets/img/portfolio/branding-2.jpg",
      "assets/img/portfolio/books-2.jpg",
      "assets/img/portfolio/app-3.jpg"
    ],
    description: `Desktop application for library book lending, returns, and catalog management with barcode scanner integration.`,
    fullDescription: `A robust desktop application designed to modernize library operations. Features include book cataloging with ISBN lookup, barcode scanning for quick checkouts/returns, member management, overdue tracking with fine calculation, book reservations, and detailed reporting. The system can handle thousands of books and members efficiently, with an intuitive interface for librarians. Integration with barcode scanners reduced checkout time by 70%.`,
    technologies: ["Java", "JavaFX", "SQLite", "JasperReports"],
    techCategory: "desktop",
    projectCategory: "member"
  },
  8: {
    title: "Hotel Booking & Management System",
    creator: "Team Nexus",
    yearLevel: "4th Year",
    category: "Extension Service",
    projectDate: "June 2025",
    image: "assets/img/portfolio/books-2.jpg",
    images: [
      "assets/img/portfolio/books-2.jpg",
      "assets/img/portfolio/product-3.jpg",
      "assets/img/portfolio/app-3.jpg"
    ],
    description: `Complete hotel management solution with online booking, room management, and guest check-in/out system.`,
    fullDescription: `A full-featured hotel management system serving as both a customer-facing booking platform and back-office management tool. Customer features include room search with filters, real-time availability, secure online payments, and booking management. Management features include room inventory, housekeeping schedules, guest check-in/out, billing, and comprehensive reports. The system increased direct bookings by 45% and improved operational efficiency for the partner hotel.`,
    technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Express"],
    techCategory: "web",
    projectCategory: "extension"
  },
  9: {
    title: "Smart Classroom IoT System",
    creator: "IoT Team",
    yearLevel: "3rd Year",
    category: "Community",
    projectDate: "May 2025",
    image: "assets/img/portfolio/app-3.jpg",
    images: [
      "assets/img/portfolio/app-3.jpg",
      "assets/img/portfolio/branding-3.jpg",
      "assets/img/portfolio/books-3.jpg"
    ],
    description: `IoT-based classroom automation system for controlling lights, AC, and monitoring environmental conditions.`,
    fullDescription: `An innovative IoT project that transforms traditional classrooms into smart, energy-efficient spaces. The system uses sensors to monitor temperature, humidity, light levels, and occupancy. It automatically controls lighting and air conditioning based on room usage and environmental conditions. A web dashboard provides real-time monitoring and manual controls. The system achieved 35% energy savings in pilot classrooms and improved comfort levels for students and faculty.`,
    technologies: ["Arduino", "Raspberry Pi", "MQTT", "Node.js", "React", "Sensors"],
    techCategory: "iot",
    projectCategory: "community"
  }
};
