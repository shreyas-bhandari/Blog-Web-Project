const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// AUTH SERVICE
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://auth-service:5001",
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "",   // 🔥 VERY IMPORTANT
    },
  })
);

// BLOG SERVICE
app.use(
  "/blogs",
  createProxyMiddleware({
    target: "http://blog-service:5002",
    changeOrigin: true,
    pathRewrite: {
      "^/blogs": "",
    },
  })
);

app.listen(5000, () => {
  console.log("API Gateway running on 5000");
});