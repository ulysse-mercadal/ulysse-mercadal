export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface ProjectTranslation {
  subtitle: string;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  highlights: ProjectHighlight[];
  features: string[];
  challenges: string[];
}

export interface Project {
  slug: string;
  title: string;
  technologies: string[];
  teamSize: number;
  githubUrl?: string;
  liveUrl?: string;
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
    fr: {
      badge: 'En cours',
      subtitle: 'Écosystème & API publique de voyage intelligente',
      shortDescription: 'Plateforme et écosystème d\'APIs publiques de voyage conçus pour la découverte de points d\'intérêt et la génération d\'itinéraires intelligents. Architecture microservices ouverte : moteur POI en Go, générateur d\'itinéraires en Python et vitrine Next.js derrière Traefik.',
      fullDescription: 'Trippier est une plateforme et un ensemble d\'APIs publiques de voyage pensées pour la recherche d\'activités, de points d\'intérêt et la génération automatisée d\'itinéraires intelligents. Conçu dès le départ comme un système distribué et ouvert : aucune authentification obligatoire, aucun token requis pour explorer, avec une architecture en microservices conteneurisés.',
      duration: 'En cours (WIP)',
      highlights: [
        {
          title: '⚡ poi-api (Go)',
          description: 'Microservice haute cadence écrit en Go sur le port 8080, chargé de l\'indexation et de la recherche géospatiale de points d\'intérêt (POI) ainsi que de flux d\'événements en temps réel.'
        },
        {
          title: '🧠 itinerary-api (Python)',
          description: 'Moteur intelligent en Python sur le port 8000 qui consomme poi-api pour synthétiser, ordonnancer et composer des itinéraires de voyage sur-mesure.'
        },
        {
          title: '🌐 Traefik & Architecture Ouverte',
          description: 'Reverse proxy Traefik gérant le routage dynamique sous domaine *.localhost en local sans configuration DNS, avec les flags d\'authentification désactivés pour une stack 100% ouverte.'
        },
        {
          title: '💻 Landing Page & Vitrine',
          description: 'Interface vitrine moderne en Next.js / TypeScript pour tester l\'API et visualiser les itinéraires générés.'
        }
      ],
      features: [
        'Recherche géospatiale de POIs à haute performance',
        'Flux d\'événements en direct',
        'Génération d\'itinéraires multi-étapes',
        'Stack Docker-compose avec hot-reload immédiat',
        'APIs publiques sans friction ni barrière d\'entrée'
      ],
      challenges: [
        'Conception de deux microservices complémentaires (Go pour la vélocité I/O, Python pour la logique de calcul d\'itinéraires).',
        'Routage multi-services transparent et résolution DNS locale via Traefik.',
        'Optimisation des temps de réponse sur les calculs d\'itinéraires complexes.'
      ]
    },
    en: {
      badge: 'WIP',
      subtitle: 'Smart public travel ecosystem & API platform',
      shortDescription: 'The public Trippier travel platform and API ecosystem designed for intelligent trip planning and event exploration. Built as an open microservice architecture: a high-performance Go POI (Points of Interest) engine, a Python AI itinerary generator, and a Next.js front-end routed through a Traefik reverse proxy.',
      fullDescription: 'Trippier is a public travel platform and API ecosystem designed for exploring points of interest, events, and generating intelligent multi-stop itineraries. Built from the ground up as a distributed and frictionless open system: no accounts, no tokens required, operating across containerized microservices.',
      duration: 'In progress (WIP)',
      highlights: [
        {
          title: '⚡ poi-api (Go)',
          description: 'High-throughput Go microservice running on port 8080, handling geospatial POI searches and live event data feeds.'
        },
        {
          title: '🧠 itinerary-api (Python)',
          description: 'Python engine running on port 8000 calling poi-api to automatically generate and schedule optimal travel itineraries.'
        },
        {
          title: '🌐 Traefik & Open Architecture',
          description: 'Traefik reverse proxy providing seamless hot-reload routing under *.localhost without host editing, running with auth disabled for public exploration.'
        },
        {
          title: '💻 Landing Page & Showcase',
          description: 'Modern Next.js / TypeScript showcase interface to test public endpoints and visualize generated trips.'
        }
      ],
      features: [
        'High-performance geospatial POI lookup',
        'Real-time live event feeds',
        'Multi-stop intelligent itinerary synthesis',
        'Docker-compose environment with instant hot-reload',
        'Zero-auth public APIs for frictionless developer access'
      ],
      challenges: [
        'Designing two complementary microservices (Go for I/O velocity, Python for itinerary logic).',
        'Transparent multi-service routing and local DNS resolution using Traefik.',
        'Optimizing response times on complex itinerary route graph traversals.'
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
      subtitle: 'Shoot\'em up spatial multijoueur 3D en réseau',
      shortDescription: 'Version 3D multijoueur en réseau du célèbre shoot\'em up R-Type, développé avec un moteur maison et un protocole réseau TCP/UDP binaire optimisé. Entièrement compatible Windows et Linux via un pipeline de cross-compilation complet.',
      fullDescription: 'Recréation moderne et complète du jeu d\'arcade culte R-Type en 3D multijoueur. Ce projet de 3ème année à Epitech comprend le développement d\'un moteur de jeu sur-mesure basé sur le patron ECS (Entity Component System), un protocole réseau binaire optimisé pour la faible latence, ainsi qu\'un pipeline de cross-compilation Windows/Linux.',
      duration: '6 semaines',
      highlights: [
        {
          title: '🕹️ Moteur ECS sur-mesure',
          description: 'Système Entité-Composant-Système conçu de zéro permettant un découplage total entre la logique des vaisseaux, la physique, et le rendu 3D OpenGL.'
        },
        {
          title: '📡 Protocole Réseau UDP/TCP binaire',
          description: 'Protocole binaire ultra-compact utilisant Asio pour synchroniser les joueurs et les projectiles avec un minimum d\'overhead réseau.'
        },
        {
          title: '⚙️ Cross-compilation Windows & Linux',
          description: 'Gestion automatisée des dépendances et du build multi-OS via CMake et Conan, assurant une compatibilité parfaite entre plateformes.'
        }
      ],
      features: [
        'Multijoueur en temps réel avec serveur autoritatif',
        'Rendu 3D temps réel avec OpenGL',
        'Système de vagues d\'ennemis et boss configurables',
        'Gestion dynamique des collisions et de la physique 2.5D',
        'Compatibilité native Windows et Linux'
      ],
      challenges: [
        'Gestion de la synchronisation réseau et de la prédiction côté client en UDP.',
        'Conception d\'un moteur ECS performant avec gestion de mémoire cache-friendly en C++ moderne.',
        'Cross-compilation de bibliothèques C++ tierces sous différents environnements OS.'
      ]
    },
    en: {
      badge: 'Epitech',
      subtitle: 'Networked 3D multiplayer space shooter',
      shortDescription: 'A networked 3D version of the famous R-Type space shooter, built with a custom engine and featuring a highly optimized, flexible TCP/UDP network protocol designed for any game type. The project is fully Windows and linux compatible thanks to a robust cross-compilation pipeline.',
      fullDescription: 'A complete modern remake of the iconic arcade game R-Type in networked 3D multiplayer. Developed as an Epitech 3rd-year milestone, featuring a bespoke Entity Component System (ECS) game engine, a low-latency binary network protocol over UDP/TCP, and a cross-compilation toolchain targeting Windows and Linux.',
      duration: '6 weeks',
      highlights: [
        {
          title: '🕹️ Bespoke ECS Engine',
          description: 'Entity Component System built from scratch ensuring total decoupling between ship logic, physics, and OpenGL 3D rendering.'
        },
        {
          title: '📡 Binary UDP/TCP Network Protocol',
          description: 'Lightweight custom binary wire protocol using Asio to synchronize player states and projectiles with minimal overhead.'
        },
        {
          title: '⚙️ Cross-Compilation Windows & Linux',
          description: 'Automated dependency management and build pipeline using CMake and Conan, guaranteeing cross-platform compatibility.'
        }
      ],
      features: [
        'Real-time authoritative multiplayer server architecture',
        'Real-time 3D rendering powered by OpenGL',
        'Configurable waves of enemies and boss encounters',
        'Dynamic collision detection and 2.5D physics simulation',
        'Native cross-platform execution on Windows and Linux'
      ],
      challenges: [
        'Handling state synchronization and client-side interpolation over UDP.',
        'Architecting a cache-friendly, high-performance ECS engine in modern C++.',
        'Cross-compiling third-party graphics and networking libraries across disparate toolchains.'
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
      subtitle: 'Plateforme d\'automatisation de tâches Web & Mobile (Zapier / n8n)',
      shortDescription: 'Outil d\'automatisation de flux pour web et mobile inspiré de Zapier et n8n, doté d\'un éditeur visuel de nœuds complexes, de logique conditionnelle et de l\'intégration OAuth avec plus de 6 services en microservices.',
      fullDescription: 'AREA (Action REAction) est une suite complète d\'automatisation de processus connectant des services web tiers entre eux. Inspirée d\'outils leaders comme n8n et Zapier, la solution dispose d\'un éditeur de workflow par glisser-déposer de nœuds, d\'un moteur d\'exécution distribué, et d\'applications clientes Web et Mobile.',
      duration: '5 semaines',
      highlights: [
        {
          title: '🔄 Éditeur de Workflow Visuel',
          description: 'Interface graphique interactive permettant de relier des déclencheurs (triggers), des conditions logiques et des actions concrètes.'
        },
        {
          title: '🔑 Intégrations OAuth & Webhooks',
          description: 'Connexion sécurisée à plus de 6 services (Google, Discord, Spotify, GitHub, Notion, etc.) avec rafraîchissement automatique des tokens.'
        },
        {
          title: '📱 Double Client Web & Mobile',
          description: 'Dashboard Web complet développé en Next.js / TypeScript et application mobile native réalisée en Flutter.'
        },
        {
          title: '🏗️ Backend Microservices & Prisma',
          description: 'Serveur API modulaire avec NestJS, base de données relationnelle PostgreSQL orchestrée par Prisma ORM et conteneurisation Docker.'
        }
      ],
      features: [
        'Éditeur de flux de données sous forme de graphe de nœuds',
        'Exécution asynchrone des actions avec gestion des retries',
        'Authentification OAuth2 multi-providers',
        'Interface mobile dédiée pour superviser ses flux',
        'Déploiement conteneurisé avec Docker Compose'
      ],
      challenges: [
        'Implémentation du moteur de parsing et d\'exécution ordonnée des dépendances de nœuds cycliques/acycliques.',
        'Gestion unifiée des flux d\'autorisation OAuth2 pour le web et le mobile.',
        'Architecture en microservices scalables pour supporter de nombreux webhooks simultanés.'
      ]
    },
    en: {
      badge: 'Epitech',
      subtitle: 'Web & mobile workflow automation suite (Zapier / n8n)',
      shortDescription: 'A workflow automation tool for web and mobile featuring a custom-built workflow editor that handles complex node interactions. We re-implemented a system similar to n8n, including conditional nodes and seamless integration between 6+ online services via OAuth, all within a microservice architecture.',
      fullDescription: 'AREA (Action REAction) is a comprehensive workflow automation platform connecting third-party web services together. Inspired by n8n and Zapier, the application features an interactive drag-and-drop node graph canvas, an asynchronous execution engine, and cross-platform Web & Mobile clients.',
      duration: '5 weeks',
      highlights: [
        {
          title: '🔄 Visual Workflow Editor',
          description: 'Interactive canvas allowing users to connect triggers, conditional branching logic, and action executions.'
        },
        {
          title: '🔑 OAuth & Webhook Integrations',
          description: 'Secure token authentication connecting over 6 platforms (Google, Discord, Spotify, GitHub, Notion, etc.) with automatic token refreshing.'
        },
        {
          title: '📱 Dual Web & Mobile Clients',
          description: 'Full-featured web dashboard in Next.js / React and native cross-platform mobile client built with Flutter.'
        },
        {
          title: '🏗️ Microservices Backend & Prisma',
          description: 'Modular API backend in NestJS, relational PostgreSQL database with Prisma ORM, and full Docker container orchestration.'
        }
      ],
      features: [
        'Visual node graph workflow builder',
        'Asynchronous task queuing with retry policies',
        'Multi-provider OAuth2 authentication flows',
        'Companion mobile app to monitor and trigger automations',
        'Isolated containerized deployment via Docker Compose'
      ],
      challenges: [
        'Implementing an execution graph parser correctly resolving node dependencies.',
        'Harmonizing OAuth2 authorization redirects between desktop browsers and mobile webviews.',
        'Designing a resilient microservices backend capable of processing concurrent webhooks.'
      ]
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug.toLowerCase() === slug.toLowerCase());
}
