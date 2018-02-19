/**
 * Match unsecure pattern web
 * @type {RegExp}
 */
const HTTP_PATTERN = /^http:\/\/|^\/\//;

/**
 * Http protocol
 * @type {string}
 */
const HTTP_PROTOCOL = 'http:';

/**
 * Https protocol
 * @type {string}
 */
const HTTPS_PROTOCOL = 'https:';

/**
 * @access private
 * @param {string} apiUrl
 * @return {string}
 */
const normalizeApiUrl = (apiUrl) => {
  const last = apiUrl.charAt(apiUrl.length - 1);
  const SLASH = '/';
  return last === SLASH ? apiUrl : apiUrl + SLASH;
};

/**
 * Default ZetaPush API URL
 * @access private
 */
export const API_URL = 'https://api.zpush.io/';

/**
 * Force ssl based protocol for network echange
 * Cross Env (Browser/Node) test
 * @access private
 * @type boolean
 */
export const FORCE_HTTPS =
  typeof location === 'undefined'
    ? false
    : location.protocol === HTTPS_PROTOCOL;

/**
 * @access private
 * @param {string} url
 * @param {boolean} forceHttps
 * @return {string}
 */
export const getSecureUrl = (url, forceHttps) => {
  return forceHttps ? url.replace(HTTP_PATTERN, `${HTTPS_PROTOCOL}//`) : url;
};
