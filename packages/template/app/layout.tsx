import "~styles/globals.css";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://if-geon.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      {
        url: "/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  verification: {
    google: "IvtO23xqXBRCTsg8vvSstjRpZT-bQJ-6Z5620rO6gHU",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
};

export default RootLayout;
