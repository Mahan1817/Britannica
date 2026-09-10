import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  reporter: [
    ['html'],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL,

    headless: false,

    viewport: null,

    launchOptions: {
      args: ['--start-maximized'],
    },

    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on',
  },
});