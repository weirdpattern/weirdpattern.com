import { Action, AuthorMetadata, Metadata } from "./interfaces";

/**
 * Generate callbacks based on the provided metadata.
 * @param {Metadata} metadata the metadata to be used.
 * @returns {Object} an object with callbacks.
 *
 * @private
 * @function
 */
function getCallbacks(metadata: Metadata): { [key: string]: Function } {
  const author = metadata.authors.find(
    (current: AuthorMetadata) => current.id == metadata.profile
  );

  return {
    search: function() {
      this.setState({ searching: true });
    },
    scrollTop: function() {
      window.scrollTo(0, 0);
    },
    back: function() {
      window.location.href = metadata.site.url;
    },
    home: function() {
      window.location.href = metadata.site.url;
    },
    report: function() {
      window.location.href = `${
        author.email.link
      }?subject=Page not found&body=The following page was not found: ${
        document.referrer
      }`;
    }
  };
}

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
  const listener = (e: ClipboardEvent): void => {
    e.clipboardData.setData("text/plain", text);
    e.preventDefault();
  };

  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}

/**
 * Gets the common actions.
 * @param {Metadata} metadata the site information.
 * @param {Array<string>} candidates the types to be added.
 * @returns {Array<Action>} the actions.
 *
 * @public
 * @function
 */
export function getCommonActions(
  metadata: Metadata,
  ...candidates: Array<string>
): Array<Action> {
  const actions: Array<Action> = [];

  let index = -1;
  const length = candidates.length;
  while (++index < length) {
    actions.push({
      name: candidates[index],
      callback: getCallbacks(metadata)[candidates[index]]
    });
  }

  return actions;
}
