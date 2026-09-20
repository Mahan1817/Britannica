import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './Tests',

  timeout: 30000,

  reporter: [
    ['html'],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    viewport: null,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on',
  },
});