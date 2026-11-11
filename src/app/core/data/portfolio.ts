// ==============================================================================
// Portfolio content (Figma file wZ1jyt3CQqqzOmgHZY4BfH, page 98:2)
// Every user-facing string carries an English and a French version.
// ==============================================================================

export type Lang = 'en' | 'fr';
export type Localized = Record<Lang, string>;

export interface ContactLink {
  label: Localized;
  href: string | Localized;
  icon: 'mail' | 'linkedin' | 'github' | 'download';
  external?: boolean;
  download?: boolean;
}

export interface ProjectLink {
  label: Localized;
  href: string;
}

export interface Project {
  name: string;
  status: 'live' | 'development';
  tagline: Localized;
  description: Localized;
  stack: string[];
  platform: string;
  // Without links the card offers "Ask about it", which opens an email.
  links: ProjectLink[];
}

export interface TimelineEntry {
  year: string;
  dates: Localized;
  badge: string;
  badgeTone: 'brand' | 'neutral';
  role: Localized;
  organization: string;
  // Optional one-sentence overview shown under the role.
  summary?: Localized;
  bullets?: Localized[];
  // Named projects within a role, each with bullet points or a short paragraph.
  projects?: TimelineProject[];
}

export interface TimelineProject {
  title: Localized;
  bullets?: Localized[];
  body?: Localized;
}

export interface CaseStudy {
  title: Localized;
  summary: Localized;
  cover: string;
  // Transparent artwork is centred on this background instead of filling the frame.
  coverBackground?: string;
  // Set when the study has its own article page.
  path?: string;
}

export interface ArticleFigure {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  caption?: Localized;
  // Widest the figure is shown at, from the Figma layout.
  maxWidth: number;
  // Device artwork with its own shape: no frame, radius or shadow.
  plain?: boolean;
  // Show only part of the screenshot: a framed window onto a larger image,
  // with the image's box given as percentages of the frame.
  crop?: {
    frameWidth: number;
    frameHeight: number;
    background: string;
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

// Two phone screens side by side, each with a short label, and one caption below.
export interface ArticleScreenPair {
  screens: { src: string; width: number; height: number; label: Localized; alt: Localized }[];
  caption: Localized;
}

export interface ArticleSection {
  title: Localized;
  paragraphs: Localized[];
  figures?: ArticleFigure[];
  pair?: ArticleScreenPair;
  link?: { label: Localized; href: string };
}

export interface CaseArticle {
  slug: string;
  title: Localized;
  // A product subtitle switches the opening to the larger title treatment (Figma 124:46).
  subtitle?: Localized;
  intro: Localized;
  role: Localized;
  hero: ArticleFigure;
  sections: ArticleSection[];
}

// A degree or certificate on the About page: what it is, then where and when.
export interface Credential {
  title: Localized;
  detail: Localized;
}

export interface FolderThumb {
  image?: string;
  badge?: string;
  badgeTone?: 'brand' | 'neutral';
}

export interface FolderLink {
  path: string;
  label: Localized;
  shape: 'landscape' | 'round' | 'portrait';
  thumbs: FolderThumb[];
}

const IMG = {
  analytix: 'assets/images/analytix-mobile.png',
  maconformite: 'assets/images/Maconformite.png',
  telecomaroc: 'assets/images/telecomaroc.png',
  marginalia: 'assets/images/marginalia.png',
  dwaya: 'assets/images/dwaya.png',
  al9anat: 'assets/images/al9anat.png',
};

const ANALYTIX_APP_STORE = 'https://apps.apple.com/ma/app/analytix/id6753986118';
const ANALYTIX_GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.inforisk.analytix';
const MACONFORMITE_URL = 'https://beta.maconformite.ma/';
const ANCORA_URL = 'https://ancora.ma/';

export const PROFILE = {
  name: 'Mohammed Ktite',
  email: 'ktite.m3@gmail.com',
  avatar: 'assets/figma/avatar.png',
  timeZone: 'Africa/Casablanca',
  location: { en: 'Casablanca, Morocco', fr: 'Casablanca, Maroc' } satisfies Localized,
  greeting: { en: 'Hi, I’m Mohammed', fr: 'Bonjour, je suis Mohammed' } satisfies Localized,
  bio: {
    en: 'Full-Stack Web & Mobile Developer, from UI/UX design to production deployment. I build useful, intuitive applications with a strong focus on code quality and user experience. I prototype in Figma, ship mobile apps with Flutter to the App Store and Google Play, and build web platforms with Angular and Spring Boot.',
    fr: 'Développeur Full-Stack Web & Mobile, du design UI/UX à la mise en production. Je crée des applications utiles et intuitives, avec une attention particulière à la qualité du code et à l’expérience utilisateur. Je prototype sur Figma, publie des applications Flutter sur l’App Store et Google Play, et développe des plateformes web avec Angular et Spring Boot.',
  } satisfies Localized,
  contactPrompt: {
    en: 'Feel free to reach out to me through any of the channels below.',
    fr: 'N’hésitez pas à me contacter via l’un des canaux ci-dessous.',
  } satisfies Localized,
  credit: {
    en: 'Built with care, in Casablanca',
    fr: 'Fait avec soin, à Casablanca',
  } satisfies Localized,
};

const EMAIL: ContactLink = { label: { en: 'Email', fr: 'E-mail' }, href: `mailto:${PROFILE.email}`, icon: 'mail' };
const LINKEDIN: ContactLink = {
  label: { en: 'LinkedIn', fr: 'LinkedIn' },
  href: 'https://linkedin.com/in/mohammed-ktite',
  icon: 'linkedin',
  external: true,
};
const GITHUB: ContactLink = {
  label: { en: 'GitHub', fr: 'GitHub' },
  href: 'https://github.com/MedKtite',
  icon: 'github',
  external: true,
};
const CV: ContactLink = {
  label: { en: 'Download CV', fr: 'Télécharger le CV' },
  href: { en: 'assets/cv/Mohammed-Ktite-CV-EN.pdf', fr: 'assets/cv/Mohammed-Ktite-CV-FR.pdf' },
  icon: 'download',
  download: true,
};

export const HOME_LINKS: ContactLink[] = [EMAIL, LINKEDIN, GITHUB, CV];
export const FOOTER_LINKS: ContactLink[] = [EMAIL, LINKEDIN, GITHUB];

export const PROJECT_STATUS = {
  live: { en: 'Live', fr: 'En ligne' },
  development: { en: 'In development', fr: 'En développement' },
} satisfies Record<Project['status'], Localized>;

const VISIT: Localized = { en: 'Visit website', fr: 'Voir le site' };

export const PROJECTS: Project[] = [
  {
    name: 'MaConformite',
    status: 'live',
    tagline: { en: 'Anti-Money Laundering Compliance', fr: 'Conformité anti-blanchiment' },
    description: {
      en: 'AML compliance for Moroccan accounting firms under law 43-05: sanctions and PEP screening, KYC, and ready-made reports for ANRF inspections.',
      fr: 'La conformité LBC pour les cabinets comptables marocains au titre de la loi 43-05 : filtrage sanctions et PPE, KYC et rapports prêts pour les contrôles de l’ANRF.',
    },
    stack: ['Angular 18', 'Spring Boot'],
    platform: 'Web / SaaS',
    links: [{ label: VISIT, href: MACONFORMITE_URL }],
  },
  {
    name: 'Ancora',
    status: 'development',
    tagline: { en: 'Turnkey US LLC & Entity Registration', fr: 'Création clé en main de LLC américaines' },
    description: {
      en: 'End-to-end automated US company formation in Wyoming and New Mexico. Facilitates rapid LLC registration, direct IRS EIN procurement, registered agent provisioning, and corporate banking setup.',
      fr: 'Création automatisée de bout en bout de sociétés américaines au Wyoming et au Nouveau-Mexique : immatriculation rapide de LLC, obtention de l’EIN auprès de l’IRS, agent enregistré et ouverture de compte bancaire professionnel.',
    },
    stack: ['Automated EIN', 'Stripe Pay', 'US Entity'],
    platform: 'Web / SaaS',
    links: [{ label: VISIT, href: ANCORA_URL }],
  },
  {
    name: 'Marginalia',
    status: 'development',
    tagline: { en: 'Distraction-Free Reading & Annotation', fr: 'Lecture et annotation sans distraction' },
    description: {
      en: 'Native digital reading companion engineered for iOS and Android. Renders at 60fps in Flutter with instant pagination and offline caching. Includes offline library sync, custom typography, and cross-device annotation capture.',
      fr: 'Compagnon de lecture natif pour iOS et Android. Rendu à 60 ips en Flutter, pagination instantanée et cache hors ligne. Synchronisation de la bibliothèque hors ligne, typographie personnalisée et annotations sur tous les appareils.',
    },
    stack: ['Flutter v3.27', 'iOS & Android', 'Offline Sync'],
    platform: 'iOS, Android',
    links: [],
  },
  {
    name: 'Al9anat',
    status: 'live',
    tagline: { en: 'High-Concurrency Content & Video Hub', fr: 'Plateforme de contenus et vidéos à forte charge' },
    description: {
      en: 'Scalable digital media platform and interactive content streaming network. Streams live video with sub-second latency across web and mobile, with content directory indexing.',
      fr: 'Plateforme média évolutive et réseau de diffusion de contenus interactifs. Vidéo en direct avec une latence inférieure à la seconde sur web et mobile, et indexation de l’annuaire des contenus.',
    },
    stack: ['Edge CDN', 'HLS Video', 'High Scale'],
    platform: 'Web, Mobile',
    links: [{ label: VISIT, href: 'https://al9anat.com' }],
  },
  {
    name: 'Analytix Mobile',
    status: 'live',
    tagline: { en: 'Real-Time App Telemetry & Cohorts', fr: 'Télémétrie et cohortes en temps réel' },
    description: {
      en: 'Executive intelligence dashboard for mobile product teams. Real-time active user telemetry, subscription revenue tracking, crash diagnostics, and instant anomaly alerting.',
      fr: 'Tableau de bord décisionnel pour les équipes produit mobile : utilisateurs actifs en temps réel, suivi des revenus d’abonnement, diagnostic des plantages et alertes d’anomalies instantanées.',
    },
    stack: ['Real-Time BI', 'PostgreSQL', 'Push Alerts'],
    platform: 'iOS, Android',
    links: [
      { label: { en: 'App Store', fr: 'App Store' }, href: ANALYTIX_APP_STORE },
      { label: { en: 'Google Play', fr: 'Google Play' }, href: ANALYTIX_GOOGLE_PLAY },
    ],
  },
  {
    name: 'Telecomaroc',
    status: 'live',
    tagline: { en: 'Morocco Telecom Guide & Comparator', fr: 'Guide et comparateur télécom au Maroc' },
    description: {
      en: 'The leading digital benchmark and consumer portal for Moroccan telecom services. Independent network coverage checks, real-time Fibre/4G/5G rate plan comparisons, and ISP guides.',
      fr: 'Le portail de référence des services télécom au Maroc : vérification indépendante de la couverture réseau, comparaison en temps réel des offres Fibre/4G/5G et guides des fournisseurs d’accès.',
    },
    stack: ['Plan Compare', 'Coverage Map', 'High Traffic'],
    platform: 'Web',
    links: [],
  },
  {
    name: 'Kooralife',
    status: 'live',
    tagline: { en: 'Moroccan Sports News & Live Scores', fr: 'Actualité sportive marocaine et scores en direct' },
    description: {
      en: 'Moroccan sports news site updated around the clock: live match scores, fixtures, league tables, top scorers, video highlights and a daily newsletter.',
      fr: 'Site d’actualité sportive marocaine mis à jour en continu : scores en direct, calendrier, classements, meilleurs buteurs, résumés vidéo et newsletter quotidienne.',
    },
    stack: ['Live Scores', 'League Tables', 'Video'],
    platform: 'Web',
    // TODO: add the website URL.
    links: [],
  },
  {
    name: 'CarLing',
    status: 'development',
    tagline: { en: 'Used-Car Intelligence for Morocco', fr: 'L’intelligence du véhicule d’occasion au Maroc' },
    description: {
      en: 'Point the camera at a used car to identify the model, read the plate or VIN, and see its fair market price, known mechanical weak points and yearly running costs, then export a negotiation report.',
      fr: 'Pointez l’appareil photo vers une voiture d’occasion pour identifier le modèle, lire la plaque ou le VIN, connaître son juste prix, ses points faibles mécaniques et son coût annuel, puis exporter un rapport de négociation.',
    },
    stack: ['Computer Vision', 'Plate & VIN OCR', 'Price Valuation'],
    platform: 'Mobile',
    links: [],
  },
  {
    name: 'Dwaya',
    status: 'development',
    tagline: { en: 'Healthcare Access in Morocco', fr: 'L’accès aux soins au Maroc' },
    description: {
      en: 'Send a medicine name or prescription to nearby pharmacies to check availability, find pharmacies on duty, book doctor appointments, order health products and read doctors’ answers to health questions.',
      fr: 'Envoyez un nom de médicament ou une ordonnance aux pharmacies proches pour vérifier sa disponibilité, trouvez les pharmacies de garde, prenez rendez-vous chez un médecin, commandez des produits de santé et lisez les réponses des médecins.',
    },
    stack: ['Medicine Requests', 'On-Duty Pharmacies', 'Appointments'],
    platform: 'Mobile',
    links: [],
  },
];

export const EXPERIENCE: TimelineEntry[] = [
  {
    year: '2025',
    dates: { en: 'Feb 2025 – Present', fr: 'Févr. 2025 – Auj.' },
    badge: 'I',
    badgeTone: 'brand',
    role: { en: 'Full-Stack Web & Mobile Developer', fr: 'Développeur Full-Stack Web & Mobile' },
    organization: 'Inforisk SA',
    projects: [
      {
        title: { en: 'Analytix Mobile App (Android/iOS)', fr: 'Application Analytix Mobile (Android/iOS)' },
        bullets: [
          {
            en: 'Lead end-to-end development of a financial risk management app, from initial UI/UX prototyping in Figma to production deployment.',
            fr: 'Pilotage du développement de bout en bout d’une application de gestion du risque financier, du prototypage UI/UX sur Figma à la mise en production.',
          },
          {
            en: 'Build the frontend with Flutter and Dart, using Provider/Bloc for state management, and implement real-time push notifications.',
            fr: 'Développement du frontend en Flutter et Dart, avec Provider/Bloc pour la gestion d’état, et mise en place des notifications push en temps réel.',
          },
          {
            en: 'Develop RESTful APIs and backend business logic with Spring Boot.',
            fr: 'Développement des API RESTful et de la logique métier backend avec Spring Boot.',
          },
          {
            en: 'Manage configuration, versioning and deployments directly to the Apple App Store and Google Play Store.',
            fr: 'Gestion de la configuration, des versions et des déploiements sur l’Apple App Store et le Google Play Store.',
          },
        ],
      },
      {
        title: { en: 'Ma conformité Web Application', fr: 'Application web Ma conformité' },
        bullets: [
          {
            en: 'Designed the UI/UX in Figma, prototyping the full compliance journey and validating it with the team.',
            fr: 'Conception de l’UI/UX sur Figma, avec le prototypage de tout le parcours de conformité, validé avec l’équipe.',
          },
          {
            en: 'Built a B2B compliance platform that helps Moroccan accounting firms meet their obligations under law 43-05.',
            fr: 'Développement d’une plateforme de conformité B2B qui aide les cabinets comptables marocains à respecter leurs obligations au titre de la loi 43-05.',
          },
          {
            en: 'Developed sanctions and PEP screening, KYC records and ready-made reports for ANRF inspections.',
            fr: 'Développement du filtrage sanctions et PPE, des dossiers KYC et de rapports prêts pour les contrôles de l’ANRF.',
          },
          {
            en: 'Built the end-to-end compliance workflow: search a company by name, ICE or RC, confirm the match, complete the KYC, then track each client dossier from a dashboard until the review is done.',
            fr: 'Mise en place du parcours de conformité de bout en bout : rechercher une entreprise par nom, ICE ou RC, confirmer la correspondance, compléter le KYC, puis suivre chaque dossier client depuis un tableau de bord jusqu’à la fin de la revue.',
          },
        ],
      },
    ],
  },
  {
    year: '2023',
    dates: { en: 'Jul 2023 – Mar 2024', fr: 'Juil. 2023 – Mars 2024' },
    badge: 'T',
    badgeTone: 'neutral',
    role: { en: 'Web Developer', fr: 'Développeur Web' },
    organization: 'Teleco Maroc',
    projects: [
      {
        title: { en: 'E-commerce Platform', fr: 'Plateforme e-commerce' },
        body: {
          en: 'Led the design and development of Groupe Teleco Maroc’s e-commerce website for the telecommunications sector, including the product catalog, order management workflows and secure payment integration.',
          fr: 'Conception et développement du site e-commerce du Groupe Teleco Maroc pour le secteur des télécommunications : catalogue produits, gestion des commandes et intégration de paiements sécurisés.',
        },
      },
      {
        title: { en: 'Corporate Website', fr: 'Site institutionnel' },
        body: {
          en: 'Designed and developed a full-stack corporate website showcasing the company’s expertise in network infrastructure, telecommunications and IT security, managing the entire application lifecycle from initial mockups to production deployment.',
          fr: 'Conception et développement full-stack du site institutionnel mettant en valeur l’expertise de l’entreprise en infrastructures réseau, télécommunications et sécurité informatique, en gérant tout le cycle de vie de l’application, des maquettes à la mise en production.',
        },
      },
      {
        title: { en: 'Digital Marketing & SEO Optimization', fr: 'Marketing digital & optimisation SEO' },
        body: {
          en: 'Applied marketing expertise to create responsive email campaigns for customer communications. Implemented on-page SEO improvements to maximize the visibility of services in search engines.',
          fr: 'Création de campagnes d’e-mailing responsives pour la communication client. Optimisations SEO on-page pour maximiser la visibilité des services sur les moteurs de recherche.',
        },
      },
    ],
  },
  {
    year: '2022',
    dates: { en: 'Dec 2022 – Jun 2023', fr: 'Déc. 2022 – Juin 2023' },
    badge: 'L',
    badgeTone: 'neutral',
    role: { en: 'Web Developer & UI/UX Designer', fr: 'Développeur Web & Designer UI/UX' },
    organization: 'LDTM',
    summary: {
      en: 'I worked across design and development for LDTM’s client projects, taking each one from interface design to a working website.',
      fr: 'J’ai travaillé à la fois sur le design et le développement des projets clients de LDTM, en menant chacun de la conception de l’interface jusqu’au site en ligne.',
    },
    bullets: [
      {
        en: 'Customized an existing online consultation website to fit the client’s needs, adapting its pages to how they work with their users.',
        fr: 'Personnalisation d’un site de consultation en ligne existant selon les besoins du client, en adaptant ses pages à sa façon de travailler avec ses utilisateurs.',
      },
      {
        en: 'Designed and built the FitVit e-commerce website, from product browsing to order and online payment handling.',
        fr: 'Conception et développement du site e-commerce FitVit, de la navigation dans les produits jusqu’à la commande et la gestion du paiement en ligne.',
      },
      {
        en: 'Focused on the interface and user experience: clear product pages, a simple checkout and a layout that works on mobile as well as desktop.',
        fr: 'Attention particulière portée à l’interface et à l’expérience utilisateur : des fiches produits claires, un paiement simple et une mise en page adaptée au mobile comme à l’ordinateur.',
      },
      {
        en: 'Designed visual assets for each project, consistent with each client’s brand identity.',
        fr: 'Création de visuels pour chaque projet, cohérents avec l’identité de marque de chaque client.',
      },
    ],
  },
];

export const EDUCATION: Credential[] = [
  {
    title: {
      en: 'Master’s in Computer Engineering, Big Data & Cloud Computing',
      fr: 'Master en génie informatique, Big Data & Cloud Computing',
    },
    detail: { en: 'ENSET Mohammedia · Sep 2023–Jun 2025', fr: 'ENSET Mohammedia · sept. 2023–juin 2025' },
  },
  {
    title: { en: 'Bachelor in Sciences', fr: 'Licence en sciences' },
    detail: {
      en: 'Hassan II University of Casablanca · Sep 2016–Jun 2020',
      fr: 'Université Hassan II de Casablanca · sept. 2016–juin 2020',
    },
  },
];

export const CERTIFICATIONS: Credential[] = [
  {
    title: { en: 'Software Engineering', fr: 'Software Engineering' },
    detail: { en: 'ALX Africa · Jul 2023 · 12 months', fr: 'ALX Africa · juil. 2023 · 12 mois' },
  },
  {
    title: { en: 'AI Career Essentials (AICE)', fr: 'AI Career Essentials (AICE)' },
    detail: { en: 'ALX Africa · Jul 2024 · 6 months', fr: 'ALX Africa · juil. 2024 · 6 mois' },
  },
  {
    title: { en: 'Web Development Essentials', fr: 'Web Development Essentials' },
    detail: { en: 'IBM / Coursera · Nov 2023', fr: 'IBM / Coursera · nov. 2023' },
  },
  {
    title: { en: 'Networking, IoT & Linux Essentials', fr: 'Networking, IoT & Linux Essentials' },
    detail: { en: 'Cisco Networking Academy · 2024', fr: 'Cisco Networking Academy · 2024' },
  },
  {
    title: { en: 'EF SET English', fr: 'EF SET English' },
    detail: { en: 'EF SET C1 Advanced · Jun 2024', fr: 'EF SET C1 Advanced · juin 2024' },
  },
  {
    title: {
      en: 'Introduction to Web Development with HTML, CSS, JavaScript',
      fr: 'Introduction to Web Development with HTML, CSS, JavaScript',
    },
    detail: { en: 'IBM · Nov 2023', fr: 'IBM · nov. 2023' },
  },
];

export const TECHNOLOGIES: string[] = [
  'Flutter',
  'Angular',
  'Python',
  'Git',
  'Docker',
  'Jenkins',
  'Dart',
  'Provider',
  'BLoC',
  'Spring Boot',
  'REST APIs',
  'React',
  'WordPress',
  'Figma',
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: {
      en: 'Analytix Mobile: from prototype to app store',
      fr: 'Analytix Mobile : du prototype à l’App Store',
    },
    summary: {
      en: 'Financial risk intelligence on mobile. Interface design, Flutter development, REST APIs, and production releases.',
      fr: 'L’intelligence du risque financier sur mobile. Design d’interface, développement Flutter, API REST et mises en production.',
    },
    cover: 'assets/case-studies/analytix/devices.png',
    coverBackground: 'linear-gradient(180deg, #4588f8 0%, #2e52b6 55%, #3462d1 100%)',
    path: '/case-studies/analytix-mobile',
  },
  {
    title: {
      en: 'Ma conformite: B2B compliance on the web',
      fr: 'Ma conformite : la conformité B2B sur le web',
    },
    summary: {
      en: 'A compliance platform connecting responsive Angular interfaces with Spring Boot services.',
      fr: 'Une plateforme de conformité qui relie des interfaces Angular responsives à des services Spring Boot.',
    },
    cover: IMG.maconformite,
    path: '/case-studies/maconformite',
  },
];

const MC = 'assets/case-studies/maconformite';

// Figma 106:2, MaConformite.ma — Case Study / Desktop
export const MACONFORMITE_ARTICLE: CaseArticle = {
  slug: 'maconformite',
  title: {
    en: 'MaConformite.ma — Building a workspace for LBC-FT compliance',
    fr: 'MaConformite.ma — Un espace de travail pour la conformité LBC-FT',
  },
  intro: {
    en: 'MaConformite.ma helps Moroccan firms organize anti-money laundering and counter-terrorist financing (LBC-FT) work, from finding a company to reviewing its dossier.',
    fr: 'MaConformite.ma aide les entreprises marocaines à organiser leur travail de lutte contre le blanchiment de capitaux et le financement du terrorisme (LBC-FT), de la recherche d’une société à la revue de son dossier.',
  },
  role: {
    en: 'Full-stack developer at Inforisk · Figma, Angular, and Spring Boot',
    fr: 'Développeur full-stack chez Inforisk · Figma, Angular et Spring Boot',
  },
  hero: {
    src: `${MC}/landing.png`,
    width: 3549,
    height: 2219,
    maxWidth: 960,
    alt: {
      en: 'MaConformite.ma landing page: “La conformité LBC-FT, enfin structurée pour votre cabinet”, with a dashboard preview.',
      fr: 'Page d’accueil de MaConformite.ma : « La conformité LBC-FT, enfin structurée pour votre cabinet », avec un aperçu du tableau de bord.',
    },
    caption: {
      en: 'MaConformite.ma introduces the platform’s three connected modules.',
      fr: 'MaConformite.ma présente les trois modules connectés de la plateforme.',
    },
  },
  sections: [
    {
      title: { en: 'My role and the team', fr: 'Mon rôle et l’équipe' },
      paragraphs: [
        {
          en: 'I worked with the project team and collaborated with UX experts on parts of MaConformite.ma. My role as a full-stack developer spanned Figma, the Angular interface, and the Spring Boot services behind it.',
          fr: 'J’ai travaillé avec l’équipe projet et collaboré avec des experts UX sur certaines parties de MaConformite.ma. En tant que développeur full-stack, mon rôle couvrait Figma, l’interface Angular et les services Spring Boot qui la font fonctionner.',
        },
        {
          en: 'The screens below trace how company lookup, client onboarding, and ongoing review fit together in the workspace.',
          fr: 'Les écrans ci-dessous montrent comment la recherche de société, l’entrée en relation client et la revue continue s’articulent dans l’espace de travail.',
        },
      ],
    },
    {
      title: { en: 'The problem', fr: 'Le problème' },
      paragraphs: [
        {
          en: 'A compliance team needs to find the right company, collect the required information, and understand what to do next. The workspace pairs a shared overview with dedicated screens for each step.',
          fr: 'Une équipe conformité doit trouver la bonne société, réunir les informations requises et savoir quoi faire ensuite. L’espace de travail associe une vue d’ensemble partagée à des écrans dédiés à chaque étape.',
        },
      ],
    },
    {
      title: { en: 'Start from the dashboard', fr: 'Partir du tableau de bord' },
      paragraphs: [
        {
          en: 'The dashboard combines company search with a snapshot of the existing portfolio. A reviewer can look up a new company or scan the risk and alert panels before returning to a dossier.',
          fr: 'Le tableau de bord associe la recherche de société à un aperçu du portefeuille existant. Le réviseur peut rechercher une nouvelle société ou parcourir les panneaux de risques et d’alertes avant de revenir à un dossier.',
        },
      ],
      figures: [
        {
          src: `${MC}/dashboard.png`,
          width: 3556,
          height: 2218,
          maxWidth: 860,
          alt: {
            en: 'MaConformite.ma dashboard with company search above risk distribution, alerts and recent activity panels.',
            fr: 'Tableau de bord de MaConformite.ma : recherche de société au-dessus des panneaux de répartition des risques, d’alertes et d’activité récente.',
          },
        },
      ],
    },
    {
      title: { en: '01  Find the company', fr: '01  Trouver la société' },
      paragraphs: [
        {
          en: 'The search supports company name and registry identifiers such as ICE and RC. Results show the company’s location and registry details, giving the reviewer a way to confirm the match before opening a dossier.',
          fr: 'La recherche accepte la raison sociale et les identifiants du registre, comme l’ICE et le RC. Les résultats affichent la localisation de la société et ses informations de registre, pour confirmer la correspondance avant d’ouvrir un dossier.',
        },
      ],
      figures: [
        {
          src: `${MC}/search.png`,
          width: 1280,
          height: 448,
          maxWidth: 560,
          alt: {
            en: 'Company search form with name, ICE and RC fields.',
            fr: 'Formulaire de recherche de société avec les champs raison sociale, ICE et RC.',
          },
          caption: {
            en: 'The search form accepts a company name, ICE, or RC.',
            fr: 'Le formulaire de recherche accepte une raison sociale, un ICE ou un RC.',
          },
        },
        {
          src: `${MC}/result.png`,
          width: 640,
          height: 174,
          maxWidth: 560,
          alt: {
            en: 'Search result showing the matching company with its address and registry details.',
            fr: 'Résultat de recherche affichant la société correspondante, son adresse et ses informations de registre.',
          },
          caption: {
            en: 'The result includes the registered location and identifiers used to confirm the company.',
            fr: 'Le résultat indique l’adresse enregistrée et les identifiants qui permettent de confirmer la société.',
          },
        },
      ],
    },
    {
      title: { en: '02  Review the KYC questionnaire', fr: '02  Revoir le questionnaire KYC' },
      paragraphs: [
        {
          en: 'The reviewer can complete the Know Your Customer (KYC) questionnaire in the workspace or send it to the client. The two options make it clear who supplies the information and where that work starts.',
          fr: 'Le réviseur peut remplir le questionnaire KYC (connaissance client) dans l’espace de travail ou l’envoyer au client. Ces deux options indiquent clairement qui fournit les informations et où le travail commence.',
        },
      ],
      figures: [
        {
          src: `${MC}/kyc.png`,
          width: 3006,
          height: 1164,
          maxWidth: 860,
          alt: {
            en: 'KYC questionnaire step with a progress sidebar and two ways to complete it.',
            fr: 'Étape du questionnaire KYC avec une barre de progression latérale et deux façons de le remplir.',
          },
          caption: {
            en: 'Reviewers can fill out the questionnaire themselves or ask the client to complete it.',
            fr: 'Les réviseurs peuvent remplir eux-mêmes le questionnaire ou demander au client de le compléter.',
          },
        },
      ],
    },
    {
      title: { en: 'See what the client completed', fr: 'Voir ce que le client a rempli' },
      paragraphs: [
        {
          en: 'Once the questionnaire comes back, each section shows its completion state. The reviewer can see which information is available and continue to the supporting documents from the same screen.',
          fr: 'Une fois le questionnaire retourné, chaque section affiche son état d’avancement. Le réviseur voit quelles informations sont disponibles et passe aux pièces justificatives depuis le même écran.',
        },
      ],
      figures: [
        {
          src: `${MC}/completed.png`,
          width: 3600,
          height: 2338,
          maxWidth: 720,
          alt: {
            en: 'Completed KYC questionnaire with each section marked done and a button to continue to supporting documents.',
            fr: 'Questionnaire KYC complété, chaque section marquée comme terminée, avec un bouton pour passer aux pièces justificatives.',
          },
          caption: {
            en: 'Completed sections are visible at a glance. The primary action takes the reviewer to the supporting documents.',
            fr: 'Les sections complétées sont visibles d’un coup d’œil. L’action principale mène le réviseur aux pièces justificatives.',
          },
          // Figma 118:7: an 830×246 window onto the 989×642 screenshot placed at (-147, -251).
          crop: {
            frameWidth: 830,
            frameHeight: 246,
            background: '#eef2f6',
            left: -17.711,
            top: -102.2,
            width: 119.157,
            height: 261.14,
          },
        },
      ],
    },
    {
      title: { en: '03  Review the dossier', fr: '03  Revoir le dossier' },
      paragraphs: [
        {
          en: 'After the review, the dossier shows the decision alongside the KYC status, latest screening, and next review date. Bringing those details together gives the team a clear point of reference when they return to the relationship.',
          fr: 'Après la revue, le dossier affiche la décision avec le statut KYC, le dernier filtrage et la date de la prochaine revue. En réunissant ces éléments, l’équipe dispose d’un repère clair lorsqu’elle revient sur la relation.',
        },
      ],
      figures: [
        {
          src: `${MC}/dossier.png`,
          width: 3080,
          height: 1312,
          maxWidth: 860,
          alt: {
            en: 'Company dossier showing the risk decision, KYC status, latest screening and next review date.',
            fr: 'Dossier de la société affichant la décision de risque, le statut KYC, le dernier filtrage et la date de prochaine revue.',
          },
          caption: {
            en: 'The dossier summary puts the decision and follow-up status in one view.',
            fr: 'La synthèse du dossier réunit la décision et le suivi dans une seule vue.',
          },
        },
      ],
    },
    {
      title: { en: 'What I’d Measure Next', fr: 'Ce que je mesurerais ensuite' },
      paragraphs: [
        {
          en: 'In task-based testing, I’d track how long it takes to find the correct company, whether reviewers can complete a dossier, and where they need to backtrack or ask for help.',
          fr: 'Lors de tests par tâches, je mesurerais le temps nécessaire pour trouver la bonne société, la capacité des réviseurs à finaliser un dossier, et les moments où ils doivent revenir en arrière ou demander de l’aide.',
        },
      ],
    },
    {
      title: { en: 'What I Learned', fr: 'Ce que j’ai appris' },
      paragraphs: [
        {
          en: 'Working across design and development made it easier to spot where the interface depended on backend rules. A status only helps when it also tells the reviewer what happened and what they can do next.',
          fr: 'Travailler à la fois sur le design et le développement m’a permis de repérer plus facilement où l’interface dépendait des règles backend. Un statut n’est utile que s’il dit aussi au réviseur ce qui s’est passé et ce qu’il peut faire ensuite.',
        },
      ],
    },
  ],
};

const AX = 'assets/case-studies/analytix';
const PHONE = { width: 1179, height: 2556 };

// Figma 124:2, Analytix Mobile — Case Study / Desktop
export const ANALYTIX_ARTICLE: CaseArticle = {
  slug: 'analytix-mobile',
  title: { en: 'Analytix Mobile', fr: 'Analytix Mobile' },
  subtitle: {
    en: 'Company intelligence and risk monitoring on Android and iOS',
    fr: 'Informations d’entreprise et suivi des risques sur Android et iOS',
  },
  intro: {
    en: 'Analytix is Inforisk’s mobile app for checking Moroccan companies. It brings company records, risk indicators, compliance checks, and portfolio alerts into a mobile workflow.',
    fr: 'Analytix est l’application mobile d’Inforisk pour vérifier les entreprises marocaines. Elle réunit fiches d’entreprise, indicateurs de risque, contrôles de conformité et alertes de portefeuille dans un parcours mobile.',
  },
  role: {
    en: 'Mobile developer at Inforisk  ·  Figma, Flutter, Dart, Spring Boot',
    fr: 'Développeur mobile chez Inforisk  ·  Figma, Flutter, Dart, Spring Boot',
  },
  hero: {
    src: `${AX}/devices.png`,
    width: 1125,
    height: 918,
    maxWidth: 1000,
    plain: true,
    alt: {
      en: 'Three phones showing the Analytix home screen, a company profile and a risk score chart.',
      fr: 'Trois téléphones affichant l’accueil d’Analytix, une fiche d’entreprise et un graphique de score de risque.',
    },
  },
  sections: [
    {
      title: { en: '01  Find a company', fr: '01  Trouver une entreprise' },
      paragraphs: [
        {
          en: 'Start with a company name, then open the matching profile. The company record gives users a place to confirm the legal identity and registration details before they interpret its financial or risk data.',
          fr: 'On commence par le nom de l’entreprise, puis on ouvre la fiche correspondante. Elle permet de confirmer l’identité juridique et les informations d’immatriculation avant d’interpréter les données financières ou de risque.',
        },
      ],
      pair: {
        screens: [
          {
            src: `${AX}/search.png`,
            ...PHONE,
            label: { en: 'Company search', fr: 'Recherche d’entreprise' },
            alt: {
              en: 'Analytix home screen with the company search field.',
              fr: 'Écran d’accueil d’Analytix avec le champ de recherche d’entreprise.',
            },
          },
          {
            src: `${AX}/profile.png`,
            ...PHONE,
            label: { en: 'Company profile', fr: 'Fiche d’entreprise' },
            alt: {
              en: 'Company profile listing legal identity and registration details.',
              fr: 'Fiche d’entreprise présentant l’identité juridique et les informations d’immatriculation.',
            },
          },
        ],
        caption: {
          en: 'The home screen starts the lookup. The company profile organizes the registration and identity details.',
          fr: 'L’écran d’accueil lance la recherche. La fiche d’entreprise organise les informations d’immatriculation et d’identité.',
        },
      },
    },
    {
      title: { en: '02  Read the risk signals', fr: '02  Lire les signaux de risque' },
      paragraphs: [
        {
          en: 'The company menu gives users access to reports and risk views from the profile. The default risk screen pairs a score with a plain-language interpretation and a chart that shows how the score changed over time.',
          fr: 'Le menu de l’entreprise donne accès aux rapports et aux vues de risque depuis la fiche. L’écran de risque par défaut associe un score à une interprétation en langage clair et à un graphique de son évolution dans le temps.',
        },
      ],
      pair: {
        screens: [
          {
            src: `${AX}/report-menu.png`,
            ...PHONE,
            label: { en: 'Company report menu', fr: 'Menu des rapports' },
            alt: {
              en: 'Company menu listing the available reports and risk views.',
              fr: 'Menu de l’entreprise listant les rapports et vues de risque disponibles.',
            },
          },
          {
            src: `${AX}/risk.png`,
            ...PHONE,
            label: { en: 'Risk score and history', fr: 'Score de risque et historique' },
            alt: {
              en: 'Risk screen with the current score, its interpretation and a history chart.',
              fr: 'Écran de risque avec le score actuel, son interprétation et un graphique d’historique.',
            },
          },
        ],
        caption: {
          en: 'The company menu opens the risk view, which shows the current score and its history.',
          fr: 'Le menu de l’entreprise ouvre la vue de risque, qui affiche le score actuel et son historique.',
        },
      },
    },
    {
      title: { en: '03  Monitor changes', fr: '03  Suivre les changements' },
      paragraphs: [
        {
          en: 'The shareholders view brings ownership information and access to compliance screening together. The alerts feed helps users spot new events affecting companies they follow.',
          fr: 'La vue des actionnaires réunit les informations de détention et l’accès au filtrage de conformité. Le fil d’alertes aide à repérer les nouveaux événements concernant les entreprises suivies.',
        },
      ],
      pair: {
        screens: [
          {
            src: `${AX}/shareholders.png`,
            ...PHONE,
            label: { en: 'Shareholders and screening', fr: 'Actionnaires et filtrage' },
            alt: {
              en: 'Shareholders list with an entry point to compliance screening.',
              fr: 'Liste des actionnaires avec un accès au filtrage de conformité.',
            },
          },
          {
            src: `${AX}/alerts.png`,
            ...PHONE,
            label: { en: 'Portfolio alerts', fr: 'Alertes du portefeuille' },
            alt: {
              en: 'Alerts feed listing recent events for followed companies.',
              fr: 'Fil d’alertes listant les événements récents des entreprises suivies.',
            },
          },
        ],
        caption: {
          en: 'The shareholders screen provides a path to screening. Alerts surface updates for companies under watch.',
          fr: 'L’écran des actionnaires mène au filtrage. Les alertes signalent les mises à jour des entreprises surveillées.',
        },
      },
    },
    {
      title: { en: 'My role', fr: 'Mon rôle' },
      paragraphs: [
        {
          en: 'At Inforisk, I took the mobile app from early Figma prototypes to production. I built the Flutter interface, connected it to Spring Boot REST APIs, and implemented push notifications for portfolio updates.',
          fr: 'Chez Inforisk, j’ai mené l’application mobile des premiers prototypes Figma jusqu’à la production. J’ai développé l’interface Flutter, l’ai connectée aux API REST Spring Boot et mis en place les notifications push pour les mises à jour du portefeuille.',
        },
        {
          en: 'The mobile work included managing search, results, company detail, and alerts across the shared Android and iOS codebase. I also handled configuration, versioning, and release submissions for both stores.',
          fr: 'Le travail mobile couvrait la recherche, les résultats, le détail des entreprises et les alertes dans une base de code commune Android et iOS. J’ai aussi géré la configuration, les versions et les soumissions sur les deux stores.',
        },
      ],
    },
    {
      title: { en: 'From build to release', fr: 'Du développement à la publication' },
      paragraphs: [
        {
          en: 'I shipped the app for Android and iOS. The app brings company lookup, risk review, and ongoing monitoring into one mobile experience.',
          fr: 'J’ai publié l’application sur Android et iOS. Elle réunit la recherche d’entreprise, l’analyse du risque et le suivi continu dans une seule expérience mobile.',
        },
      ],
      link: {
        label: { en: 'View Analytix on the App Store', fr: 'Voir Analytix sur l’App Store' },
        href: ANALYTIX_APP_STORE,
      },
    },
    {
      title: { en: 'What I’d measure next', fr: 'Ce que je mesurerais ensuite' },
      paragraphs: [
        {
          en: 'I’d test how quickly a user can find the right company, whether they can explain what the risk view shows, and how often an alert leads them back to the relevant record.',
          fr: 'Je testerais la rapidité avec laquelle on trouve la bonne entreprise, la capacité à expliquer ce que montre la vue de risque, et la fréquence à laquelle une alerte ramène vers la fiche concernée.',
        },
      ],
    },
  ],
};

export const CASE_ARTICLES: CaseArticle[] = [MACONFORMITE_ARTICLE, ANALYTIX_ARTICLE];

export const ABOUT_INTRO: Localized[] = [
  {
    en: 'I’m a Full-Stack and Mobile Developer based in Casablanca. I build digital experiences for finance and B2B teams, bringing interface design, backend services, and mobile development together.',
    fr: 'Je suis développeur Full-Stack et Mobile, basé à Casablanca. Je crée des expériences numériques pour les équipes finance et B2B, en réunissant design d’interface, services backend et développement mobile.',
  },
  {
    en: 'Continuous learning is a big part of how I work. Here is a collection of the areas I’ve explored through my projects, from financial intelligence and compliance to reading, commerce, and publishing.',
    fr: 'Apprendre en continu fait partie de ma façon de travailler. Voici les domaines que j’ai explorés à travers mes projets, de l’intelligence financière et la conformité à la lecture, au commerce et à l’édition.',
  },
];

// Home "Recent work" list (Figma 135:75): each row opens the live product.
export interface RecentWork {
  name: string;
  tagline: Localized;
  status: Project['status'];
  href: string;
  // Store listing used instead of href for visitors on Android.
  androidHref?: string;
}

export const RECENT_WORK: RecentWork[] = [
  {
    name: 'Analytix Mobile',
    tagline: {
      en: 'Financial risk intelligence for iOS and Android',
      fr: 'Intelligence du risque financier sur iOS et Android',
    },
    status: 'live',
    href: ANALYTIX_APP_STORE,
    androidHref: ANALYTIX_GOOGLE_PLAY,
  },
  {
    name: 'MaConformite',
    tagline: {
      en: 'Anti-money laundering compliance for Moroccan companies',
      fr: 'Conformité anti-blanchiment pour les entreprises marocaines',
    },
    status: 'live',
    href: MACONFORMITE_URL,
  },
  {
    name: 'Ancora',
    tagline: {
      en: 'We’re preparing the launch of Ancora: forming your US LLC from Morocco, fully online.',
      fr: 'Nous préparons le lancement d’Ancora : créer votre LLC américaine depuis le Maroc, entièrement en ligne.',
    },
    status: 'development',
    href: ANCORA_URL,
  },
];

// Each folder previews what is inside it, the way the reference site does.
export const FOLDERS: FolderLink[] = [
  {
    path: '/work',
    label: { en: 'Selected Work', fr: 'Projets choisis' },
    shape: 'landscape',
    thumbs: [{ image: IMG.telecomaroc }, { image: IMG.maconformite }, { image: IMG.al9anat }],
  },
  {
    path: '/experience',
    label: { en: 'Experience', fr: 'Parcours' },
    shape: 'round',
    thumbs: [
      { badge: 'T', badgeTone: 'neutral' },
      { badge: 'I', badgeTone: 'brand' },
      { badge: 'L', badgeTone: 'neutral' },
    ],
  },
  {
    path: '/case-studies',
    label: { en: 'Case Studies', fr: 'Études de cas' },
    shape: 'landscape',
    thumbs: [{ image: IMG.analytix }, { image: IMG.maconformite }],
  },
  {
    path: '/about',
    label: { en: 'About Me', fr: 'À propos' },
    shape: 'portrait',
    thumbs: [{ image: IMG.marginalia }, { image: IMG.dwaya }, { image: IMG.analytix }],
  },
];

export const UI = {
  back: { en: 'Back', fr: 'Retour' },
  siteNav: { en: 'Sections', fr: 'Sections' },
  language: { en: 'Language', fr: 'Langue' },
  toDark: { en: 'Switch to dark theme', fr: 'Passer au thème sombre' },
  toLight: { en: 'Switch to light theme', fr: 'Passer au thème clair' },
  clickSound: { en: 'Click sounds', fr: 'Sons des clics' },
  localTime: { en: 'Local time in Casablanca', fr: 'Heure locale à Casablanca' },
  home: { en: 'Home', fr: 'Accueil' },
  experienceTitle: { en: 'Experience', fr: 'Parcours professionnel' },
  educationTitle: { en: 'Education', fr: 'Formation' },
  certificationsTitle: { en: 'Certifications', fr: 'Certifications' },
  technologiesTitle: { en: 'Technologies', fr: 'Technologies' },
  contactEyebrow: { en: 'Get in touch', fr: 'Me contacter' },
  contactTitle: { en: 'Let’s build something together.', fr: 'Construisons quelque chose ensemble.' },
  contactLead: {
    en: 'Have a question about my work, a role in mind, or just want to say hi? Send me a message.',
    fr: 'Une question sur mon travail, un poste à proposer, ou simplement envie de dire bonjour ? Écrivez-moi.',
  },
  contactName: { en: 'Your name', fr: 'Votre nom' },
  contactNamePlaceholder: { en: 'Jane Smith', fr: 'Jeanne Martin' },
  contactEmail: { en: 'Your email', fr: 'Votre e-mail' },
  contactEmailPlaceholder: { en: 'jane@example.com', fr: 'jeanne@exemple.com' },
  contactSubject: { en: 'Subject (optional)', fr: 'Objet (facultatif)' },
  contactSubjectPlaceholder: { en: 'What’s it about?', fr: 'De quoi s’agit-il ?' },
  contactMessage: { en: 'Message', fr: 'Message' },
  contactMessagePlaceholder: {
    en: 'Tell me a little about what you have in mind.',
    fr: 'Dites-m’en un peu plus sur votre projet.',
  },
  contactSend: { en: 'Send message', fr: 'Envoyer le message' },
  contactSendNote: {
    en: 'Opens your email app with the message filled in.',
    fr: 'Ouvre votre messagerie avec le message prérempli.',
  },
  contactDefaultSubject: { en: 'Hello from your portfolio', fr: 'Bonjour depuis votre portfolio' },
  aboutTitle: { en: 'About me', fr: 'À propos de moi' },
  workTitle: { en: 'Selected work', fr: 'Projets choisis' },
  recentWork: { en: 'Recent work', fr: 'Projets récents' },
  seeAllWork: { en: 'See all work', fr: 'Voir tous les projets' },
  askAbout: { en: 'Ask about it', fr: 'En savoir plus' },
  techStack: { en: 'Built with', fr: 'Réalisé avec' },
  platform: { en: 'Platform', fr: 'Plateforme' },
  opensNewTab: { en: '(opens in a new tab)', fr: '(s’ouvre dans un nouvel onglet)' },
  caseStudiesTitle: { en: 'Case studies', fr: 'Études de cas' },
} satisfies Record<string, Localized>;
