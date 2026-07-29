import type { Metadata } from "next";
import { CollectionPage } from "../collection-page";

export const metadata: Metadata = {
  title: "知识板块",
  description: "从逻辑学到科学、技术与文明，持续扩展的学科知识索引。",
};

export default function KnowledgePage() {
  return (
    <CollectionPage
      name="知识"
      thesis="先看理由，再看证据。"
      introduction="逻辑学帮助我们判断一句话能推出什么；科学帮助我们理解知识怎样建立。之后的新学科，也会从这里进入。"
      items={[
        {
          title: "逻辑学",
          kind: "推理与论证",
          description:
            "拆开概念、命题与推理，判断一句话究竟能推出什么，不能推出什么。",
          image: "/logic.jpg",
          alt: "铅笔、镇纸与写有几何证明和逻辑符号的纸张",
          href: "/knowledge/logic",
          external: false,
        },
        {
          title: "科学、技术与文明",
          kind: "证据与知识",
          description:
            "从观察、实验与证据出发，理解知识怎样建立，也理解它的边界。",
          image: "/science.jpg",
          alt: "实验玻璃器皿、三棱镜与培养皿中的植物标本",
          href: "/knowledge/science",
          external: false,
        },
      ]}
      futureTitle="学科会增加，判断的方法会彼此照亮。"
      futureCopy="每个新学科都会拥有清楚的入口与自己的内容结构，同时保留与其他知识之间的联系。"
    />
  );
}
