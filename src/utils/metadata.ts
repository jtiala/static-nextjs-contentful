export const siteTitle = "BallerBase";

export function generateTitle(pageTitle?: string) {
  if (!pageTitle || pageTitle.length === 0) {
    return siteTitle;
  }

  return `${pageTitle} | ${siteTitle}`;
}
