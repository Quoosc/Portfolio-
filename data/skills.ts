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
import { technologyColors } from '@/data/technology-colors';

export type Skill = {
  name: string;
  icon?: IconType;
  color?: string;
};

export type SkillCategory = {
  label: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: 'Programming Languages',
    skills: [
      { name: 'Python', icon: SiPython, color: technologyColors.Python },
      { name: 'JavaScript', icon: SiJavascript, color: technologyColors.JavaScript },
      { name: 'PHP', icon: SiPhp, color: technologyColors.PHP },
      { name: 'TypeScript', icon: SiTypescript, color: technologyColors.TypeScript },
    ],
  },
  {
    label: 'Frameworks & Database',
    skills: [
      { name: 'ReactJS', icon: SiReact, color: technologyColors.ReactJS },
      { name: 'Laravel', icon: SiLaravel, color: technologyColors.Laravel },
      { name: 'Next.js', icon: SiNextdotjs, color: technologyColors['Next.js'] },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: technologyColors['Tailwind CSS'] },
      { name: 'MySQL', icon: SiMysql, color: technologyColors.MySQL },
    ],
  },
  {
    label: 'Core Engineering',
    skills: [
      { name: 'OOP', color: technologyColors.OOP },
      { name: 'Data Structures & Algorithms', color: technologyColors['Data Structures & Algorithms'] },
      { name: 'RESTful API', color: technologyColors['RESTful API'] },
    ],
  },
  {
    label: 'AI & Development Tools',
    skills: [
      { name: 'Claude', icon: SiClaude, color: technologyColors.Claude },
      { name: 'GitHub Copilot', icon: SiGithubcopilot, color: technologyColors['GitHub Copilot'] },
      { name: 'Codex', icon: OpenAiIcon, color: technologyColors.Codex },
      { name: 'Git', icon: SiGit, color: technologyColors.Git },
      { name: 'GitHub', icon: SiGithub, color: technologyColors.GitHub },
      { name: 'Postman', icon: SiPostman, color: technologyColors.Postman },
    ],
  },
];
