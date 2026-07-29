import type { Metadata } from "next";
import "./globals.css";
import { siteAsset } from "./site-path";

export const metadata: Metadata = {
  title: {
    default: "知与行",
    template: "%s｜知与行",
  },
  description:
    "游戏、工作、知识与社会热点四个板块，以及持续更新的笔记与判断。",
  icons: {
    icon: siteAsset("/favicon.svg"),
    shortcut: siteAsset("/favicon.svg"),
  },
  openGraph: {
    title: "知与行｜个人知识",
    description:
      "游戏、工作、知识与社会热点四个板块，以及持续更新的笔记与判断。",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: "https://dinishabaobie.github.io/zhi-yu-xing/og.png",
        width: 1200,
        height: 630,
        alt: "知与行，让证据归位",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "知与行｜个人知识",
    description:
      "游戏、工作、知识与社会热点四个板块，以及持续更新的笔记与判断。",
    images: ["https://dinishabaobie.github.io/zhi-yu-xing/og.png"],
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
