export { nextiaConfig } from './nextia';
export { weefindConfig } from './weefind';
export { programarConfig } from './programar';

import { nextiaConfig } from './nextia';
import { weefindConfig } from './weefind';
import { programarConfig } from './programar';
import type { ArchitectureConfig } from '@/types/architecture';

export const architectureConfigs: ArchitectureConfig[] = [
  nextiaConfig,
  weefindConfig,
  programarConfig,
];
