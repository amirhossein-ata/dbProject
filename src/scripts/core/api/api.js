/* eslint-disable no-console */
/* eslint-disable brace-style */
/**
 * Client
 * @module Client
 */

export class ServerError extends Error {
  response;

  constructor(response, ...params) {
    super(...params);

    Error.captureStackTrace(this, ServerError);

    this.name = "ServerError";
    this.response = {};

    return this;
  }
}

export function parseError(error) {
  return error || "Something went wrong";
}

/**
 * Fetch data
 *
 * @param {string} url
 * @param {Object} options
 * @param {string} [options.method] - Request method ( GET, POST, PUT, ... ).
 * @param {string} [options.payload] - Request body.
 * @param {Object} [options.headers]
 *
 * @returns {Promise}
 */
const baseUrl = "https://danial.dev";
export function request(url, options = {}) {
  const config = {
    method: options.method,
    ...options,
  };
  const errors = [];

  if (!url) {
    errors.push("url");
  }

  if (
    !config.payload &&
    config.method !== "GET" &&
    config.method !== "DELETE"
  ) {
    errors.push("payload");
  }

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join("`, `")}\``);
  }

  let token = "";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token,
    ...config.headers,
  };

  const params = {
    headers,
    method: config.method,
  };

  if (params.method !== "GET") {
    params.body = JSON.stringify(config.payload);
  }
  const newUrl = baseUrl + url;
  return fetch(newUrl, params).then(async (response) => {
    if (response.status > 299) {
      const error = new ServerError(response.statusText);
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        error.response = {
          status: response.status,
          data: await response.json(),
        };
      } else {
        error.response = {
          status: response.status,
          data: await response.text(),
        };
      }
      throw error;
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }
      return response.text();
    }
  });
}
