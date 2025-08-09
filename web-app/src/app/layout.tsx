import type { Metadata } from "next";
import { Inconsolata, Noto_Sans} from "next/font/google";

import "./globals.css";

export const noto = Noto_Sans({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500","600", "700"] });
export const sans = Inconsolata({ subsets: ["latin"], weight: ["200", "300", "400", "500","600", "700"] });

export const metadata: Metadata = {
  title: "Bento",
  description: "Product Wishlisting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-primary"
      >
        {children}
      </body>
    </html>
  );
}
