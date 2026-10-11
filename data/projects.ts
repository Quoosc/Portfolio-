import type { IconType } from 'react-icons';
import {
  SiGit,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si';

export type ProjectImage = { src: string; alt: string; caption?: string };

export type Project = {
  slug: string;
  name: string;
  product: string;
  category: string;
  tagline: string;
  description: string;
  period: string;
  role: string;
  images: ProjectImage[];
  liveUrl: string;
  githubLinks: Array<{ label: string; url: string }>;
  techStack: Array<{ name: string; icon?: IconType }>;
  keyFeatures: string[];
  highlights: Array<{ title: string; description: string }>;
  challenge: { title: string; description: string };
  architecture: Array<{ name: string; description: string }>;
  security: string[];
};

export const projects: Project[] = [
  {
    slug: 'cineon',
    name: 'Cineon',
    product: 'Movie Booking Web',
    category: 'Full-stack web application',
    tagline: 'A full-stack movie ticket booking experience.',
    description:
      'A movie booking platform with customer-facing and admin interfaces for movie management, showtime scheduling, ticket booking, payments, and user authorization.',
    period: '2025 – 2026',
    role: 'Full-stack Developer',
    images: [],
    liveUrl: 'https://cineon-cinema.vercel.app/',
    githubLinks: [
      { label: 'Frontend', url: 'https://github.com/Quoosc/movie-booking-frontend' },
      { label: 'Backend', url: 'https://github.com/Quoosc/movie-booking-backend' },
    ],
    techStack: [
      { name: 'ReactJS', icon: SiReact },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'PHP Laravel', icon: SiLaravel },
      { name: 'MySQL', icon: SiMysql },
      { name: 'RESTful API' },
      { name: 'Git', icon: SiGit },
    ],
    keyFeatures: [
      'Customer-facing and admin interfaces.',
      'Movie management and showtime scheduling.',
      'Ticket booking with interactive seat selection and temporary seat reservations.',
      'Payment workflows and user authorization.',
    ],
    highlights: [
      {
        title: 'Seat selection and temporary locking',
        description:
          'Implemented temporary seat reservations to reduce booking conflicts and duplicate bookings during concurrent requests.',
      },
      {
        title: 'ReactJS and Laravel API integration',
        description:
          'Designed and integrated RESTful APIs, connecting frontend workflows with Laravel business logic and MySQL operations.',
      },
      {
        title: 'Booking and payment workflows',
        description:
          'Built project features across movie management, showtime scheduling, ticket booking, and payments.',
      },
    ],
    challenge: {
      title: 'Reducing conflicts during seat selection',
      description:
        'Concurrent booking requests can create conflicts around the same seats. The project uses temporary seat reservations to reduce booking conflicts and the risk of duplicate bookings.',
    },
    architecture: [
      { name: 'ReactJS frontend', description: 'Customer-facing and admin interfaces' },
      { name: 'RESTful API', description: 'API integration between the frontend and backend' },
      { name: 'Laravel backend', description: 'Application business logic and API flows' },
      { name: 'MySQL database', description: 'Database operations for the application' },
    ],
    security: [
      'JWT authentication for key API flows.',
      'Role-based access for admin endpoints.',
      'Request validation and rate limiting.',
      'MoMo payment notifications verified using HMAC signatures.',
    ],
  },
];
