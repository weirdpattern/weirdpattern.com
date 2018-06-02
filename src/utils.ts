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
  },
  home: function() {
    window.location.href = config.url;
  },
  report: function() {
    const mailTo = config.authors[config.profile.author].networks.email.link;
    window.location.href = `${mailTo}?subject=Page not found&body=The following page was not found: ${
      document.referrer
    }`;
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

/**
 * Syncs prism frames with the corresponding styles.
 * @param {Document} document the document object.
 * @returns {void}
 *
 * @public
 * @function
 */
export function syncPrism(document: Document): void {
  Array.from(document.querySelectorAll(".gatsby-highlight")).forEach(
    (element: Element) => {
      const pre = element.querySelector("pre[class*='language-']");
      const language = pre.getAttribute("class").split("-")[1];

      const container = document.createElement("div");
      container.setAttribute("class", "code-header");

      const title = document.createElement("span");
      title.innerText =
        language.trim().toLowerCase() !== "text" ? language : "";

      const copy = document.createElement("div");
      copy.setAttribute("class", "copy");
      copy.addEventListener("click", () => {
        const text = pre.querySelector("code").innerText;
        copyToClipboard(text);

        copy.classList.add("success");
        setTimeout(() => {
          copy.classList.remove("success");
        }, 1000);
      });

      container.appendChild(title);
      container.appendChild(copy);

      pre.parentElement.insertBefore(container, pre);
    }
  );
}
