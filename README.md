# Front end scaffold

![Vercel](https://vercelbadge.vercel.app/api/vizzuality1/front-end-scaffold-docs)

This is a project template which could be used to the creation of new projects. Some of the features included are:

- Based on [Next.js](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/) as CSS Framework
- Reusable components such as forms, modals, icons, and other most use components
- Authentication based on [Next-Auth](https://next-auth.js.org/) already implemented
- [Redux](https://redux.js.org/) and [Redux-Toolkit](https://redux-toolkit.js.org/)
- [Typescript](https://www.typescriptlang.org/) already configured
- [Cypress](https://www.cypress.io/) as testing client
- git workflow and hooks
- editorconfig and code style based on [Airbnb](https://github.com/airbnb/javascript)
- [Storybook](https://storybook.js.org/) also available and configured

**This scaffold is only an example of how to develop an application following some of the standards we set in the Front-end team. Please adapt your project needs to this scaffold, or use it as a reference.**

## Repository Documentation

Run the application and go to [http://localhost:3000/docs](http://localhost:3000/docs) to see the application documentation.

The components documentation files are stored on the docs-containers folder. This containers may be deleted when doing a clean up of the project.

(Online documentation)[front-end-scaffold-docs.vercel.app]

## Getting Started

### Installing dependencies

Assuming you already have Node (at least >=16), let's install the package manager: enable `corepack` first and then `corepack` will install the version set in the `packageManager` property of your `package.json`:

```bash
corepack enable && corepack prepare
```

By default, the scaffold comes with Yarn as package manager, so now we can install the dependencies by running:

```bash
yarn
```

_Note: these instructions assume the project uses Node >= 16, for other scenarios check [Yarn documentation](https://yarnpkg.com/getting-started/install)_

### Quick start

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about this project, take a look at the following resources:

- [Blogin internal post](https://vizzuality.blogin.co/posts/a-scaffold-to-rule-all-of-them-135768) - communication to Vizzuality
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Standardization guidelines](https://vizzuality.github.io/frontismos/docs/guidelines/standardization/) - a set of agreements and conventions.

## Deploy on Vercel

First, we recommend to read the guideline about [how to use Vercel](https://vizzuality.github.io/frontismos/docs/guidelines/vercel/).

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contribution rules

Please, **create a PR** for any improvement or feature you want to add. Try to not commit directly anything on the `main` branch.

## Vulnerability mitigation

[Dependabot's vulnerability security alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts) are configured in this repository and are displayed to the administrators.

When vulnerabilities are detected, a warning message is displayed at the top of the repository. The list of alerts can be found in the Dependabot alerts page.

Here's a step by step guide on how to address vulnerabilities found in production code:

1. Go to the Dependabot alerts page and locate the front-end vulnerability to address
2. Identify if the vulnerability affects production code:
   - To do so run `yarn npm audit --recursive --environment production`
   - If the dependency is _not_ listed by this command, then the vulnerability only affects development code. You can dismiss the alert on GitHub as “Vulnerable code is not actually used” in the top right corner of the vulnerability page.
   - If the dependency _is_ listed, follow the steps below.
3. On the vulnerability page, click the “Create Dependabot security update” button
   - This will create a Pull Request with a fix for the vulnerability. If GitHub can generate this PR, then you can merge and the security alert will disappear.
   - If the vulnerability can't be patched automatically, follow the steps below.
4. If the action fails, then you can semi-automatically update the vulnerable dependency by running `npm_config_yes=true npx yarn-audit-fix --only prod`
   - `yarn-audit-fix` (see [repository](https://github.com/antongolub/yarn-audit-fix)) is a tool that applies the fixes from `npm audit fix` to Yarn installations
   - The tool might also not be able to fix the vulnerability. If so, continue with the steps below.
5. If the action fails, then you will have to manually update the dependencies until the vulnerability is solved

## Env variables

| Variable name                | Description                                                                                                                                                                                                                                                                                                   |         Default value |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------: |
| NEXTAUTH_SECRET              | Key used to encrypt the NextAuth.js JWT, and to hash email verification tokens. Do not forget to add a secret. NextAuth can handle without it in development mode, but it won't in production! [https://next-auth.js.org/configuration/options#secret](https://next-auth.js.org/configuration/options#secret) |                       |
| NEXTAUTH_URL                 | Needed by the next-auth library for [handling auth requests and callbacks](https://next-auth.js.org/configuration/options#nextauth_url). Set the environment variable to the canonical URL of your site. Not needed in Vercel deploys.                                                                        |                       |
| NEXT_PUBLIC_API_URL          | URL of the API.                                                                                                                                                                                                                                                                                               | http://localhost:3000 |
| STORYBOOK_API_URL            | URL of the API for storybook.                                                                                                                                                                                                                                                                                 |                       |
| NEXT_PUBLIC_MAPBOX_API_TOKEN | Mapbox token.                                                                                                                                                                                                                                                                                                 |                       |
| NEXT_PUBLIC_GA_TRACKING_ID   | Google Analytics tracking ID. If you're working with an Google Analytics 4 property, you have a Measurement ID instead of a Tracking ID.                                                                                                                                                                      |                       |
