import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Just compliment it.",
  description: "Give your friend a nice compliment",
  keywords: "compliment, positive feedback, kindness, AI compliments, uplifting messages",
  author: "Urva Suthar",
  openGraph: {
    title: "Just compliment it.",
    description: "Give your friend a nice compliment with our AI-powered generator.",
    url: "https://ai-compliment-generator-fawn.vercel.app",
    type: "website",
    site_name: "AI Compliment Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just compliment it.",
    description: "Give your friend a nice compliment with our AI-powered generator.",
    image: "https://yourwebsite.com/image.jpg", // Replace with your actual image URL
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Compliment Generator",
    url: "https://ai-compliment-generator-fawn.vercel.app",
    description: "An AI-powered tool to generate compliments for your friends.",
    author: {
      "@type": "Person",
      name: "Urva Suthar",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ai-compliment-generator-fawn.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
