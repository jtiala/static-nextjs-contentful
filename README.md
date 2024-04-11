# Next.js static export with app router and Contentful integration

This is an example repository for a [Next.js](http://nextjs.org) site using the app router, fetching data from [Contentful](https://www.contentful.com), and generating TypeScript types for the content model. It also includes setups for local previewing of unpublished Contentful content and automatic site generation when content changes in Contentful.

The repo is inspired by [this great article](https://maxschmitt.me/posts/nextjs-contentful-typescript) by Max Schmitt but I've made some major changes.

## Running the site locally

If you want to run this project yourself, you'll need to create a new Contentful space first. Also, create a new API key in `Settings -> API keys -> Add API key` and a personal access token in `Settings -> CMA Tokens -> Create personal access token`.

Next, copy `.env.local.example` as `.env.local` and fill in your API keys from Contentful. If you want to include unpublished content in your local build, set `CONTENTFUL_CONTENT_PREVIEW=true`. `BASE_PATH` should be left empty for local builds.

Now you can import the included content model in your Contentful space. Use the following script:

```bash
npm run import-content-model contentful-content-model.json
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building the static export

You can build the static site with the `build` script:

```bash
npm run build
```

To preview the build locally, run:

```bash
npm run start
```

## Generating types from the Contentful Content Model

If you make changes to the content model in Contentful, you can run the following command to generate updated TypeScript types.

```bash
npm run generate-types
```

## Setting up content preview in Contentful

In Contentful, go to `Settings -> Content preview`. Set the preview mode to `Preview in new tab`. Next, click `Add content preview`. Check all the content types and set URLs like this for each content type: `http://localhost:3000/[CONTENT_TYPE_ID in plural]/{entry.sys.id}`. Now you should be able to open unpublished content in localhost, just make sure that you have set the `CONTENTFUL_CONTENT_PREVIEW` as `true` and that the dev server or static build preview is running.

## Triggering GitHub Actions workflow when content changes in Contentful

You'll probably want to rebuild the static site after you publish new content in Contentful. This can be achieved with a webhook.

1. Follow [this guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) to create a new personal access token (classic) in GitHub. The token needs only `repo` access.
2. Create a new webhook in Contentful: `Settings -> Webhooks -> Add Webhook`.

   - Give the webhook a name of your choice.
   - For the URL, use `POST https://api.github.com/repos/<username>/<repository>/dispatches`.
   - Select specific triggering events: `Publish`, `Unpublish`, and `Delete` for **Entry** events.
   - Add two custom headers: `Accept: application/vnd.github.v3+json` and `User-Agent: Contentful Webhook`
   - Add one secret header: `Authorization: Bearer <GitHub Personal access token`
   - Customize the webhook payload:

     ```json
     {
       "event_type": "publish-event"
     }
     ```

     Note: The event type must match the `repository_dispatch` in your GitHub workflow, in our case `.github/workflows/build-deploy.yml`.

   - Leave other settings as default.
