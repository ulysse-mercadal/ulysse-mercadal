export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectTranslation {
  subtitle: string;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  highlights: ProjectHighlight[];
  features: string[];
}

export interface Project {
  slug: string;
  title: string;
  technologies: string[];
  teamSize: number;
  githubUrl?: string;
  liveUrl?: string;
  landingUrl?: string;
  appUrl?: string;
  links?: ProjectLink[];
  fr: ProjectTranslation;
  en: ProjectTranslation;
}

export const PROJECTS: Project[] = [
  {
    slug: 'trippier',
    title: 'Trippier',
    technologies: ['Go', 'Python', 'Next.js', 'Docker', 'Traefik', 'Microservices', 'REST API'],
    teamSize: 1, // Solo developer
    githubUrl: 'https://github.com/trippier-app',
    landingUrl: 'https://trippier.dev',
    appUrl: 'https://app.trippier.dev',
    links: [
      { label: 'trippier.dev', url: 'https://trippier.dev' },
      { label: 'app.trippier.dev', url: 'https://app.trippier.dev' },
    ],
    fr: {
      badge: 'En cours',
      subtitle: 'Plateforme et APIs publiques de voyage',
      shortDescription: 'Plateforme et APIs publiques pour la recherche de points d\'intérêt et le calcul d\'itinéraires. Architecture en microservices : service de POI en Go, moteur de calcul en Python et interface web en Next.js derrière Traefik.',
      fullDescription: 'Trippier regroupe un ensemble de services et d\'APIs publiques pour la recherche de points d\'intérêt, d\'événements et la génération d\'itinéraires. Le système repose sur une architecture de microservices conteneurisés accessibles sans authentification obligatoire.',
      duration: 'En cours (WIP)',
      highlights: [
        {
          title: 'poi-api (Go)',
          description: 'Microservice en Go (port 8080) dédié à l\'indexation et à la recherche géospatiale de points d\'intérêt (POI) et d\'événements.'
        },
        {
          title: 'itinerary-api (Python)',
          description: 'Service Python (port 8000) exploitant poi-api pour ordonnancer et composer des itinéraires de voyage.'
        },
        {
          title: 'Traefik & Routage',
          description: 'Reverse proxy Traefik assurant le routage local sous le domaine *.localhost sans configuration DNS manuelle.'
        },
        {
          title: 'Interface Web',
          description: 'Interface web en Next.js / TypeScript pour requêter les endpoints et afficher les itinéraires générés.'
        }
      ],
      features: [
        'Recherche géospatiale de points d\'intérêt',
        'Indexation et flux d\'événements',
        'Calcul d\'itinéraires multi-étapes',
        'Environnement Docker Compose avec rechargement automatique',
        'APIs publiques ouvertes sans authentification requise'
      ]
    },
    en: {
      badge: 'WIP',
      subtitle: 'Public travel platform & APIs',
      shortDescription: 'Public platform and APIs for querying points of interest and calculating itineraries. Microservices architecture with a Go POI service, a Python itinerary generator, and a Next.js front-end routed through Traefik.',
      fullDescription: 'Trippier provides public services and APIs for querying points of interest, events, and composing multi-stop travel itineraries. The architecture consists of containerized microservices accessible without required authentication.',
      duration: 'In progress (WIP)',
      highlights: [
        {
          title: 'poi-api (Go)',
          description: 'Go microservice running on port 8080 handling geospatial indexing and POI/event queries.'
        },
        {
          title: 'itinerary-api (Python)',
          description: 'Python service running on port 8000 consuming poi-api to calculate and order travel itineraries.'
        },
        {
          title: 'Traefik & Routing',
          description: 'Traefik reverse proxy providing local dynamic routing under *.localhost without manual DNS configuration.'
        },
        {
          title: 'Web Interface',
          description: 'Next.js / TypeScript web interface to query endpoints and display generated itineraries.'
        }
      ],
      features: [
        'Geospatial POI queries',
        'Event indexing and feeds',
        'Multi-stop itinerary generation',
        'Docker Compose environment with live reload',
        'Public APIs accessible without authentication'
      ]
    }
  },
  {
    slug: 'r-type',
    title: 'R-TYPE',
    technologies: ['C++', 'OpenGL', 'CMake', 'Asio', 'Conan', 'ECS', 'Network Protocol'],
    teamSize: 4,
    githubUrl: 'https://github.com/nicolasnny/R-TYPE',
    fr: {
      badge: 'Epitech',
      subtitle: 'Jeu de tir spatial multijoueur 3D en réseau',
      shortDescription: 'Jeu de tir spatial multijoueur en 3D avec moteur sur-mesure et protocole réseau UDP/TCP binaire. Compilé sous Windows et Linux via CMake et Conan.',
      fullDescription: 'Projet de 3ème année à Epitech : développement d\'un jeu de tir spatial multijoueur 3D. Comprend un moteur basé sur le patron ECS (Entity Component System), un protocole réseau binaire sur UDP/TCP et une chaîne de cross-compilation Windows et Linux.',
      duration: '6 semaines',
      highlights: [
        {
          title: 'Moteur ECS',
          description: 'Moteur basé sur le patron Entité-Composant-Système séparant la logique de jeu, la physique et le rendu OpenGL.'
        },
        {
          title: 'Protocole Réseau UDP/TCP',
          description: 'Protocole binaire avec Asio pour la synchronisation des joueurs et des entités en réseau.'
        },
        {
          title: 'Cross-compilation Windows & Linux',
          description: 'Gestion des dépendances et compilation multi-plateforme via CMake et Conan.'
        }
      ],
      features: [
        'Serveur autoritatif et synchronisation multijoueur',
        'Rendu 3D avec OpenGL',
        'Gestion des vagues d\'entités et détection des collisions',
        'Compatibilité native Windows et Linux'
      ]
    },
    en: {
      badge: 'Epitech',
      subtitle: 'Networked 3D multiplayer space shooter',
      shortDescription: 'Networked 3D multiplayer space shooter with a custom engine and binary UDP/TCP network protocol. Built for Windows and Linux via CMake and Conan.',
      fullDescription: 'Epitech 3rd-year project: 3D multiplayer space shooter featuring an Entity Component System (ECS) engine, a custom binary UDP/TCP protocol, and a cross-compilation pipeline for Windows and Linux.',
      duration: '6 weeks',
      highlights: [
        {
          title: 'ECS Engine',
          description: 'Entity Component System separating game logic, physics, and OpenGL rendering.'
        },
        {
          title: 'Binary UDP/TCP Protocol',
          description: 'Custom binary protocol implemented with Asio for player and entity network synchronization.'
        },
        {
          title: 'Cross-Compilation Windows & Linux',
          description: 'Dependency management and multi-platform compilation using CMake and Conan.'
        }
      ],
      features: [
        'Authoritative server and multiplayer synchronization',
        '3D rendering with OpenGL',
        'Entity wave management and collision handling',
        'Windows and Linux support'
      ]
    }
  },
  {
    slug: 'area',
    title: 'AREA',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'React', 'Flutter', 'Docker', 'OAuth'],
    teamSize: 5,
    githubUrl: 'https://github.com/ulysse-mercadal/area',
    fr: {
      badge: 'Epitech',
      subtitle: 'Plateforme d\'automatisation de tâches Web & Mobile',
      shortDescription: 'Plateforme d\'automatisation de flux connectant des services tiers. Comprend un éditeur visuel de nœuds, des connecteurs OAuth2 et des clients Web et Mobile.',
      fullDescription: 'AREA (Action REAction) est une plateforme d\'automatisation de processus connectant des services web tiers. Le projet intègre un éditeur visuel de graphe de nœuds, un moteur d\'exécution d\'actions/réactions, et des applications Web (Next.js) et Mobile (Flutter).',
      duration: '5 semaines',
      highlights: [
        {
          title: 'Éditeur de Workflow',
          description: 'Interface graphique pour interconnecter déclencheurs (triggers), conditions et actions.'
        },
        {
          title: 'Intégrations OAuth & Webhooks',
          description: 'Authentification OAuth2 auprès de services tiers (Google, Discord, Spotify, GitHub, Notion) et gestion de webhooks.'
        },
        {
          title: 'Clients Web & Mobile',
          description: 'Interface web en Next.js / TypeScript et application mobile en Flutter.'
        },
        {
          title: 'Backend NestJS & PostgreSQL',
          description: 'API NestJS avec base PostgreSQL gérée via Prisma ORM et conteneurisation Docker.'
        }
      ],
      features: [
        'Éditeur visuel de flux sous forme de graphe',
        'Exécution asynchrone des actions',
        'Authentification OAuth2 multi-services',
        'Application mobile dédiée',
        'Déploiement avec Docker Compose'
      ]
    },
    en: {
      badge: 'Epitech',
      subtitle: 'Web & mobile workflow automation platform',
      shortDescription: 'Workflow automation platform connecting third-party services. Includes a node graph editor, OAuth2 integrations, and Web and Mobile clients.',
      fullDescription: 'AREA (Action REAction) is a workflow automation platform connecting external web services. The application includes a node graph canvas, an action/reaction execution engine, and Web (Next.js) and Mobile (Flutter) clients.',
      duration: '5 weeks',
      highlights: [
        {
          title: 'Node Graph Workflow Editor',
          description: 'Interface to connect triggers, conditional logic, and action executions.'
        },
        {
          title: 'OAuth & Webhook Integrations',
          description: 'OAuth2 authentication with third-party providers (Google, Discord, Spotify, GitHub, Notion) and webhook processing.'
        },
        {
          title: 'Web & Mobile Clients',
          description: 'Web interface in Next.js / TypeScript and mobile application in Flutter.'
        },
        {
          title: 'NestJS & PostgreSQL Backend',
          description: 'Modular NestJS API with PostgreSQL managed via Prisma ORM and Docker containers.'
        }
      ],
      features: [
        'Visual node graph workflow builder',
        'Asynchronous task execution',
        'Multi-provider OAuth2 authentication',
        'Companion mobile app',
        'Docker Compose deployment'
      ]
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug.toLowerCase() === slug.toLowerCase());
}
