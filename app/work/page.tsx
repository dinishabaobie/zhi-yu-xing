import type { Metadata } from "next";
import { CollectionPage } from "../collection-page";

export const metadata: Metadata = {
  title: "工作板块",
  description: "把工作中真正使用的知识做成可以操作、可以练习的工具。",
};

export default function WorkPage() {
  return (
    <CollectionPage
      name="工作"
      thesis="把手上的经验，做成能练习的工具。"
      introduction="这里放与工作、技能和实践有关的项目。重点不是展示术语，而是让操作、判断与反馈真正发生。"
      items={[
        {
          title: "电工",
          kind: "电工学习工具",
          description:
            "拖拽元件、自由接线并运行电路，在单灯单控、接触器点动与自锁练习中理解通断逻辑。",
          image: "/work.jpg",
          alt: "粉色长发的角色抱着一只 GeForce RTX 5090 包装盒",
          imageWidth: 2000,
          imageHeight: 3013,
          imageClassName: "collection-image-work",
          href: "https://dinishabaobie.github.io/electrician-simulator/",
        },
      ]}
      futureTitle="工作留下来的，不只是一份结果。"
      futureCopy="新的实践工具、方法整理与经验复盘会继续加入，让做过的事成为以后还能使用的知识。"
    />
  );
}
