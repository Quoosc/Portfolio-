import type { IconType } from 'react-icons';
import {
  SiGit,
  SiLaravel,
  SiMysql,
  SiReact,
  SiTailwindcss,
  SiJavascript,
} from 'react-icons/si';

export type Project = {
  name: string;
  tagline: string;
  description: string;
  period: string;
  role: string;
  images: Array<{ src: string; alt: string }>;
  liveUrl?: string;
  githubLinks: Array<{ label: string; url: string }>;
  techStack: Array<{ name: string; icon?: IconType }>;
  features: Array<{ title: string; description: string }>;
};

export const projects: Project[] = [
  {
    name: 'Movie Booking Web',
    tagline: 'Full-stack movie ticket booking application',
    description:
      'A full-stack movie booking system with customer-facing and admin interfaces for movie management, showtime scheduling, ticket booking, payments, and user authorization.',
    period: '2025 – 2026',
    role: 'Full-stack Developer',
    images: [],
    liveUrl: 'https://cineon-cinema.vercel.app/',
    githubLinks: [
      { label: 'Frontend Repository', url: 'https://github.com/Quoosc/movie-booking-frontend' },
      { label: 'Backend Repository', url: 'https://github.com/Quoosc/movie-booking-backend' },
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
    features: [
      {
        title: 'Seat locking',
        description:
          'Implemented temporary seat reservations to reduce booking conflicts and the risk of duplicate bookings during concurrent requests.',
      },
      {
        title: 'RESTful API integration',
        description:
          'Designed and integrated APIs between ReactJS and Laravel, managing business logic and database operations with MySQL.',
      },
      {
        title: 'AI-assisted development',
        description:
          'Used AI-powered tools for requirements analysis, debugging, and technical problem-solving while reviewing and refining generated code.',
      },
    ],
  },
];
