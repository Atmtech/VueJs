module.exports = {
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 5001,
    https: false,
    hotOnly: false
  }
};

