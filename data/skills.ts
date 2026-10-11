import type { IconType } from 'react-icons';
import {
  SiClaude,
  SiGithub,
  SiGithubcopilot,
  SiGit,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostman,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { OpenAiIcon } from '@/components/icons/OpenAiIcon';

export type Skill = {
  name: string;
  icon?: IconType;
};

export type SkillCategory = {
  label: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: 'Programming Languages',
    skills: [
      { name: 'Python', icon: SiPython },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'PHP', icon: SiPhp },
      { name: 'TypeScript', icon: SiTypescript },
    ],
  },
  {
    label: 'Frameworks & Database',
    skills: [
      { name: 'ReactJS', icon: SiReact },
      { name: 'Laravel', icon: SiLaravel },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'MySQL', icon: SiMysql },
    ],
  },
  {
    label: 'Core Engineering',
    skills: [
      { name: 'OOP' },
      { name: 'Data Structures & Algorithms' },
      { name: 'RESTful API' },
    ],
  },
  {
    label: 'AI & Development Tools',
    skills: [
      { name: 'Claude', icon: SiClaude },
      { name: 'GitHub Copilot', icon: SiGithubcopilot },
      { name: 'Codex', icon: OpenAiIcon },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Postman', icon: SiPostman },
    ],
  },
];
