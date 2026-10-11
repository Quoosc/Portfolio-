export const siteConfig = {
  name: 'Pham Tran Quoc',
  navLinks: [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
  socialLinks: {
    github: 'https://github.com/Quoosc',
    email: 'phamquoc896@gmail.com',
    phone: '0969678599',
  },
  profile: {
    fullName: 'Pham Tran Quoc',
    role: 'Software Engineering Student',
    careerInterests: 'Full-stack Development & Applied AI',
    location: 'Ho Chi Minh City, Vietnam',
    university: 'University of Information Technology – VNU-HCM',
    major: 'Software Engineering',
    gpa: '3.35/4.0',
    educationPeriod: 'September 2023 – June 2027 (Expected)',
    motto: 'Turning complex problems into practical software.',
  },
} as const;
