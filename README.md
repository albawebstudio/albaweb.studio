# Alba Web Studio

This is the base repository for the Alba Web Studio website. The site leverages several frameworks.

- [Tailwindcss v3](https://tailwindcss.com/)
- [Nuxt v3](https://nuxt.com/)

## Requirements

- IDEA such as [WebStorm](https://www.jetbrains.com/webstorm/) or [Visual Studio Code](https://code.visualstudio.com/)
- Node package manager (npm, pnpm, yarn, or bun)
- [AWS CLI](https://aws.amazon.com/cli/) along with AWS credentials
- [Netlify CLI](https://www.netlify.com/platform/core/cli/#install) If using Netlify

## Setup

Each folder should have its own README.md file with instruction for installing.

## Fetch ENV vars

```shell
aws ssm get-parameter --region us-east-1 \
	--name /alba-web-studio/app/.env.<envrironment> \
	--profile default \
	--query Parameter.Value \
	--with-decryption \
	--output text > ./app/.env.<envrironment>
```

If you need to make changes to the file, be sure to push the changes back to AWS. You can modify this command to push a
new revision to AWS SSM.

```shell
aws ssm put-parameter \
    --region us-east-1 \
    --name /alba-web-studio/app/.env.<enviornment> \
    --profile default \
    --value file://app/.env.<enviornment> \
--type "SecureString" \
--overwrite
```