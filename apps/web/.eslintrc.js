module.exports = {
  extends: ["custom/next"],
  rules: {
    // Ignore next image optimization for CDN image
    '@next/next/no-img-element': ['off'],
  }
};
