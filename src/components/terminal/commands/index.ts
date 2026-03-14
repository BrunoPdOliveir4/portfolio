import { cv } from '@/data/cv';
import type { CommandOutput } from '@/types/terminal';

type CommandHandler = (args: string[]) => CommandOutput[];

const commands: Record<string, CommandHandler> = {
  help: () => [{
    type: 'text',
    content: [
      'Available commands:',
      '',
      '  help          — Show this help message',
      '  whoami        — About me',
      '  skills        — Technical skills',
      '  experience    — Work experience',
      '  education     — Education',
      '  projects      — Relevant projects',
      '  contact       — Contact info',
      '  whatsapp      — Send me a WhatsApp message',
      '  email         — Send me an email',
      '  curriculum    — Download my resume (PDF)',
      '  clear         — Clear terminal',
      '  secret        — ???',
      '  cat resume.pdf',
    ].join('\n'),
  }],

  whoami: () => [{
    type: 'text',
    content: [
      `╔══════════════════════════════════════════╗`,
      `║  ${cv.name}`,
      `║  ${cv.titleEn}`,
      `╚══════════════════════════════════════════╝`,
      '',
      cv.profileEn,
    ].join('\n'),
  }],

  skills: () => cv.skills.map((cat) => ({
    type: 'text' as const,
    content: `\x1b[32m${cat.categoryEn}\x1b[0m\n  ${cat.skills.join(' • ')}`,
  })),

  experience: () => cv.experience.map((exp) => ({
    type: 'text' as const,
    content: [
      `\x1b[32m${exp.roleEn}\x1b[0m — ${exp.company}`,
      `  ${exp.period}`,
      '',
      ...exp.bulletsEn.map((b) => `  • ${b}`),
      '',
      `  Stack: ${exp.technologies.join(', ')}`,
    ].join('\n'),
  })),

  education: () => cv.education.map((edu) => ({
    type: 'text' as const,
    content: [
      `\x1b[32m${edu.institution}\x1b[0m`,
      `  ${edu.degreeEn}`,
      `  ${edu.period}`,
    ].join('\n'),
  })),

  projects: () => cv.projects.map((proj) => ({
    type: 'text' as const,
    content: [
      `\x1b[32m${proj.nameEn}\x1b[0m`,
      `  ${proj.descriptionEn}`,
      `  Tech: ${proj.technologies.join(', ')}`,
    ].join('\n'),
  })),

  contact: () => [{
    type: 'text',
    content: [
      `📧 Email:    ${cv.contact.email}`,
      `📍 Location: ${cv.contact.location}`,
      `🐙 GitHub:   github.com/${cv.contact.github}`,
      `💼 LinkedIn: linkedin.com/in/${cv.contact.linkedin}`,
      `📱 Phone:    ${cv.contact.phone}`,
    ].join('\n'),
  }],

  whatsapp: () => {
    const phoneDigits = cv.contact.phone.replace(/\D/g, '');
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/${phoneDigits}`, '_blank');
    }
    return [{
      type: 'system',
      content: [
        '',
        '📱 Opening WhatsApp...',
        '',
        `  Redirecting to wa.me/${phoneDigits}`,
        '  A new tab should open shortly.',
        '',
      ].join('\n'),
    }];
  },

  email: () => {
    if (typeof window !== 'undefined') {
      window.open(`mailto:${cv.contact.email}`, '_blank');
    }
    return [{
      type: 'system',
      content: [
        '',
        '📧 Opening email client...',
        '',
        `  Composing email to ${cv.contact.email}`,
        '  Your email client should open shortly.',
        '',
      ].join('\n'),
    }];
  },

  curriculum: () => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = '/portfolio/curriculum.pdf';
      link.download = 'Bruno_Pedroso_Curriculum.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return [{
      type: 'system',
      content: [
        '',
        '📄 Downloading resume...',
        '',
        '  Your download should start automatically.',
        '  File: Bruno_Pedroso_Curriculum.pdf',
        '',
      ].join('\n'),
    }];
  },

  clear: () => [],

  secret: () => [{
    type: 'system',
    content: [
      '',
      '🔓 You found the secret!',
      '',
      '  "Any sufficiently advanced technology is',
      '   indistinguishable from magic." — Arthur C. Clarke',
      '',
      '  Fun fact: Before becoming a software engineer,',
      '  I studied Music Education. The discipline of',
      '  practicing scales translates surprisingly well',
      '  to debugging production systems at 3 AM.',
      '',
    ].join('\n'),
  }],

  'cat': (args) => {
    if (args[0] === 'resume.pdf') {
      return [{
        type: 'system',
        content: [
          '',
          '📄 Opening resume...',
          '',
          '  Just kidding — this is a terminal, not a PDF reader.',
          '  But you can explore my experience with these commands:',
          '  → whoami, experience, skills, education, projects',
          '',
        ].join('\n'),
      }];
    }
    return [{ type: 'error', content: `cat: ${args[0] || ''}: No such file or directory` }];
  },

  'sudo': (args) => {
    if (args.join(' ').includes('rm -rf')) {
      return [{
        type: 'system',
        content: [
          '',
          '💀 sudo rm -rf /',
          '',
          '  Nice try! But this portfolio is read-only.',
          '  Besides, I back up everything. 😎',
          '',
          '  ██████████████████████████ 100%',
          '  Deleting nothing... Done!',
          '',
        ].join('\n'),
      }];
    }
    return [{ type: 'error', content: 'sudo: permission denied. This incident will be reported.' }];
  },
};

export function executeCommand(input: string): { command: string; output: CommandOutput[] } {
  const trimmed = input.trim();
  if (!trimmed) return { command: '', output: [] };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Special case for "cat resume.pdf"
  if (cmd === 'cat') {
    const handler = commands['cat'];
    return { command: trimmed, output: handler(args) };
  }

  // Special case for "sudo rm -rf /"
  if (cmd === 'sudo') {
    const handler = commands['sudo'];
    return { command: trimmed, output: handler(args) };
  }

  const handler = commands[cmd];
  if (!handler) {
    return {
      command: trimmed,
      output: [{
        type: 'error',
        content: `${cmd}: command not found. Type 'help' for available commands.`,
      }],
    };
  }

  return { command: trimmed, output: handler(args) };
}
