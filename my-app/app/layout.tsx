import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Faizan Shurjeel - Portfolio",
  description:
    "Computer Engineering Student & Software Developer specializing in web development, mobile apps, and systems programming.",
  keywords:
    "software developer, computer engineering, portfolio, Faizan Shurjeel, programming, Rust, Flutter, web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}
