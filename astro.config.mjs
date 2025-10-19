// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
import {tanstackRouter} from '@tanstack/router-vite-plugin';

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react()],

  vite: {
    plugins: [tailwindcss(), tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    })],
  }
});