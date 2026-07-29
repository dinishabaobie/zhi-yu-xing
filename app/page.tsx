import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { siteAsset } from "./site-path";

export const metadata: Metadata = {
  title: "个人知识",
  description:
    "游戏、工作、知识与社会热点四个板块，以及持续更新的笔记与判断。",
};

const portals = [
  {
    id: "games",
    title: "游戏",
    kind: "板块一",
    description:
      "《旅途愉快》是我的《鸣潮》专题。2024 年底开始玩，也从那时起记录角色、剧情与版本。",
    image: siteAsset("/game.jpg"),
    alt: "粉色长发的游戏角色坐在飞散的乐谱与纸页之间",
    width: 2400,
    height: 1221,
    className: "project project-game",
    href: "/games",
  },
  {
    id: "work",
    title: "工作",
    kind: "板块二",
    description:
      "把电工知识和之后的实践经验，做成可以操作、练习与复用的工具。",
    image: siteAsset("/work.jpg"),
    alt: "粉色长发的角色抱着一只 GeForce RTX 5090 包装盒",
    width: 2000,
    height: 3013,
    className: "project project-work",
    href: "/work",
  },
  {
    id: "knowledge",
    title: "知识",
    kind: "板块三",
    description:
      "从逻辑学到科学、技术与文明，建立一张持续扩展的学科索引。",
    image: siteAsset("/knowledge.jpg"),
    alt: "人物站在星空与发光星座下，远处有环形轨道与悬浮建筑",
    width: 2400,
    height: 1244,
    className: "project project-knowledge",
    href: "/knowledge",
  },
];

export default function Home() {
  return (
    <>
      <template
        data-design-contract
        dangerouslySetInnerHTML={{
          __html: `<!--
THESIS: 把个人网站做成一张会扩展的知识索引桌，拒绝履历加等宽卡片的默认组合。
OWN-WORLD: 冷银灰底、墨色文字、朱红单一强调色；摄影接触印样、档案标签与大尺度中文排版。
STORY: 读者先被一段关于信息甄别的自嘲式个人宣言吸引，再进入游戏、工作、知识、社会热点四个板块。
FIRST VIEWPORT: 左侧分六行展开个人宣言和两个入口，右侧是一张横向深色插画；主要行动在宣言正下方。
FORM: 七个方向中的第六个，采用非对称档案接触印样展开；本地种子 ad22a2ae。
-->`,
        }}
      />

      <SiteHeader />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">个人知识</p>
            <h1 className="hero-quote" id="hero-title">
              <span>小时候家里穷用不起</span>
              <span>GPT也用不起Kimi</span>
              <span>gemini</span>
            </h1>
            <p className="hero-intro hero-quote-detail">
              <span>只能用豆包 听她的唐笑</span>
              <span>这养成了我甄别信息的能力</span>
              <span>我把它当做贫穷送我的礼物</span>
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#works">
                浏览四个板块
              </a>
              <a className="text-link" href="#writing">
                看接下来的内容
                <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>

          <figure className="hero-visual">
            <Image
              src={siteAsset("/hero.jpg")}
              alt="黑发角色伏在桌前执笔写信，蓝黑色画面中有明亮的手部与纸张"
              width={2400}
              height={1350}
              priority
              sizes="(max-width: 767px) 100vw, 58vw"
              className="hero-image"
            />
            <figcaption>写给漂泊者的一封信。</figcaption>
          </figure>
        </section>

        <section className="works-section" id="works" aria-labelledby="works-title">
          <div className="section-heading reveal">
            <h2 id="works-title">四个入口，各有自己的秩序</h2>
            <p>游戏保存世界，工作沉淀实践，知识整理方法，热点检验判断。</p>
          </div>

          <div className="project-grid">
            {portals.map((portal) => (
              <article className={`${portal.className} reveal`} key={portal.id}>
                <Link
                  className="project-entry"
                  href={portal.href}
                  aria-label={`进入${portal.title}板块`}
                >
                  <div className="project-image">
                    <Image
                      src={portal.image}
                      alt={portal.alt}
                      width={portal.width}
                      height={portal.height}
                      sizes={
                        portal.id === "games"
                          ? "(max-width: 767px) 100vw, 58vw"
                          : portal.id === "knowledge"
                            ? "(max-width: 767px) 100vw, 82vw"
                            : "(max-width: 767px) 100vw, 40vw"
                      }
                    />
                  </div>
                  <div className="project-copy">
                    <div>
                      <p className="project-kind">{portal.kind}</p>
                      <h3>{portal.title}</h3>
                    </div>
                    <p>{portal.description}</p>
                    <span className="project-status">
                      进入板块 <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}

            <article className="project project-hotspots reveal">
              <Link
                className="project-entry"
                href="/hotspots"
                aria-label="进入社会热点板块"
              >
                <div
                  className="hotspot-portal-preview"
                  aria-label="旭旭宝宝热点分析预览"
                >
                  <div className="hotspot-preview-head">
                    <span>当前案例</span>
                    <span>更新于 2026.07.29</span>
                  </div>
                  <p className="hotspot-preview-question">
                    一场观影偏好，
                    <br />
                    怎样变成身份审判？
                  </p>
                  <div className="hotspot-preview-ledger">
                    <span>个人观影偏好</span>
                    <strong>接受</strong>
                    <span>“不看”等于“不爱国”</span>
                    <strong>拒绝</strong>
                    <span>存在付费水军</span>
                    <strong>待证</strong>
                  </div>
                </div>
                <div className="project-copy">
                  <div>
                    <p className="project-kind">板块四</p>
                    <h3>社会热点</h3>
                  </div>
                  <p>
                    把原始材料、媒体转述和推断分开，记录暂定结论，也留下改判条件。
                  </p>
                  <span className="project-status">
                    进入板块 <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </article>
          </div>
        </section>

        <section
          className="writing-section reveal"
          id="writing"
          aria-labelledby="writing-title"
        >
          <div className="writing-lead">
            <p>接下来</p>
            <h2 id="writing-title">把学习过程与当下判断也留下来。</h2>
          </div>

          <div className="writing-index">
            <article>
              <span>笔记</span>
              <h3>学到哪里，整理到哪里</h3>
              <p>保存正在学习的概念、问题、方法与参考资料。</p>
            </article>
            <article>
              <span>热点点评</span>
              <h3>
                <Link href="/hotspots">先核对事实，再给出判断</Link>
              </h3>
              <p>拆分事实、解释与立场，让观点可以被检查和修正。</p>
            </article>
            <article className="future-subjects">
              <span>更多内容</span>
              <p>新的游戏、工作项目和学科会进入对应板块，不打乱首页秩序。</p>
            </article>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-statement reveal">
            <p className="about-label">关于这个站</p>
            <h2 id="about-title">它不会被做完，只会越来越完整。</h2>
          </div>
          <div className="about-copy reveal">
            <p>
              这是一个长期维护的个人入口。作品先被看见，笔记留下学习的过程，评论负责把当下的问题说清楚。
            </p>
            <p>
              社会热点从第一期案例开始，新的游戏、工作项目、学科与笔记也会继续加入。
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
