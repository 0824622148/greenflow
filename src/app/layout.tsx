import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenFlow — Premium Cannabis Delivery",
  description: "Premium cannabis delivery. Fast, discreet, and trustworthy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050A09] antialiased">{children}</body>
    </html>
  );
}
