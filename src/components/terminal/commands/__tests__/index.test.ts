import { executeCommand } from '../index';

describe('executeCommand', () => {
  // --- Basic commands ---
  it('returns empty output for empty input', () => {
    const result = executeCommand('');
    expect(result.command).toBe('');
    expect(result.output).toEqual([]);
  });

  it('returns empty output for whitespace-only input', () => {
    const result = executeCommand('   ');
    expect(result.command).toBe('');
    expect(result.output).toEqual([]);
  });

  it('returns error for unknown command', () => {
    const result = executeCommand('foobar');
    expect(result.output).toHaveLength(1);
    expect(result.output[0].type).toBe('error');
    expect(result.output[0].content).toContain('command not found');
  });

  it('is case insensitive for commands', () => {
    const result = executeCommand('HELP');
    expect(result.output).toHaveLength(1);
    expect(result.output[0].type).toBe('text');
    expect(result.output[0].content).toContain('Available commands');
  });

  // --- help ---
  it('help returns available commands list', () => {
    const result = executeCommand('help');
    expect(result.output[0].content).toContain('Available commands');
    expect(result.output[0].content).toContain('whoami');
    expect(result.output[0].content).toContain('skills');
  });

  // --- whoami ---
  it('whoami returns name and title', () => {
    const result = executeCommand('whoami');
    expect(result.output[0].content).toContain('Bruno Pedroso');
    expect(result.output[0].content).toContain('Back-End');
  });

  // --- skills ---
  it('skills returns skill categories', () => {
    const result = executeCommand('skills');
    expect(result.output.length).toBeGreaterThan(0);
    const allContent = result.output.map((o) => o.content).join('\n');
    expect(allContent).toContain('TypeScript');
  });

  // --- experience ---
  it('experience returns work history', () => {
    const result = executeCommand('experience');
    expect(result.output.length).toBeGreaterThan(0);
    const allContent = result.output.map((o) => o.content).join('\n');
    expect(allContent).toContain('NextIA');
  });

  // --- education ---
  it('education returns education entries', () => {
    const result = executeCommand('education');
    expect(result.output.length).toBeGreaterThan(0);
    const allContent = result.output.map((o) => o.content).join('\n');
    expect(allContent).toContain('Full Cycle');
  });

  // --- projects ---
  it('projects returns project list', () => {
    const result = executeCommand('projects');
    expect(result.output.length).toBeGreaterThan(0);
    const allContent = result.output.map((o) => o.content).join('\n');
    expect(allContent).toContain('Lead Message Automation');
  });

  // --- contact ---
  it('contact returns contact info', () => {
    const result = executeCommand('contact');
    expect(result.output[0].content).toContain('dev.bpedroso@gmail.com');
    expect(result.output[0].content).toContain('GitHub');
  });

  // --- whatsapp ---
  it('whatsapp returns system message about opening WhatsApp', () => {
    const result = executeCommand('whatsapp');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('WhatsApp');
  });

  // --- email ---
  it('email returns system message about opening email client', () => {
    const result = executeCommand('email');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('email');
  });

  // --- curriculum ---
  it('curriculum returns download message', () => {
    const result = executeCommand('curriculum');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('Downloading resume');
  });

  // --- clear ---
  it('clear returns empty output', () => {
    const result = executeCommand('clear');
    expect(result.output).toEqual([]);
  });

  // --- secret ---
  it('secret returns easter egg', () => {
    const result = executeCommand('secret');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('secret');
    expect(result.output[0].content).toContain('Arthur C. Clarke');
  });

  // --- cat ---
  it('cat resume.pdf returns joke message', () => {
    const result = executeCommand('cat resume.pdf');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('not a PDF reader');
  });

  it('cat with unknown file returns error', () => {
    const result = executeCommand('cat foo.txt');
    expect(result.output[0].type).toBe('error');
    expect(result.output[0].content).toContain('No such file or directory');
  });

  it('cat with no args returns error', () => {
    const result = executeCommand('cat');
    expect(result.output[0].type).toBe('error');
  });

  // --- sudo ---
  it('sudo rm -rf / returns joke message', () => {
    const result = executeCommand('sudo rm -rf /');
    expect(result.output[0].type).toBe('system');
    expect(result.output[0].content).toContain('read-only');
  });

  it('sudo with other args returns permission denied', () => {
    const result = executeCommand('sudo apt install vim');
    expect(result.output[0].type).toBe('error');
    expect(result.output[0].content).toContain('permission denied');
  });
});
