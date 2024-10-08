// @ts-check
import { defineConfig } from 'astro/config';

import netlify from "@astrojs/netlify";

import db from "@astrojs/db";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [db(), react(), tailwind()]
});