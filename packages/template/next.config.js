/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  async redirects() {
    // Defensive redirects for legacy URLs without a locale prefix.
    // Default to /ko since these URLs were the original Korean blog paths
    // before the URL refactor; existing readers + cached browser redirects
    // landing here are most likely Korean speakers.
    // permanent: false (307) so this can be removed later without lingering
    // browser cache problems.
    return [
      {
        source: "/posts",
        destination: "/ko/posts",
        permanent: false,
      },
      {
        source: "/posts/:slug*",
        destination: "/ko/posts/:slug*",
        permanent: false,
      },
      {
        source: "/resume",
        destination: "/ko/resume",
        permanent: false,
      },
    ];
  },
});
