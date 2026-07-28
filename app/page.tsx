import type { Metadata } from "next";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export const metadata: Metadata = {
  title: "个人知识与作品入口",
  description:
    "旅行、电工、逻辑学与科学专题，以及持续更新的笔记与热点点评。",
};

const projects = [
  {
    id: "travel",
    title: "旅途愉快",
    kind: "鸣潮专题",
    description:
      "借黑海岸与泰缇斯终端的视角，整理角色档案、剧情解析、版本记录与索拉里斯纪年。",
    image: "/travel.jpg",
    alt: "列车窗外的山与公路，窗边摊开一张地图",
    className: "project project-travel",
    href: "https://dinishabaobie.github.io/wuwa-bon-voyage/",
  },
  {
    id: "electrical",
    title: "电工",
    kind: "学习工具",
    description:
      "拖拽元件、自由接线并运行电路，在单灯单控、接触器点动与自锁练习中理解通断逻辑。",
    image: "/electrical.jpg",
    alt: "铜线、指针仪表与电气元件整齐放在灰色工作台上",
    className: "project project-electrical",
    href: "https://dinishabaobie.github.io/electrician-simulator/",
  },
  {
    id: "logic",
    title: "逻辑学",
    kind: "学科专题",
    description:
      "拆开概念、命题与推理，判断一句话究竟能推出什么，不能推出什么。",
    image: "/logic.jpg",
    alt: "铅笔、镇纸与写有几何证明和逻辑符号的纸张",
    className: "project project-logic",
    href: "https://logic-field-guide.you-know.chatgpt.site",
  },
  {
    id: "science",
    title: "科学、技术与文明",
    kind: "学科专题",
    description:
      "从观察、实验与证据出发，理解知识怎样建立，也理解它的边界。",
    image: "/science.jpg",
    alt: "实验玻璃器皿、三棱镜与培养皿中的植物标本",
    className: "project project-science",
    href: "https://science-civilization-atlas.you-know.chatgpt.site",
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
STORY: 读者先理解这里收集什么，再浏览四个专题，最后看到笔记、评论与更多学科的生长方式。
FIRST VIEWPORT: 左侧两行宣言和两个入口，右侧一张四联原创摄影；主要行动在标题正下方。
FORM: 七个方向中的第六个，采用非对称档案接触印样展开；本地种子 ad22a2ae。
-->`,
        }}
      />

      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="知与行，返回页首">
          <span className="wordmark-mark" aria-hidden="true" />
          知与行
        </a>

        <nav className="desktop-nav" aria-label="主要导航">
          <a href="#works">专题</a>
          <a href="#writing">笔记与评论</a>
          <a href="#about">关于</a>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <details className="mobile-nav">
            <summary>菜单</summary>
            <nav aria-label="移动端导航">
              <a href="#works">专题</a>
              <a href="#writing">笔记与评论</a>
              <a href="#about">关于</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">个人知识与作品入口</p>
            <h1 id="hero-title">
              走过的路，
              <span>想过的问题。</span>
            </h1>
            <p className="hero-intro">
              把旅行、技术、逻辑、科学，以及持续更新的笔记与评论放在一起。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#works">
                浏览专题
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
              alt="旅行、电工、逻辑学与科学组成的四联摄影"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 767px) 100vw, 58vw"
              className="hero-image"
            />
            <figcaption>
              四个已经开始的专题，更多学科会继续加入。
            </figcaption>
          </figure>
        </section>

        <section className="works-section" id="works" aria-labelledby="works-title">
          <div className="section-heading reveal">
            <h2 id="works-title">四个已经开始的世界</h2>
            <p>
              它们来自不同兴趣，但遵循同一件事：把复杂内容讲清楚，也把体验做好。
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`${project.className} reveal`} key={project.id}>
                {project.href ? (
                  <a
                    className="project-entry"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`打开${project.title}专题（新窗口）`}
                  >
                    <div className="project-image">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        width={735}
                        height={480}
                        sizes={
                          project.id === "travel" || project.id === "science"
                            ? "(max-width: 767px) 100vw, 58vw"
                            : "(max-width: 767px) 100vw, 40vw"
                        }
                      />
                    </div>
                    <div className="project-copy">
                      <div>
                        <p className="project-kind">{project.kind}</p>
                        <h3>{project.title}</h3>
                      </div>
                      <p>{project.description}</p>
                      <span className="project-status">
                        打开专题 <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="project-entry">
                    <div className="project-image">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        width={735}
                        height={480}
                        sizes={
                          project.id === "travel" || project.id === "science"
                            ? "(max-width: 767px) 100vw, 58vw"
                            : "(max-width: 767px) 100vw, 40vw"
                        }
                      />
                    </div>
                    <div className="project-copy">
                      <div>
                        <p className="project-kind">{project.kind}</p>
                        <h3>{project.title}</h3>
                      </div>
                      <p>{project.description}</p>
                      <span className="project-status">网址待接入</span>
                    </div>
                  </div>
                )}
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
              <span>更多学科</span>
              <p>新的专题会沿用这套索引继续加入，不需要重做整个网站。</p>
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
              下一步是加入第一批笔记和热点点评，并继续扩展更多学科。
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#top">
          <span className="wordmark-mark" aria-hidden="true" />
          知与行
        </a>
        <p>旅行、技术、学科与持续写作。</p>
        <a className="footer-top" href="#top">
          回到页首 <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
