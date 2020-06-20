const axios = require('axios');

async function getTask (endpoint) {
    const url = endpoint.url
    const id = endpoint.id
    return axios
      .request({
        method: "GET",
        baseURL: url,
        url: `/tasks/${id}`,
        headers: { Accept: "application/json" },
      })
      .then(response => response.data)
  }
module.exports = { getTask }