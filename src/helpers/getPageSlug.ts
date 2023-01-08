/**
 * @param pageIndex
 * @returns page slug string
 */
export function getPageSlug(pageIndex: number | null) {
  let pageSlug = "/";
  switch (pageIndex) {
    case 0:
      break;
    case 1:
      pageSlug = "/about/";
      break;
    case 2:
      pageSlug = "/projects/";
      break;
    case 3:
      pageSlug = "/contact/";
      break;
    case 4:
      pageSlug = "/blog/";
      break;

    default:
      break;
  }
  return pageSlug;
}
