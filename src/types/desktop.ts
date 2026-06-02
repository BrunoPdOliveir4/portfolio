export type DesktopApp = {
  id: string;
  name: string;
  icon: string;
  command: string;
};

export type DesktopWindow = {
  id: string;
  appId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
};
