import { theme as chakraTheme } from '@chakra-ui/react';

import type { Config } from 'tailwindcss';

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
  },
} as unknown as Exclude<
  Exclude<Config['theme'], undefined>['extend'],
  undefined
>;

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: theme,
  },
  plugins: [],
} satisfies Config;
