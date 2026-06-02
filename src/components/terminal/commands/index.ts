import { cv } from '@/data/cv';
import { pick, formatPeriod } from '@/lib/cv-i18n';
import type { CommandOutput } from '@/types/terminal';

type CommandHandler = (args: string[], locale: string) => CommandOutput[];

const commands: Record<string, CommandHandler> = {
  help: (_args, locale) => [{
    type: 'text',
    content: [
      pick(locale, 'Comandos disponíveis:', 'Available commands:'),
      '',
      `  help          — ${pick(locale, 'Mostra esta ajuda', 'Show this help message')}`,
      `  whoami        — ${pick(locale, 'Sobre mim', 'About me')}`,
      `  skills        — ${pick(locale, 'Habilidades técnicas', 'Technical skills')}`,
      `  experience    — ${pick(locale, 'Experiência profissional', 'Work experience')}`,
      `  education     — ${pick(locale, 'Formação', 'Education')}`,
      `  projects      — ${pick(locale, 'Projetos relevantes', 'Relevant projects')}`,
      `  contact       — ${pick(locale, 'Informações de contato', 'Contact info')}`,
      `  whatsapp      — ${pick(locale, 'Me manda um WhatsApp', 'Send me a WhatsApp message')}`,
      `  email         — ${pick(locale, 'Me manda um email', 'Send me an email')}`,
      `  curriculum    — ${pick(locale, 'Baixar meu currículo (PDF)', 'Download my resume (PDF)')}`,
      `  clear         — ${pick(locale, 'Limpar o terminal', 'Clear terminal')}`,
      '  secret        — ???',
      '  cat resume.pdf',
    ].join('\n'),
  }],

  whoami: (_args, locale) => [{
    type: 'text',
    content: [
      `╔══════════════════════════════════════════╗`,
      `║  ${cv.name}`,
      `║  ${pick(locale, cv.title, cv.titleEn)}`,
      `╚══════════════════════════════════════════╝`,
      '',
      pick(locale, cv.profile, cv.profileEn),
    ].join('\n'),
  }],

  skills: (_args, locale) => cv.skills.map((cat) => ({
    type: 'text' as const,
    content: `\x1b[32m${pick(locale, cat.category, cat.categoryEn)}\x1b[0m\n  ${cat.skills.join(' • ')}`,
  })),

  experience: (_args, locale) => cv.experience.map((exp) => ({
    type: 'text' as const,
    content: [
      `\x1b[32m${pick(locale, exp.role, exp.roleEn)}\x1b[0m — ${exp.company}`,
      `  ${formatPeriod(exp.periodStart, exp.periodEnd, locale)}`,
      '',
      ...pick(locale, exp.bullets, exp.bulletsEn).map((b) => `  • ${b}`),
      '',
      `  Stack: ${exp.technologies.join(', ')}`,
    ].join('\n'),
  })),

  education: (_args, locale) => cv.education.map((edu) => ({
    type: 'text' as const,
    content: [
      `\x1b[32m${edu.institution}\x1b[0m`,
      `  ${pick(locale, edu.degree, edu.degreeEn)}`,
      `  ${edu.period}`,
    ].join('\n'),
  })),

  projects: (_args, locale) => cv.projects.map((proj) => ({
    type: 'text' as const,
    content: [
      `\x1b[32m${pick(locale, proj.name, proj.nameEn)}\x1b[0m`,
      `  ${pick(locale, proj.description, proj.descriptionEn)}`,
      `  Tech: ${proj.technologies.join(', ')}`,
    ].join('\n'),
  })),

  contact: (_args, locale) => [{
    type: 'text',
    content: [
      `📧 Email:    ${cv.contact.email}`,
      `📍 ${pick(locale, 'Local', 'Location')}:    ${cv.contact.location}`,
      `🐙 GitHub:   github.com/${cv.contact.github}`,
      `💼 LinkedIn: linkedin.com/in/${cv.contact.linkedin}`,
      `📱 ${pick(locale, 'Telefone', 'Phone')}: ${cv.contact.phone}`,
    ].join('\n'),
  }],

  whatsapp: (_args, locale) => {
    const phoneDigits = cv.contact.phone.replace(/\D/g, '');
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/${phoneDigits}`, '_blank');
    }
    return [{
      type: 'system',
      content: [
        '',
        pick(locale, '📱 Abrindo o WhatsApp...', '📱 Opening WhatsApp...'),
        '',
        `  ${pick(locale, 'Redirecionando para', 'Redirecting to')} wa.me/${phoneDigits}`,
        `  ${pick(locale, 'Uma nova aba deve abrir em instantes.', 'A new tab should open shortly.')}`,
        '',
      ].join('\n'),
    }];
  },

  email: (_args, locale) => {
    if (typeof window !== 'undefined') {
      window.open(`mailto:${cv.contact.email}`, '_blank');
    }
    return [{
      type: 'system',
      content: [
        '',
        pick(locale, '📧 Abrindo o cliente de email...', '📧 Opening email client...'),
        '',
        `  ${pick(locale, 'Escrevendo email para', 'Composing email to')} ${cv.contact.email}`,
        `  ${pick(locale, 'Seu cliente de email deve abrir em instantes.', 'Your email client should open shortly.')}`,
        '',
      ].join('\n'),
    }];
  },

  curriculum: (_args, locale) => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/curriculum.pdf`;
      link.download = 'Bruno_Pedroso_Curriculum.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return [{
      type: 'system',
      content: [
        '',
        pick(locale, '📄 Baixando o currículo...', '📄 Downloading resume...'),
        '',
        `  ${pick(locale, 'O download deve começar automaticamente.', 'Your download should start automatically.')}`,
        '  File: Bruno_Pedroso_Curriculum.pdf',
        '',
      ].join('\n'),
    }];
  },

  clear: () => [],

  secret: (_args, locale) => [{
    type: 'system',
    content: [
      '',
      pick(locale, '🔓 Você achou o segredo!', '🔓 You found the secret!'),
      '',
      '  "Any sufficiently advanced technology is',
      '   indistinguishable from magic." — Arthur C. Clarke',
      '',
      ...pick(
        locale,
        [
          '  Curiosidade: antes de virar engenheiro de software,',
          '  eu estudei Educação Musical. A disciplina de treinar',
          '  escalas se traduz surpreendentemente bem em depurar',
          '  sistemas em produção às 3 da manhã.',
        ],
        [
          '  Fun fact: Before becoming a software engineer,',
          '  I studied Music Education. The discipline of',
          '  practicing scales translates surprisingly well',
          '  to debugging production systems at 3 AM.',
        ],
      ),
      '',
    ].join('\n'),
  }],

  'cat': (args, locale) => {
    if (args[0] === 'resume.pdf') {
      return [{
        type: 'system',
        content: [
          '',
          pick(locale, '📄 Abrindo o currículo...', '📄 Opening resume...'),
          '',
          ...pick(
            locale,
            [
              '  Brincadeira — isto é um terminal, não um leitor de PDF.',
              '  Mas dá pra explorar minha experiência com estes comandos:',
              '  → whoami, experience, skills, education, projects',
            ],
            [
              '  Just kidding — this is a terminal, not a PDF reader.',
              '  But you can explore my experience with these commands:',
              '  → whoami, experience, skills, education, projects',
            ],
          ),
          '',
        ].join('\n'),
      }];
    }
    return [{
      type: 'error',
      content: `cat: ${args[0] || ''}: ${pick(locale, 'Arquivo ou diretório não encontrado', 'No such file or directory')}`,
    }];
  },

  'sudo': (args, locale) => {
    if (args.join(' ').includes('rm -rf')) {
      return [{
        type: 'system',
        content: [
          '',
          '💀 sudo rm -rf /',
          '',
          ...pick(
            locale,
            [
              '  Boa tentativa! Mas este portfólio é somente leitura.',
              '  E, além disso, eu tenho backup de tudo. 😎',
            ],
            [
              '  Nice try! But this portfolio is read-only.',
              '  Besides, I back up everything. 😎',
            ],
          ),
          '',
          '  ██████████████████████████ 100%',
          pick(locale, '  Deletando nada... Pronto!', '  Deleting nothing... Done!'),
          '',
        ].join('\n'),
      }];
    }
    return [{
      type: 'error',
      content: pick(
        locale,
        'sudo: permissão negada. Este incidente será reportado.',
        'sudo: permission denied. This incident will be reported.',
      ),
    }];
  },
};

export const commandNames = Object.keys(commands);

export function getCommandSuggestions(partial: string): string[] {
  if (!partial) return [];
  const lower = partial.toLowerCase();
  return commandNames.filter((name) => name.startsWith(lower) && name !== lower);
}

export function executeCommand(
  input: string,
  locale: string,
): { command: string; output: CommandOutput[] } {
  const trimmed = input.trim();
  if (!trimmed) return { command: '', output: [] };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const handler = commands[cmd];
  if (!handler) {
    return {
      command: trimmed,
      output: [{
        type: 'error',
        content: `${cmd}: ${pick(locale, "comando não encontrado. Digite 'help' para ver os comandos.", "command not found. Type 'help' for available commands.")}`,
      }],
    };
  }

  return { command: trimmed, output: handler(args, locale) };
}
