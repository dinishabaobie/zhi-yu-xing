import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import { LogicSite } from "./LogicSite";
import "./logic-field-guide.css";

export const metadata: Metadata = {
  title: "逻辑学",
  description:
    "从概念、证据与推理到谬误识别和论证重建，一套可直接练习的逻辑学路径。",
};

export default function LogicKnowledgePage() {
  return (
    <>
      <SiteHeader />

      <div className="knowledge-subject-bar" aria-label="逻辑学专题目录">
        <Link className="subject-back" href="/knowledge">
          <span aria-hidden="true">←</span> 返回知识
        </Link>
        <nav className="subject-section-nav" aria-label="逻辑学章节">
          <a href="#path">七关</a>
          <a href="#knowledge">知识地图</a>
          <a href="#fallacies">谬误断点</a>
          <a href="#practice">练习场</a>
          <a href="#sources">来源</a>
        </nav>
        <p className="subject-location">主站内专题 / 01</p>
      </div>

      <LogicSite />
      <SiteFooter />
    </>
  );
}
