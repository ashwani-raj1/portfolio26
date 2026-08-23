// Single source of truth for every piece of content on the site.
// Edit this file to update the portfolio — no component changes needed.

export const profile = {
  name: 'Ashwani Raj',
  role: 'Full-stack & GenAI Engineer',
  location: 'Patna, Bihar, India',
  shortLocation: 'patna, india',
  email: 'ashwaniraj084@gmail.com',
  phone: '+91-9798018523',
  resume: '/Ashwani-Raj-Resume.pdf',
  photo: '/ashwani.jpg',

  // The hero. Keep the headline short — it carries the whole page.
  headline: 'Full-stack engineer who ships under deadline.',
  eyebrow: 'B.Tech CSE · Roorkee Institute of Technology · 2027',
  intro:
    'I build MERN products end to end, and lately AI agents with Gemini, RAG and ChromaDB. Three developer internships, four shipped products, 450+ problems solved, and seven hackathon wins from ten entries.',

  links: [
    { label: 'GitHub', handle: 'ashwani-raj1', href: 'https://github.com/ashwani-raj1' },
    {
      label: 'LinkedIn',
      handle: 'ashwani-raj',
      href: 'https://linkedin.com/in/ashwani-raj-57480028a/',
    },
    {
      label: 'GeeksForGeeks',
      handle: 'ashwanidhry',
      href: 'https://www.geeksforgeeks.org/profile/ashwanidhry',
    },
    { label: 'LeetCode', handle: 'bQrKrXQzSN', href: 'https://leetcode.com/u/bQrKrXQzSN/' },
  ],
}

// Chronological, most recent first. `current: true` gets the live marker.
export const experience = [
  {
    company: 'Prodesk IT',
    title: 'Software Developer Intern',
    period: 'Jul 2026 — Present',
    place: 'Remote',
    current: true,
    points: [
      'Deliver sprint features on schedule inside an Agile team, from ticket to review to release.',
      'Build and maintain a client-facing web application, shipping scalable features and bug fixes.',
    ],
    stack: ['React', 'Node.js', 'Agile'],
  },
  {
    company: 'Zestful Outreach Pvt. Ltd.',
    title: 'Software Developer Intern',
    period: 'Jul 2025 — Sept 2025',
    place: 'Noida',
    points: [
      'Built a responsive React application with reworked UI/UX and cross-browser support, cutting page load time by 30% against client usability targets.',
      'Engineered 10+ database-driven solutions in WordPress with SQL integration and PHP backend logic, reducing data retrieval time by 40%.',
    ],
    stack: ['React', 'PHP', 'SQL', 'WordPress'],
  },
  {
    company: 'Arcoiris Logics',
    title: 'Web Development Intern · Part time',
    period: 'Jul 2025 — Sept 2025',
    place: 'Remote',
    points: [
      'Shipped a web app with secure authentication, a working dashboard, and full form validation.',
      'Built a responsive multi-page portfolio site in React on a reusable component library.',
      'Designed an Instagram-inspired UI in Figma with a consistent design system.',
    ],
    stack: ['React', 'Figma', 'Auth'],
    // Artifacts from the internship, shown as small links under the bullets.
    links: [
      { label: 'Auth app', href: 'https://ashwani-raj1.github.io/ARCOIRIS-LOGICSs/' },
      { label: 'Portfolio site', href: 'https://portfolio-feb-26.vercel.app/' },
      {
        label: 'Instagram UI in Figma',
        href: 'https://www.figma.com/design/9TXce3lblg8ggMqBMjPg28/Instagram-UI?node-id=0-1&p=f&t=jnVeCgOo4Ae288sN-0',
      },
    ],
  },
]

// Add your live URLs to `demo` and `code` — buttons stay hidden while they are empty.
export const projects = [
  {
    name: 'AI Interview Copilot',
    date: 'Aug 2026',
    featured: true,
    summary:
      'An interview assistant that answers questions about my own background, grounded in retrieved context instead of guesswork.',
    points: [
      'Retrieves relevant resume and project context through RAG over ChromaDB, so Gemini answers from evidence rather than inventing detail.',
      'Exposes specialised tools to the model for resume, project and technical-skill lookups via LLM tool calling.',
      'Runs on a FastAPI backend with n8n workflows that schedule interview prep and send automated email.',
    ],
    stack: ['Gemini API', 'RAG', 'ChromaDB', 'FastAPI', 'n8n', 'Embeddings'],
    demo: '',
    code: '',
  },
  {
    name: 'Third-Eye',
    date: 'Apr 2026',
    summary:
      'AI smart glasses for visually impaired users, built around voice as the only interface.',
    points: [
      'Passive Mode answers questions on demand through voice interaction.',
      'Active Mode narrates the environment continuously, identifying objects and assisting navigation.',
      'Offline Mode keeps core assistance working with no internet connection.',
      'Voice-driven UPI payments let users complete secure transactions hands-free.',
    ],
    stack: ['Computer Vision', 'Speech', 'Python', 'UPI', 'Embedded'],
    demo: 'https://youtube.com/watch?v=cIXQx1PoyvY',
    demoLabel: 'Watch the demo',
    code: '',
  },
  {
    name: 'Certificate Validator',
    date: 'May 2026',
    summary:
      'Tamper-proof certificate verification on-chain, so a forged document fails the check instead of passing a human glance.',
    points: [
      'Anchors SHA-256 certificate hashes to Ethereum Sepolia, making any edit detectable.',
      'Verifies uploaded certificate images through OCR before hashing.',
      'Secures the MERN stack with JWT authentication over RESTful APIs and MongoDB.',
    ],
    stack: ['MERN', 'Ethereum Sepolia', 'SHA-256', 'JWT', 'OCR'],
    demo: 'https://certificate-validator-using-blockch.vercel.app/',
    code: '',
  },
  {
    name: 'Wanderlust',
    date: 'Feb 2026',
    summary:
      'A full-stack stay-listing platform, built to get the unglamorous parts right: sessions, validation, error handling.',
    points: [
      'Follows MVC architecture across Express and MongoDB with RESTful APIs throughout.',
      'Handles authentication, authorization, session management and protected routes.',
      'Manages image upload to cloud media storage behind async middleware and input validation.',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Cloudinary'],
    demo: 'https://wanderlust-ilyi.onrender.com/listings',
    code: '',
  },
]

// The hackathon record. `entered` drives the tally cells; each win fills one.
// Every entry here is backed by a certificate or a prize photo elsewhere on the
// page, which is the whole reason the numbers are worth showing.
export const hackathons = {
  entered: 10,
  wins: [
    { event: 'Technomax 2026', host: 'RIT Roorkee', placement: 'winner 1st' },
    { event: 'IgnitionHack 2026', host: 'GBU Greater Noida', placement: 'winner 1st' },
    { event: 'Trikon 2.0', host: 'MIET Meerut', placement: 'winner 1st' },
    { event: 'GeeksforGeeks', host: 'RIT × GFG', placement: 'winner 1st' },
    { event: 'GeeksforGeeks', host: 'RIT × GFG', placement: 'winner 1st' },
    { event: 'Trikon 3.0', host: 'MIET Meerut', placement: '1st runner-up' },
    { event: 'Technomax 2024', host: 'RIT Roorkee', placement: '3rd' },
  ],
}

export const skills = [
  { group: 'Languages', items: ['Java', 'C++', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  {
    group: 'Development',
    items: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Git', 'Docker'],
  },
  {
    group: 'AI / GenAI',
    items: [
      'Gemini API',
      'RAG',
      'ChromaDB',
      'Embeddings',
      'LLM Tool Calling',
      'AI Agents',
      'n8n',
    ],
  },
  { group: 'Familiar with', items: ['Tailwind', 'Firebase', 'Supabase', 'WordPress'] },
  {
    group: 'Coursework',
    items: [
      'Data Structures & Algorithms',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'Compiler Design',
      'Software Engineering',
      'Distributed Systems',
    ],
  },
]

// Shown beside the tally. The hackathon count is deliberately absent — the tally
// already carries it, and repeating it would weaken both.
export const achievements = [
  {
    stat: '500+',
    label: 'problems solved',
    detail: 'Easy through hard on GeeksForGeeks, LeetCode and other online judges.',
  },
  {
    stat: '3',
    label: 'languages certified',
    detail: 'Training in Java, Python and C Programming, certified by IIT Bombay.',
  },
  {
    stat: '75%',
    label: 'AMCAT examination',
    detail: 'Alongside grade A at 83.82% in the Diploma in Computer Application, 2023.',
  },
]

export const roles = [
  {
    title: 'Google Gemini Student Ambassador',
    org: 'Roorkee Institute of Technology',
    period: '2026 — 2027',
    note: 'Representing Gemini on campus: running sessions and helping students build with the API.',
  },
  {
    title: 'Core Team Member',
    org: 'Google Developer Groups, RIT',
    period: 'Current',
    note: 'Organising developer events and workshops for the campus community.',
  },
]

export const education = [
  {
    school: 'Roorkee Institute of Technology (VMSBUTU)',
    qualification: 'B.Tech, Computer Science and Engineering',
    period: '2023 — 2027',
    result: '7.11 CGPA',
  },
  {
    school: 'Prakritik School',
    qualification: 'Intermediate, CBSE',
    period: '2022 — 2023',
    result: '',
  },
  {
    school: 'School of Creative Learning',
    qualification: 'Class X, CBSE',
    period: '2020 — 2021',
    result: '',
  },
]

// ---------------------------------------------------------------------------
// CERTIFICATIONS
//
// Every image lives in `public/certificates/`. `file` is the filename only.
// `kind` decides which group the certificate appears under, and must be one of
// the keys in `certificationGroups` below.
//
// To add one: drop the image in public/certificates/ and add an entry here.
// ---------------------------------------------------------------------------

export const certificationGroups = [
  { kind: 'industry', label: 'Industry simulations & courses' },
  { kind: 'competition', label: 'Hackathons & competitions' },
  { kind: 'campus', label: 'Campus leadership & events' },
]

export const certifications = [
  {
    file: 'jpmorgan-software-engineering.jpg',
    title: 'Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase & Co. · Forage',
    date: 'Apr 2025',
    kind: 'industry',
    note: 'Project setup, Kafka and H2 integration, REST API controllers.',
  },
  {
    file: 'deloitte-data-analytics.jpg',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte · Forage',
    date: 'Apr 2025',
    kind: 'industry',
    note: 'Data analysis and forensic technology tasks.',
  },
  {
    file: 'tata-data-visualisation.jpg',
    title: 'Data Visualisation: Empowering Business with Effective Insights',
    issuer: 'Tata Group · Forage',
    date: 'Apr 2025',
    kind: 'industry',
    note: 'Framing the business scenario through to communicating the analysis.',
  },
  {
    file: 'iit-bombay-java-training.jpg',
    title: 'Java Training',
    issuer: 'Spoken Tutorial Project, IIT Bombay',
    date: 'May 2025',
    kind: 'industry',
    note: 'Scored 87.5% on the remotely invigilated exam. 4 credits.',
  },
  {
    file: 'mongodb-atlas-search.jpg',
    title: 'MongoDB Atlas Search',
    issuer: 'MongoDB, Inc.',
    date: 'Jan 2024',
    kind: 'industry',
    note: '',
  },
  {
    file: 'diploma-computer-application.jpg',
    title: 'Diploma in Computer Application',
    issuer: 'Career Computer Centre, Patna',
    date: 'Jul 2023',
    kind: 'industry',
    note: 'One-year diploma, grade A at 83.82%.',
  },

  {
    file: 'trikon-2-first-place.jpg',
    title: 'Trikon 2.0 — 1st position',
    issuer: 'MIET Meerut',
    date: 'May 2025',
    kind: 'competition',
    note: 'Certificate of Achievement for securing first place.',
  },
  {
    file: 'technomax-2024-third-place.jpg',
    title: 'Technomax 2024 — 3rd position',
    issuer: 'Roorkee Institute of Technology',
    date: 'May 2024',
    kind: 'competition',
    note: '',
  },
  {
    file: 'ignition-hack-2.jpg',
    title: 'Ignition Hack 2.0 — 24-hour hackathon',
    issuer: 'Gautam Buddha University',
    date: 'Apr 2026',
    kind: 'competition',
    note: 'Competed as Team Tech Fungus at Ignition Techfest 2026.',
  },
  {
    file: 'trikon-3-tech-triathlon.jpg',
    title: 'Trikon 3.0 — The Tech Triathlon',
    issuer: 'MIET Meerut',
    date: 'Apr 2026',
    kind: 'competition',
    note: '',
  },
  {
    file: 'hackverse-2024.jpg',
    title: 'HackVerse 2024 — 36-hour marathon coding',
    issuer: "Tula's Institute, Dehradun",
    date: '2024',
    kind: 'competition',
    note: 'National-level competition.',
  },
  {
    file: 'technomax-2025.jpg',
    title: 'Technomax 2025',
    issuer: 'Roorkee Institute of Technology',
    date: 'Jun 2025',
    kind: 'competition',
    note: '',
  },

  {
    file: 'hacksprint-gdg-core-team.jpg',
    title: 'HackSprint — Core Team Member',
    issuer: 'Google Developer Groups OnCampus, RIT Roorkee',
    date: 'Dec 2025',
    kind: 'campus',
    note: 'Ran a two-level open innovation hackathon.',
  },
  {
    file: 'adya-ai-campus-ambassador.jpg',
    title: 'Adya AI Campus Ambassador — Buildathon',
    issuer: 'Adya AI Launch Lab × RIT Roorkee',
    date: 'Dec 2025',
    kind: 'campus',
    note: '',
  },
  {
    file: 'rit-a-thon-coordinator.jpg',
    title: 'RIT-A-THON — Event Coordinator',
    issuer: 'RIT Roorkee × ICT Academy',
    date: 'Mar 2025',
    kind: 'campus',
    note: 'Coordinated a 24-hour marathon coding competition.',
  },
  {
    file: 'rit-mun-2025.jpg',
    title: 'RIT MUN 2025 — Media person',
    issuer: 'Roorkee Institute of Technology',
    date: '2025',
    kind: 'campus',
    note: '',
  },
  {
    file: 'sadrashtra-2025.jpg',
    title: 'Sadrāṣṭra 2025 — Home Minister',
    issuer: 'Roorkee Institute of Technology',
    date: 'Mar 2025',
    kind: 'campus',
    note: '',
  },
]

// ---------------------------------------------------------------------------
// MOMENTS  ·  the section built for you to keep adding to
//
// HOW TO ADD A PHOTO — two steps, no component changes:
//
//   1. Drop the image into  public/moments/
//   2. Copy the block below, paste it into the list, and fill it in.
//
//        {
//          file: 'my-new-photo.jpg',   // filename inside public/moments/
//          group: 'hackathons',        // must match a `kind` in momentGroups
//          caption: 'What happened',   // one line, shown under the photo
//          date: 'Sept 2026',          // free text
//          alt: 'Plain description of what is in the frame',
//          wide: false,                // true = a wider frame, for panoramas
//        },
//
// The order inside each group is the order in that group's strip, newest first
// by convention. Any number of entries works — each group scrolls sideways, so
// adding photos makes the strip longer, never the page taller. An empty group
// disappears, and a photo whose `group` matches nothing still shows up in a
// "More" strip at the end rather than vanishing.
//
// To add a whole new group, add a line to momentGroups and use its `kind`.
// ---------------------------------------------------------------------------

export const momentGroups = [
  { kind: 'hackathons', label: 'Hackathons & prizes' },
  { kind: 'gdg', label: 'Google Developer Groups' },
  { kind: 'campus', label: 'Summits & campus' },
]

export const moments = [
  {
    file: 'technomax-2026-winning-team.jpg',
    group: 'hackathons',
    caption: 'Technomax 2026 — winner, ₹51,000, with the team',
    date: 'Jun 2026',
    alt: 'Four students holding an oversized winner cheque for fifty-one thousand rupees',
    wide: false,
  },
  {
    file: 'technomax-2026-prize-presentation.jpg',
    group: 'hackathons',
    caption: 'The Technomax handover, with faculty and the wider cohort',
    date: 'Jun 2026',
    alt: 'A large group of students and faculty gathered around the winner cheque',
    wide: false,
  },
  {
    file: 'trikon-3-first-runner-up.jpg',
    group: 'hackathons',
    caption: 'Trikon 3.0 — first runner-up as Team Tech Fungus, MIET Meerut',
    date: 'Apr 2026',
    alt: 'Team Tech Fungus on stage with a trophy and a first runner-up cheque for seven thousand five hundred rupees, under a screen reading 1st Runner Up',
    wide: false,
  },
  {
    file: 'ignition-hack-certificates.jpg',
    group: 'hackathons',
    caption: 'Ignition Hack 2.0 at Gautam Buddha University, 24 hours in',
    date: 'Apr 2026',
    alt: 'Four students holding Ignition Hack certificates beside a faculty coordinator',
    wide: false,
  },
  {
    file: 'gfg-hackathon-winners.jpg',
    group: 'hackathons',
    caption: 'GeeksforGeeks hackathon — on the winners’ line',
    date: 'Nov 2025',
    alt: 'Four prize winners holding headphone boxes on stage beside faculty and GeeksforGeeks organisers',
    wide: false,
  },
  {
    file: 'gfg-cohort.jpg',
    group: 'hackathons',
    caption: 'The whole GeeksforGeeks cohort, twelve hours later',
    date: 'Nov 2025',
    alt: 'About twenty-five students in institute blazers grouped together after the event',
    wide: false,
  },
  {
    file: 'technomax-2025-second-prize.jpg',
    group: 'hackathons',
    caption: 'Technomax 2025 — second prize, ₹31,000',
    date: 'Jun 2025',
    alt: 'Seven students holding an oversized second prize cheque for thirty-one thousand rupees in front of Technomax 2025 banners',
    wide: false,
  },
  {
    file: 'trikon-2-winner-team.jpg',
    group: 'hackathons',
    caption: 'Trikon 2.0 — winner as Team Visum, ₹8,400',
    date: 'May 2025',
    alt: 'Team Visum holding a trophy and a Trikon 2.0 winner cheque with their mentor',
    wide: false,
  },
  {
    file: 'trikon-2-stage.jpg',
    group: 'hackathons',
    caption: 'The Trikon 2.0 prize on stage at MIET Meerut',
    date: 'May 2025',
    alt: 'The winning team receiving the Trikon 2.0 trophy and plaque on a decorated stage',
    wide: false,
  },
  {
    file: 'trophy-on-campus.jpg',
    group: 'hackathons',
    caption: 'Trophy back in the lab the next morning',
    date: '2025',
    alt: 'A selfie of three students in a classroom, one holding a small gold trophy',
    wide: false,
  },
  {
    file: 'hackverse-team.jpg',
    group: 'hackathons',
    caption: 'HackVerse 2024 at Tula’s Institute — 36 hours, four of us',
    date: '2024',
    alt: 'Four students with event lanyards on a field at dusk after a marathon coding competition',
    wide: false,
  },

  {
    file: 'gdg-recognition-director.jpg',
    group: 'gdg',
    caption: 'Certificate of Recognition as GDG OnCampus core and founding member',
    date: '2026',
    alt: 'Ashwani Raj receiving a framed Google Developer Groups certificate of recognition from the institute director',
    wide: false,
  },
  {
    file: 'gdg-oncampus-rit-team.jpg',
    group: 'gdg',
    caption: 'GDG OnCampus RIT, at the Google letters on campus',
    date: '2026',
    alt: 'The Google Developer Groups campus team posed at large Google letters outside the Roorkee Institute of Technology building',
    wide: false,
  },
  {
    file: 'gdg-engineers-day-talk.jpg',
    group: 'gdg',
    caption: 'Introducing the GDG OnCampus chapter on Engineer’s Day',
    date: 'Sept 2025',
    alt: 'Ashwani Raj presenting from a lectern with a Google Developer Groups slide projected behind him',
    wide: false,
  },
  {
    file: 'google-campus-rit.jpg',
    group: 'gdg',
    caption: 'Glimpse of GDG Bootcamp',
    date: '2026',
    alt: 'Ashwani Raj standing beside giant Google letters, photographed as a wide panorama',
    wide: false,
  },

  {
    file: 'ai-impact-summit-solo.jpg',
    group: 'campus',
    caption: 'AI Impact Summit, Bharat 2026',
    date: '2026',
    alt: 'Ashwani Raj standing in front of the AI Impact Summit India 2026 backdrop',
    wide: false,
  },
  {
    file: 'ai-impact-summit-team.jpg',
    group: 'campus',
    caption: 'At the summit with the RIT contingent',
    date: '2026',
    alt: 'Three attendees in front of the AI Impact Summit India 2026 backdrop',
    wide: false,
  },
  {
    file: 'uttarakhand-thrive-summit.jpg',
    group: 'campus',
    caption: 'Uttarakhand Thrive Summit, UPES Dehradun',
    date: '2025',
    alt: 'Ashwani Raj in an institute blazer in front of the Uttarakhand Thrive Summit 2025 banner',
    wide: false,
  },
  {
    file: 'sadrashtra-home-minister.jpg',
    group: 'campus',
    caption: 'Sadrāṣṭra 2025 — holding the Home Affairs portfolio',
    date: 'Mar 2025',
    alt: 'Ashwani Raj seated behind a Ministry of Home Affairs placard at a model government simulation',
    wide: false,
  },
]

// A subset of the page's sections. The nav stays short on purpose; the page has
// more sections than it needs to advertise.
export const navLinks = [
  { id: 'record', label: '~/record' },
  { id: 'work', label: '~/work' },
  { id: 'projects', label: '~/projects' },
  { id: 'skills', label: '~/skills' },
  { id: 'certifications', label: '~/proof' },
  { id: 'contact', label: '~/contact' },
]
