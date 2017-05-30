/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

/**
 * Gets an item from local storage.
 * @param   {string} name the identifier of the data to return.
 * @returns {*}           the stored value.
 *
 * @private
 * @function
 * @module storage
 */
function getFromStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

/**
 * Gets an item from cookies.
 * @param   {string} name the identifier of the data to return.
 * @returns {*}           the stored value.
 *
 * @private
 * @function
 * @module storage
 */
function getFromCookie(name) {
  return JSON.parse(decodeURIComponent(document.cookie.replace(
    new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), '$1'
  )) || 'null');
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
 * Saves an item in local storage.
 * @param   {string}  name the identifier of the data to save.
 * @param   {*}       data the data to save.
 * @returns {boolean}      `true`.
 *
 * @private
 * @function
 * @module storage
 */
function saveToStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
  return true;
}

/**
 * Saves an item in cookies.
 * @param   {string}  name the identifier of the data to save.
 * @param   {*}       data the data to save.
 * @returns {boolean}      `true`.
 *
 * @private
 * @function
 * @module storage
 */
function saveToCookie(name, data) {
  let date = new Date();
  date.setFullYear(new Date().getFullYear() + 1);
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(data))};expires=${date.toUTCString()};`;
  return true;
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
};
