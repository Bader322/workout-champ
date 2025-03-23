import type { Metadata } from "next";
import "./globals.css";
import Providers  from "@/redux/provider"


export const metadata: Metadata = {
  title: "Workout Tracker",
  description: "Workout Tracker App with no ads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
