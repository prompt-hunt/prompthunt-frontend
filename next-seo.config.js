const title = "PromptHunt";
const description = "This open archive of AI prompts";
const url = "https://prompthunt.vercel.app/";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title,
  description,
  canonical: url,
  openGraph: {
    type: "website",
    locale: "en_IE",
    site_name: "My App",
    title,
    description,
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};
