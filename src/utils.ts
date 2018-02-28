/**
 * Determines if the given width falls under the mobile category.
 * @param {number} width the width to be validated.
 * @returns {boolean} true if mobile; false otherwise.
 *
 * @public
 * @function
 */
export function isMobile(width: number): boolean {
  return width < 769;
}
