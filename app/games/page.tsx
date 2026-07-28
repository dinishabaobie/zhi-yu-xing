import type { Metadata } from "next";
import { CollectionPage } from "../collection-page";

export const metadata: Metadata = {
  title: "游戏板块",
  description: "从 2024 年底开始玩的《鸣潮》，以及由这段旅程长出来的个人专题。",
};

export default function GamesPage() {
  return (
    <CollectionPage
      name="游戏"
      thesis="在虚构世界里，认真地走一遍。"
      introduction="我从 2024 年底开始玩《鸣潮》。《旅途愉快》就是从这段旅程长出来的专题，记录角色、剧情、版本与一路留下的观察。"
      items={[
        {
          title: "旅途愉快",
          kind: "鸣潮专题",
          description:
            "2024 年底开始玩《鸣潮》后，我借黑海岸与泰缇斯终端的视角，整理角色档案、剧情解析、版本记录与索拉里斯纪年。",
          image: "/game.jpg",
          alt: "粉色长发的游戏角色坐在飞散的乐谱与纸页之间",
          imageWidth: 2400,
          imageHeight: 1221,
          href: "https://dinishabaobie.github.io/wuwa-bon-voyage/",
        },
      ]}
      futureTitle="新的世界，会从这里继续展开。"
      futureCopy="之后完成的游戏专题会进入同一索引，保留各自的气质，也让浏览路径保持清楚。"
    />
  );
}
