import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "知与行",
    template: "%s｜知与行",
  },
  description:
    "旅行、电工、逻辑学与科学专题，以及持续更新的笔记与热点点评。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "知与行｜个人知识与作品入口",
    description:
      "旅行、电工、逻辑学与科学专题，以及持续更新的笔记与热点点评。",
    type: "website",
    locale: "zh_CN",
  },
};

const themeScript = `
  try {
    const saved = localStorage.getItem("zhiyuxing-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = saved || preferred;
  } catch {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
