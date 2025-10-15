export default {
    // Format with Prettier (runs on staged files only)
    '**/*.{js,jsx,ts,tsx,json,css,scss,md,mdx,yml,yaml}': ['prettier --write'],

    // Lint TypeScript/JavaScript files in web app
    'apps/web/**/*.{js,jsx,ts,tsx}': () => 'cd apps/web && pnpm lint',

    // Type check in web app when TS files change
    'apps/web/**/*.{ts,tsx}': () => 'cd apps/web && pnpm typecheck',
}
