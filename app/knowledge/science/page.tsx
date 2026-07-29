import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import { ReadingFramework } from "./ReadingFramework";
import { TimelineAtlas } from "./TimelineAtlas";
import "./science-atlas.css";

export const metadata: Metadata = {
  title: "科学、技术与文明",
  description:
    "以时间轴、知识轨、能力轨与治理轨，追踪科学、技术和文明如何彼此塑造。",
};

export default function ScienceKnowledgePage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <div
          className="knowledge-subject-bar"
          aria-label="科学、技术与文明专题目录"
        >
          <Link className="subject-back" href="/knowledge">
            <span aria-hidden="true">←</span> 返回知识
          </Link>
          <nav className="subject-section-nav" aria-label="科学专题章节">
            <a href="#timeline">时间轴</a>
            <a href="#reading-framework">理解框架</a>
            <a href="#technology-evaluation">技术十六问</a>
            <a href="#source-boundaries">材料边界</a>
          </nav>
          <p className="subject-location">主站内专题 / 02</p>
        </div>

        <div className="science-atlas">
          <TimelineAtlas />
          <ReadingFramework />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
