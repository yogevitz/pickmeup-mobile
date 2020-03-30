let axios = require('axios');

let axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  /* other custom settings */
});

module.exports = axiosInstance;
