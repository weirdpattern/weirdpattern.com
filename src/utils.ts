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

/**
 * Copies text to clipboard.
 * @param {string} text the text to be copied.
 * @returns {void}
 *
 * @public
 * @function
 */
export function copyToClipboard(text: string): void {
  const listener = (e: ClipboardEvent) => {
    e.clipboardData.setData("text/plain", text);
    e.preventDefault();
  };

  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}
