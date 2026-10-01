import { Component, HostListener, OnInit, signal } from '@angular/core';

export interface NavLinkItem {
  label: string;
  href: string;
  icon?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  projects: {
    title: string;
    description: string;
  }[];
  tags: string[];
}

export interface DegreeItem {
  period: string;
  title: string;
  institution: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  logo: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  icon: string;
  image?: string;
}

export interface SkillItem {
  name: string;
  icon?: string;
  image?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  percentage: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  // Reactive header & mobile navigation state
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  // Navigation links
  readonly navLinks: NavLinkItem[] = [
    { label: 'About', href: '#about', icon: 'ph ph-user' },
    { label: 'Experience', href: '#experience', icon: 'ph ph-briefcase' },
    { label: 'Projects', href: '#projects', icon: 'ph ph-folder-open' },
    { label: 'Skills', href: '#skills', icon: 'ph ph-code' },
    { label: 'Contact', href: '#contact', icon: 'ph ph-paper-plane-tilt' },
  ];

  // Work Experiences (Exact copy from Figma node 14:1347)
  readonly experiences: ExperienceItem[] = [
    {
      period: 'February 2025 — Present',
      role: 'Developer IT',
      company: 'Inforisk · Casablanca, Morocco',
      projects: [
        {
          title: 'Analytix mobile Android/IOS',
          description:
            'Led the end-to-end development of a financial risk management application from initial UI/UX prototyping in Figma to production deployment. Built the frontend in Flutter and Dart using Provider/Bloc for state management, and implemented a real-time push notification system. Developed the supporting RESTful APIs and backend business logic using Spring Boot. Managed all configuration, versioning, and release deployments directly to the Apple App Store and Google Play Store.',
        },
        {
          title: 'Ma conformite Web App',
          description:
            'Developing comprehensive financial and compliance tools. Building Analytix mobile application and Maconformite.ma B2B compliance platforms. Architecting backend services and responsive frontends while bridging the gap between business objectives and technical execution.',
        },
      ],
      tags: ['Flutter', 'Spring Boot', 'Angular', 'Python', 'Figma'],
    },
    {
      period: 'July 2023 — March 2024',
      role: 'Developer IT',
      company: 'TelecoMaroc · Casablanca, Morocco',
      projects: [
        {
          title: 'E-Commerce Platform',
          description:
            'Led the conception and development of an e-commerce website Groupe teleco marcoc for the telecommunications sector, including the product catalog, order management workflows, and secure payment integrations.',
        },
        {
          title: 'Site Vitrine Corporate',
          description:
            "Conception et développement full-stack du site web institutionnel mettant en valeur l'expertise de l'entreprise en infrastructures réseaux, télécommunications et sécurité informatique, en gérant l'ensemble du cycle de vie de l'application, des maquettes initiales à la mise en production.",
        },
        {
          title: 'Marketing Digital & Optimisation SEO',
          description:
            "Mise en pratique de mon expertise en marketing pour la création de campagnes d'emailing responsives destinées à la communication client. Exécution des optimisations SEO on-page pour maximiser la visibilité des services sur les moteurs de recherche.",
        },
      ],
      tags: ['Wordpress', 'React js', 'Figma', 'SEO'],
    },
  ];

  // Academic Degrees (Figma node 15:1490)
  readonly degrees: DegreeItem[] = [
    {
      period: 'Sep 2023 — Jun 2025',
      title: "Master's in Computer Engineering, Big Data & Cloud Computing",
      institution: 'ENSET Mohammedia',
    },
    {
      period: 'Sep 2016 — Jun 2020',
      title: 'Bachelor in sciences',
      institution: 'Hassan II University of Casablanca',
    },
  ];

  // Licenses & Certifications (Figma node 14:1383)
  readonly certifications: CertificationItem[] = [
    {
      title: 'Software Engineering',
      issuer: 'ALX Africa (Jul 2023) — 12 months',
      logo: 'assets/cert-alx.png',
    },
    {
      title: 'AI Career Essentials (AICE)',
      issuer: 'ALX Africa (Jul 2024) — 6 months',
      logo: 'assets/cert-alx.png',
    },
    {
      title: 'Web Development Essentials',
      issuer: 'IBM Coursera (Nov 2023)',
      logo: 'assets/cert-ibm.png',
    },
    {
      title: 'Networking, IoT & Linux Essentials',
      issuer: 'Cisco Networking Academy (2024)',
      logo: 'assets/cert-cisco.png',
    },
    {
      title: 'EF SET English',
      issuer: 'EF SET C1 Advanced (Jun 2024)',
      logo: 'assets/cert-efset.png',
    },
    {
      title: 'Introduction to Web Development with HTML, CSS, JavaScript',
      issuer: 'IBM (Nov 2023)',
      logo: 'assets/cert-ibm.png',
    },
  ];

  // 6 Projects (Figma node 17:108)
  readonly projects: ProjectItem[] = [
    {
      title: 'Analytix Mobile',
      description: 'Real-time B2B corporate intelligence, financial risk management',
      tags: ['Flutter', 'APIs', 'Figma'],
      gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      icon: 'ph ph-chart-line-up',
      image: 'assets/images/analytix-mobile.png',
    },
    {
      title: 'Maconformite.ma',
      description: 'Comprehensive B2B web platform designed to streamline corporate legal',
      tags: ['Angular', 'Spring boot', 'Figma'],
      gradient: 'linear-gradient(135deg, #142a22 0%, #0b1a15 100%)',
      icon: 'ph ph-shield-check',
      image: 'assets/images/Maconformite.png',
    },
    {
      title: 'Telecomaroc',
      description: 'E-commerce built to handle telecom infrastructure products',
      tags: ['WordPress', 'APIs', 'Figma'],
      gradient: 'linear-gradient(135deg, #281938 0%, #150d1e 100%)',
      icon: 'ph ph-shopping-bag',
      image: 'assets/images/telecomaroc.png',
    },
    {
      title: 'Marginalia App',
      description: 'E-book reader Allowing users to highlight, annotate, organize text, and listen to audiobooks.',
      tags: ['Flutter', 'APIs', 'Figma'],
      gradient: 'linear-gradient(135deg, #1e2837 0%, #0f1722 100%)',
      icon: 'ph ph-book-open',
      image: 'assets/images/marginalia.png',
    },
    {
      title: 'DWAYA App',
      description: 'Health logistics application aimed at optimizing the delivery and tracking of pharmaceutical supplies.',
      tags: ['Flutter', 'APIs', 'Figma'],
      gradient: 'linear-gradient(135deg, #112929 0%, #081717 100%)',
      icon: 'ph ph-first-aid',
      image: 'assets/images/dwaya.png',
    },
    {
      title: 'Al9Anat.ma',
      description: 'A dynamic, high-traffic digital press website designed to deliver news efficiently across devices.',
      tags: ['WordPress', 'APIs', 'Figma'],
      gradient: 'linear-gradient(135deg, #2a221a 0%, #17130e 100%)',
      icon: 'ph ph-newspaper',
      image: 'assets/images/al9anat.png',
    },
  ];

  // Technical Stack (Real images from assets/images/tech)
  readonly techStack: SkillItem[] = [
    { name: 'Flutter', image: 'assets/images/tech/flutter.png' },
    { name: 'Angular', image: 'assets/images/tech/angular.png' },
    { name: 'Python', image: 'assets/images/tech/python.png' },
    { name: 'Git', image: 'assets/images/tech/git.png' },
    { name: 'Docker', image: 'assets/images/tech/docker.png' },
    { name: 'Jenkins', image: 'assets/images/tech/jenkins.png' },
  ];

  // Domain & Methodologies (Figma node 20:931)
  readonly domainMethodologies = [
    'Financial Data Analysis & Compliance',
    'Agile / Scrum Methodologies',
    'Secure Backend Architecture (REST)',
    'Economic & Macro Market Modeling',
  ];

  // Language Proficiencies (Figma node 20:937)
  readonly languages: LanguageItem[] = [
    { name: 'Arabic', level: 'Native', percentage: 100 },
    { name: 'French', level: 'Fluent', percentage: 90 },
    { name: 'English', level: 'Professional Working', percentage: 80 },
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window !== 'undefined' && window.innerWidth >= 768 && this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  onNavClick(link: NavLinkItem, event?: MouseEvent): void {
    if (link.href === '#about' || link.href === '#') {
      if (event) {
        event.preventDefault();
      }
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, '', '#about');
      }
    }
  }

  onMobileNavClick(link: NavLinkItem, event?: MouseEvent): void {
    this.closeMobileMenu();
    this.onNavClick(link, event);
  }

  // Contact Form State
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };
  isSubmitting = signal(false);
  formSubmitted = signal(false);
  formError = signal<string | null>(null);

  // Formspree endpoint (Create a free form at https://formspree.io for ktite.m3@gmail.com and replace YOUR_FORM_ID)
  readonly formspreeEndpoint = 'https://formspree.io/f/xppwnbor';

  async onSubmit(): Promise<void> {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      return;
    }

    this.isSubmitting.set(true);
    this.formError.set(null);

    try {
      const response = await fetch(this.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: this.contactForm.name,
          email: this.contactForm.email,
          subject: this.contactForm.subject || 'Portfolio Inquiry',
          message: this.contactForm.message,
          _replyto: this.contactForm.email,
        }),
      });

      if (response.ok) {
        this.formSubmitted.set(true);
        this.contactForm = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => {
          this.formSubmitted.set(false);
        }, 6000);
      } else {
        const data = await response.json().catch(() => null);
        const errorMsg = data?.errors?.[0]?.message || 'Failed to send message. Please check the Form ID or try again.';
        this.formError.set(errorMsg);
      }
    } catch {
      this.formError.set('Network error. You can also reach me directly at ktite.m3@gmail.com');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
