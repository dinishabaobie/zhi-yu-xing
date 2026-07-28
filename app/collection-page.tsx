import Image from "next/image";
import { SiteFooter, SiteHeader } from "./site-chrome";

export type CollectionItem = {
  title: string;
  kind: string;
  description: string;
  image: string;
  alt: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
  href: string;
};

type CollectionPageProps = {
  name: string;
  thesis: string;
  introduction: string;
  items: CollectionItem[];
  futureTitle: string;
  futureCopy: string;
};

export function CollectionPage({
  name,
  thesis,
  introduction,
  items,
  futureTitle,
  futureCopy,
}: CollectionPageProps) {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="collection-hero" id="top">
          <div className="collection-title">
            <a className="back-link" href="/#works">
              <span aria-hidden="true">←</span> 返回全部板块
            </a>
            <p className="hero-kicker">{name}板块</p>
            <h1>{thesis}</h1>
          </div>

          <div className="collection-intro">
            <p>{introduction}</p>
            <div className="collection-current">
              <span>当前收录</span>
              <ul>
                {items.map((item) => (
                  <li key={item.title}>{item.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className={`collection-items ${
            items.length === 1 ? "collection-items-single" : ""
          }`}
          aria-label={`${name}板块内容`}
        >
          {items.map((item, index) => (
            <article className="collection-item reveal" key={item.title}>
              <a
                className="collection-entry"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`打开${item.title}专题（新窗口）`}
              >
                <div
                  className={`collection-image ${item.imageClassName ?? ""}`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={item.imageWidth ?? 735}
                    height={item.imageHeight ?? 480}
                    sizes={
                      items.length === 1
                        ? "(max-width: 767px) 100vw, 72vw"
                        : "(max-width: 767px) 100vw, 48vw"
                    }
                    priority={index === 0}
                  />
                </div>
                <div className="collection-copy">
                  <div>
                    <p className="project-kind">{item.kind}</p>
                    <h2>{item.title}</h2>
                  </div>
                  <p>{item.description}</p>
                  <span className="project-status">
                    打开专题 <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </section>

        <section className="collection-future reveal">
          <p>接下来</p>
          <h2>{futureTitle}</h2>
          <div>
            <p>{futureCopy}</p>
            <a className="text-link" href="/#writing">
              看笔记与评论计划 <span aria-hidden="true">↘</span>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
