export type CommandOutput = {
  type: 'text' | 'html' | 'error' | 'system';
  content: string;
};

export type TerminalLine = {
  id: string;
  command?: string;
  output: CommandOutput[];
  timestamp: number;
};

export type TerminalState = {
  lines: TerminalLine[];
  history: string[];
  historyIndex: number;
  isBooting: boolean;
};

export type Command = {
  name: string;
  description: string;
  descriptionPt: string;
  execute: (args: string[]) => CommandOutput[];
};
