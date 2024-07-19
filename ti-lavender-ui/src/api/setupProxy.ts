// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'http://dev.agilemadhi.in/lavender-api/c/getCustomerProfile', // Your API endpoint
    createProxyMiddleware({
      target: 'http://localhost:3001', // Your backend server URL
      changeOrigin: true,
    })
  );
};
