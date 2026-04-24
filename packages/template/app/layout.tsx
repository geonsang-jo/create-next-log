import "~styles/globals.css";
import { Metadata } from "next";
import localFont from "next/font/local";
import Header from "~components/header";
import ThemeProvider from "~styles/themeProvider";
import { getConfig } from "~lib/config";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const config = getConfig();

export const metadata: Metadata = {
  metadataBase: new URL(config.url || "http://localhost:3000"),
  title: {
    default: config.title,
    template: `%s | ${config.title}`,
  },
  description: config.description,
  icons: {
    icon: [
      { url: "/favicon-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: config.title,
    title: config.title,
    description: config.description,
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
  },
  ...(config.googleVerification && {
    verification: { google: config.googleVerification },
  }),
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={pretendard.variable}
      style={{ "--primary": config.theme.primaryColor } as React.CSSProperties}
    >
      <body className={pretendard.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`,
          }}
        />
        <ThemeProvider>
          <Header />
          <div className="flex w-full justify-center">
            <main className="container relative lg:px-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
