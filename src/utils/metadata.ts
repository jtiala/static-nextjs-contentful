export function generateTitle(pageTitle?: string) {
  if (!pageTitle || pageTitle.length === 0) {
    return "BallerBase";
  }

  return `${pageTitle} | BallerBase`;
}
