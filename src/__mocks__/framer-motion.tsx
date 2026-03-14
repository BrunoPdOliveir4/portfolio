/* eslint-disable react/display-name, @typescript-eslint/no-unused-vars */
import React from 'react';

const MOTION_PROPS = ['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'layout', 'variants'];

const motion = new Proxy(
  {},
  {
    get: (_target, prop: string) => {
      return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
        const filtered: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(props)) {
          if (!MOTION_PROPS.includes(key)) {
            filtered[key] = value;
          }
        }
        return React.createElement(prop, { ...filtered, ref });
      });
    },
  }
);

const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export { motion, AnimatePresence };
