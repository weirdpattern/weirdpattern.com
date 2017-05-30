/**
 * Determines if local/session storage is supported by the browser.
 * @returns {boolean} `true` if supported; `false` otherwise.
 *
 * @private
 * @function
 * @module storage
 */
function isStorageSupported() {
  return typeof Storage !== "undefined";
}

/**
 * Determines if cookies are supported by the browser.
 * @returns {boolean} `true` if supported; `false` otherwise.
 *
 * @private
 * @function
 * @module storage
 */
function isCookieSupported() {
  return navigator.cookieEnabled;
}

/**
 * Determines if storage (of any kind) is supported.
 * @returns {boolean} `true` if supported; `false` otherwise.
 *
 * @private
 * @function
 * @module storage
 */
function isSupported() {
  return isStorageSupported() || isCookieSupported();
}

function getFromStorage(name) {
  return JSON.parse(localStorage.getItem(`weirdpattern-storage-${name}`));
}

function getFromCookie(name) {
  const cookie = decodeURIComponent(document.cookie).match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)
}

/**
 * Gets an item from storage.
 * @param   {string} name the identifier of the data to return.
 * @returns {*}           the stored value.
 *
 * @private
 * @function
 * @module storage
 */
function get(name) {
  if (isStorageSupported()) return getFromStorage(name);
  if (isCookieSupported()) return getFromCookie(name);

  return null;
}

/**
 * Saves an item in storage.
 * @param   {string}  name the identifier of the data to save.
 * @param   {*}       data the data to save.
 * @returns {boolean}      `true` if `data` was saved; `false` otherwise.
 *
 * @private
 * @function
 * @module storage
 */
function save(name, data) {
  if (isStorageSupported()) return saveToStorage(name, data);
  if (isCookieSupported()) return saveToCookie(name, data);

  return false;
}

export default {
  /**
   * @see isSupported
   */
  isSupported,

  /**
   * @see get
   */
  get,

  /**
   * @see save
   */
  save,
}
