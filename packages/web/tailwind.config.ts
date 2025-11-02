// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  // Esta linha é crucial. Ela diz ao Tailwind para ler todos os arquivos em /src
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Isso ensina o Tailwind a usar nossas variáveis de cor
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
}
export default config