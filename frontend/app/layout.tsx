import { Inter } from "next/font/google";
import "./globals.css";
import PrelineScript from "../components/PrelineScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linux Ricing Showcase",
  description: "Discover and share beautiful Linux desktop customizations",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <PrelineScript />
      </body>
    </html>
  );
}
