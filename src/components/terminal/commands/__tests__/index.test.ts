import { executeCommand } from '../index';

describe('executeCommand', () => {
  // --- Basic commands ---
  it('returns empty output for empty input', () => {
    const result = executeCommand('', 'en');
    expect(result.command).toBe('');
    expect(result.output).toEqual([]);
  });

  it('returns empty output for whitespace-only input', () => {
    const result = executeCommand('   ', 'en');
    expect(result.command).toBe('');
    expect(result.output).toEqual([]);
  });

  it('returns error for unknown command', () => {
    const result = executeCommand('foobar', 'en');
    expect(result.output).toHaveLength(1);
    expect(result.output[0].type).toBe('error');
    expect(result.output[0].content).toContain('command not found');
  });

  it('is case insensitive for commands', () => {
    const result = executeCommand('HELP', 'en');
    expect(result.output).toHaveLength(1);
    expect(result.output[0].type).toBe('text');
    expect(result.output[0].content).toContain('Available commands');
  });

  // --- help ---
  it('help returns available commands list', () => {
    const result = executeCommand('help', 'en');
    expect(result.output[0].content).toContain('Available commands');
    expect(result.output[0].content).toContain('whoami');
    expect(result.output[0].content).toContain('skills');
  });

  // --- whoami ---
  it('whoami returns name and title', () => {
    const result = executeCommand('whoami', 'en');
    expect(result.output[0].content).toContain('Bruno Pedroso');
    expect(result.output[0].content).toContain('Back-End');
  });

  // --- skills ---
  it('skills returns skill categories', () => {
    const result = executeCommand('skills', 'en');
    expect(result.output.length).toBeGreaterThan(0);
    const allContent = result.output.map((o) => o.content).join('\n');
    expect(allContent).toContain('TypeScript');
  });

  // --- experience ---
  it('experience returns work history', () => {
    const result = executeCommand('experience', 'en');
    expect(result.output.length).toBeGreaterThan(0);
    const allContent = result.output.map((o) => o.content).join('\n');
    expect(allContent).toContain('NextIA');
  });

  // --- education ---
  it('education returns education entries', () => {
    const result = executeCommand('education', 'en');
    expect(result.output.length).toBeGreaterThan(0);
    const allContent = result.output.map((o) => o.content).join('\n');
    expect(allContent).toContain('Full Cycle');
  });

  // --- projects ---
  it('projects returns project list', () => {
    const result = executeCommand('projects', 'en');
    expect(result.output.length).toBeGreaterThan(0);
    const allContent = result.output.map((o) => o.content).join('\n');
    expect(allContent).toContain('Lead Message Automation');
  });

  // --- contact ---
  it('contact returns contact info', () => {
    const result = executeCommand('contact', 'en');
    expect(result.output[0].content).toContain('dev.bpedroso@gmail.com');
    expect(result.output[0].content).toContain('GitHub');
  });

  // --- whatsapp ---
  it('whatsapp returns system message about opening WhatsApp', () => {
    const result = executeCommand('whatsapp', 'en');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('WhatsApp');
  });

  // --- email ---
  it('email returns system message about opening email client', () => {
    const result = executeCommand('email', 'en');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('email');
  });

  // --- curriculum ---
  it('curriculum returns download message', () => {
    const result = executeCommand('curriculum', 'en');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('Downloading resume');
  });

  // --- clear ---
  it('clear returns empty output', () => {
    const result = executeCommand('clear', 'en');
    expect(result.output).toEqual([]);
  });

  // --- secret ---
  it('secret returns easter egg', () => {
    const result = executeCommand('secret', 'en');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('secret');
    expect(result.output[0].content).toContain('Arthur C. Clarke');
  });

  // --- cat ---
  it('cat resume.pdf returns joke message', () => {
    const result = executeCommand('cat resume.pdf', 'en');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('not a PDF reader');
  });

  it('cat with unknown file returns error', () => {
    const result = executeCommand('cat foo.txt', 'en');
    expect(result.output[0].type).toBe('error');
    expect(result.output[0].content).toContain('No such file or directory');
  });

  it('cat with no args returns error', () => {
    const result = executeCommand('cat', 'en');
    expect(result.output[0].type).toBe('error');
  });

  // --- sudo ---
  it('sudo rm -rf / returns joke message', () => {
    const result = executeCommand('sudo rm -rf /', 'en');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('read-only');
  });

  it('sudo with other args returns permission denied', () => {
    const result = executeCommand('sudo apt install vim', 'en');
    expect(result.output[0].type).toBe('error');
    expect(result.output[0].content).toContain('permission denied');
  });

  // --- Portuguese locale ---
  describe('pt locale', () => {
    it('help is translated to Portuguese', () => {
      const result = executeCommand('help', 'pt');
      expect(result.output[0].content).toContain('Comandos disponíveis');
    });

    it('unknown command error is translated', () => {
      const result = executeCommand('foobar', 'pt');
      expect(result.output[0].type).toBe('error');
      expect(result.output[0].content).toContain('comando não encontrado');
    });

    it('curriculum download message is translated', () => {
      const result = executeCommand('curriculum', 'pt');
      expect(result.output[0].content).toContain('Baixando o currículo');
    });
  });
});
