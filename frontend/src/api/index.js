const API = {
  securedFetch: async (route, accessToken, body, opts = {}) => {
    const options = {
      ...opts,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
      options.method = options.method || "POST";
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
    }

    return await fetch(route, options);
  },

  fetchJSON: (route, accessToken, body = {}, opts = {}) =>
    API.securedFetch(route, accessToken, body, opts).then((response) => {
      if (response.ok) {
        if (response.headers.get("content-type").match(/application\/json/i)) {
          return response.json();
        }
        return new Promise((resolve, reject) => reject(response));
      }
      if (response.status >= 400) {
        return new Promise((resolve, reject) => {
          response
            .json()
            .then((json) => {
              reject(json);
            })
            .catch(() => {
              reject({
                error: {
                  type: "FetchParseError",
                  message:
                    "A 422 error was thrown, but the response could not be parsed as JSON",
                },
              });
            });
        });
      }
      return new Promise((resolve, reject) => reject(response));
    }),
};

export default API;
