import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { siteAsset } from "./site-path";

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
  external?: boolean;
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
            <Link className="back-link" href="/#works">
              <span aria-hidden="true">←</span> 返回全部板块
            </Link>
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
          {items.map((item, index) => {
            const isExternal =
              item.external ?? /^https?:\/\//.test(item.href);
            const entry = (
              <>
                <div
                  className={`collection-image ${item.imageClassName ?? ""}`}
                >
                  <div className="parallax-media">
                    <Image
                      src={siteAsset(item.image)}
                      alt={item.alt}
                      width={item.imageWidth ?? 735}
                      height={item.imageHeight ?? 480}
                      unoptimized
                      sizes={
                        items.length === 1
                          ? "(max-width: 767px) 100vw, 72vw"
                          : "(max-width: 767px) 100vw, 48vw"
                      }
                      priority={index === 0}
                    />
                  </div>
                </div>
                <div className="collection-copy">
                  <div>
                    <p className="project-kind">{item.kind}</p>
                    <h2>{item.title}</h2>
                  </div>
                  <p>{item.description}</p>
                  <span className="project-status">
                    进入专题{" "}
                    <span aria-hidden="true">{isExternal ? "↗" : "→"}</span>
                  </span>
                </div>
              </>
            );

            return (
              <article className="collection-item reveal" key={item.title}>
                {isExternal ? (
                  <a
                    className="collection-entry"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`打开${item.title}专题（新窗口）`}
                  >
                    {entry}
                  </a>
                ) : (
                  <Link
                    className="collection-entry"
                    href={item.href}
                    aria-label={`进入${item.title}专题`}
                  >
                    {entry}
                  </Link>
                )}
              </article>
            );
          })}
        </section>

        <section className="collection-future reveal">
          <p>接下来</p>
          <h2>{futureTitle}</h2>
          <div>
            <p>{futureCopy}</p>
            <Link className="text-link" href="/#writing">
              看笔记与评论计划 <span aria-hidden="true">↘</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
