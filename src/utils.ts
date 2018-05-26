import * as data from "../content/data.json";
import { Action } from "./interfaces";

const config = data as any;

// common callbacks
// using function to facilitate binding
const callbacks: { [key: string]: Function } = {
  search: function() {
    this.setState({ searching: true });
  },
  scrollTop: function() {
    window.scrollTo(0, 0);
  },
  back: function() {
    window.location.href = config.url;
  }
};

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

/**
 * Gets the common actions.
 * @param {Array<string>} candidates the types to be added.
 * @returns {Array<Action>} the actions.
 *
 * @public
 * @function
 */
export function getCommonActions(...candidates: Array<string>): Array<Action> {
  const actions: Array<Action> = [];

  let index = -1;
  const length = candidates.length;
  while (++index < length) {
    actions.push({
      name: candidates[index],
      callback: callbacks[candidates[index]]
    });
  }

  return actions;
}
