import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "社会热点",
  description:
    "把热点中的原始材料、媒体转述、推断与立场分开，记录暂定结论和改判条件。",
};

export default function HotspotsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="hotspots-index-hero" id="top">
          <div>
            <Link className="back-link" href="/#works">
              <span aria-hidden="true">←</span> 返回全部板块
            </Link>
            <p className="hero-kicker">社会热点</p>
            <h1>不是急着站队，先让证据归位。</h1>
          </div>
          <div className="hotspots-index-intro">
            <p>
              每个案例都保留原始材料、推理过程、群体传播机制与改判条件。结论可以暂定，也必须允许新证据改写。
            </p>
            <dl>
              <div>
                <dt>当前收录</dt>
                <dd>1 个案例</dd>
              </div>
              <div>
                <dt>分析方法</dt>
                <dd>逻辑学与群体心理</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="hotspot-index-list" aria-labelledby="cases-title">
          <h2 id="cases-title">正在分析</h2>
          <article className="hotspot-index-case reveal">
            <Link
              className="hotspot-index-entry"
              href="/hotspots/xuxubaobao"
            >
              <div className="hotspot-index-copy">
                <p>旭旭宝宝与《功夫女足》争议</p>
                <h3>一场观影偏好，怎样变成了身份审判？</h3>
                <p>
                  最初争论的是看不看电影，真正引爆的是“你在骂谁”，最后又变成“谁有资格代表真实网友”。
                </p>
                <span className="project-status">
                  阅读完整分析 <span aria-hidden="true">→</span>
                </span>
              </div>

              <div className="hotspot-case-sheet">
                <div>
                  <span>当前判断</span>
                  <strong>有条件接受</strong>
                </div>
                <dl>
                  <div>
                    <dt>个人观影偏好</dt>
                    <dd>接受</dd>
                  </div>
                  <div>
                    <dt>“不看”等于“不爱国”</dt>
                    <dd>拒绝</dd>
                  </div>
                  <div>
                    <dt>回应对象表达清楚</dt>
                    <dd>有条件接受</dd>
                  </div>
                  <div>
                    <dt>存在付费水军</dt>
                    <dd>暂缓判断</dd>
                  </div>
                </dl>
              </div>
            </Link>
          </article>
        </section>

        <section className="collection-future reveal">
          <p>以后</p>
          <h2>热点会过去，证据链应该留下来。</h2>
          <div>
            <p>
              新案例会进入同一索引。事实更新时，页面会保留修订记录，而不是悄悄替换旧判断。
            </p>
            <Link className="text-link" href="/hotspots/xuxubaobao">
              从第一期开始 <span aria-hidden="true">↘</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
