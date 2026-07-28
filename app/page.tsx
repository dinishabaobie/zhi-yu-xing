import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "./site-chrome";

export const metadata: Metadata = {
  title: "个人知识与作品入口",
  description:
    "游戏、工作与知识三个板块，以及持续更新的笔记与热点点评。",
};

const portals = [
  {
    id: "games",
    title: "游戏",
    kind: "板块一",
    description:
      "《旅途愉快》是我的《鸣潮》专题。2024 年底开始玩，也从那时起记录角色、剧情与版本。",
    image: "/game.jpg",
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
    image: "/electrical.jpg",
    alt: "铜线、指针仪表与电气元件整齐放在灰色工作台上",
    width: 735,
    height: 480,
    className: "project project-work",
    href: "/work",
  },
  {
    id: "knowledge",
    title: "知识",
    kind: "板块三",
    description:
      "从逻辑学到科学、技术与文明，建立一张持续扩展的学科索引。",
    image: "/logic.jpg",
    alt: "铅笔、镇纸与写有几何证明和逻辑符号的纸张",
    width: 735,
    height: 480,
    secondaryImage: "/science.jpg",
    secondaryAlt: "实验玻璃器皿、三棱镜与培养皿中的植物标本",
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
STORY: 读者先被一段关于信息甄别的自嘲式个人宣言吸引，再进入游戏、工作、知识三个板块。
FIRST VIEWPORT: 左侧分六行展开个人宣言和两个入口，右侧是一张四联原创摄影；主要行动在宣言正下方。
FORM: 七个方向中的第六个，采用非对称档案接触印样展开；本地种子 ad22a2ae。
-->`,
        }}
      />

      <SiteHeader />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">个人知识与作品入口</p>
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
                浏览三个板块
              </a>
              <a className="text-link" href="#writing">
                看接下来的内容
                <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>

          <figure className="hero-visual">
            <Image
              src="/knowledge-contact-sheet.jpg"
              alt="游戏、工作、逻辑学与科学组成的四联摄影"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 767px) 100vw, 58vw"
              className="hero-image"
            />
            <figcaption>
              三个持续生长的板块，收纳已经开始的四个专题。
            </figcaption>
          </figure>
        </section>

        <section className="works-section" id="works" aria-labelledby="works-title">
          <div className="section-heading reveal">
            <h2 id="works-title">三个入口，各有自己的秩序</h2>
            <p>游戏保存世界与故事，工作沉淀实践，知识整理推理与证据。</p>
          </div>

          <div className="project-grid">
            {portals.map((portal) => (
              <article className={`${portal.className} reveal`} key={portal.id}>
                <a
                  className="project-entry"
                  href={portal.href}
                  aria-label={`进入${portal.title}板块`}
                >
                  {"secondaryImage" in portal ? (
                    <div className="project-image project-image-pair">
                      <div>
                        <Image
                          src={portal.image}
                          alt={portal.alt}
                          width={portal.width}
                          height={portal.height}
                          sizes="(max-width: 767px) 50vw, 36vw"
                        />
                      </div>
                      <div>
                        <Image
                          src={portal.secondaryImage}
                          alt={portal.secondaryAlt}
                          width={735}
                          height={480}
                          sizes="(max-width: 767px) 50vw, 36vw"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="project-image">
                      <Image
                        src={portal.image}
                        alt={portal.alt}
                        width={portal.width}
                        height={portal.height}
                        sizes={
                          portal.id === "games"
                            ? "(max-width: 767px) 100vw, 58vw"
                            : "(max-width: 767px) 100vw, 40vw"
                        }
                      />
                    </div>
                  )}
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
                </a>
              </article>
            ))}
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
              <h3>先核对事实，再给出判断</h3>
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
              下一步是加入第一批笔记和热点点评，并继续扩展三个板块。
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
