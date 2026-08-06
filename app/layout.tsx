import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

// Newsreader carries every display heading and every numeral; Hanken Grotesk
// carries the UI. The prototype uses nothing else.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const description =
  "Score your CV against the posting, defend it in a mock interview, then rewrite the lines you couldn't defend.";

export const metadata: Metadata = {
  title: "Forte · the loop ends in a rewrite",
  description,
  openGraph: {
    title: "Forte · the loop ends in a rewrite",
    description,
    siteName: "Forte",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Forte", description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable} h-full`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
