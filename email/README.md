# Alba Web Studio / MJML 

Look at the [MJML Responsive Email Framework](https://mjml.io/) to learn more.

## Requirements

- Node package manager (npm, pnpm, yarn, or bun)

## Setup

Make sure to install the dependencies (using your preferred package manager):

```bash
# pnpm
pnpm install

# npm
npm install

# yarn
yarn install

# bun
bun install
```
## Responsive Email Templates

Use the documentation to create your responsive email templates in the `src` directory.

When you are ready, you can build the templates by running the following command:

```bash
# pnpm
pnpm run email:build:contact

# npm
npm run email:build:contact

# yarn
yarn run email:build:contact

# bun
bun run email:build:contact
```

Alternatively, you can use the watch command to automatically build the templates when you make changes:

```bash
# pnpm
pnpm run email:watch:contact

# npm
npm run email:watch:contact

# yarn
yarn run email:watch:contact

# bun
bun run email:watch:contact
```

## Testing

```shell
aws ses send-templated-email \
  --source "support@albawebstudio.com" \
  --destination '{"ToAddresses":["support@albawebstudio.com"]}' \
  --template "albawebstudio-contact_production" \
  --template-data file://tests/ses/contact_form_development.json
```
