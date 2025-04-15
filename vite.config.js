// filepath: c:\Users\Eva Muñoz\Desktop\evamunoz\vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: './postcss.config.js',
  },
});