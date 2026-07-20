import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Image Studio",
  description:
    "Generate stunning AI images with intelligent prompt expansion, multi-candidate generation, and automated quality judging.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[#05050a]" />
          <div
            className="absolute inset-0 opacity-100"
            style={{
              background:
                "radial-gradient(ellipse 120% 60% at 50% -10%, rgba(99, 102, 241, 0.08) 0%, transparent 55%), " +
                "radial-gradient(ellipse 80% 50% at 75% 20%, rgba(139, 92, 246, 0.04) 0%, transparent 50%), " +
                "radial-gradient(ellipse 60% 40% at 20% 70%, rgba(34, 211, 238, 0.03) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.04) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
