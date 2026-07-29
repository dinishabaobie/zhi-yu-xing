import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../site-chrome";

export const metadata: Metadata = {
  title: "旭旭宝宝与《功夫女足》争议",
  description:
    "用逻辑学与群体心理拆解旭旭宝宝《功夫女足》争议，区分原始表达、传播推断与尚待验证的水军主张。",
};

const evidence = [
  {
    id: "E1",
    date: "07.16",
    type: "笔记转录",
    title: "表达个人观影偏好",
    body: "他说自己喜欢周星驰作为演员，但对周星驰只担任导演或编剧的作品兴趣较低，并多次强调这是个人感受。",
    excerpt:
      "“我只对周星驰本人出演的电影感兴趣。……他当导演、编剧啥的，我就没有对他本人出演的电影那么感兴趣。”",
    state: "用户笔记转录，待核原视频",
  },
  {
    id: "E2",
    date: "07.18",
    type: "笔记转录",
    title: "争议对象发生变化",
    body: "他先以道歉开场，随后使用“你们这帮人”和“一地鸡毛”等攻击性表达。争论从看不看电影转向他究竟在骂谁。",
    excerpt:
      "“我错就错在对你们这帮人还是他妈太客气了。……先把你自己一地鸡毛的生活过好了再说吧。”",
    state: "用户笔记转录，待核原视频",
  },
  {
    id: "E3",
    date: "07.19",
    type: "笔记转录",
    title: "限定回应对象",
    body: "他表示批评对象是黑粉、恶意剪辑者和进行道德捆绑的人，不包括普通观众与普通粉丝。",
    excerpt:
      "“我骂的是那些黑粉，还有道德绑架以及网暴我的那些人。我从来没有骂过我们正常的这些观众。”",
    state: "当事方自述，待核原视频",
  },
  {
    id: "E4",
    date: "07.20",
    type: "笔记转录",
    title: "重申没有抵制电影",
    body: "他称部分剪辑把个人偏好改写成“抵制电影”和“不看就是不爱国”，并再次拒绝向恶意攻击者道歉。",
    excerpt:
      "“有很多的黑切片就开始说，我抵制电影。甚至说我不看就不爱国了。”",
    state: "当事方自述，待核原视频",
  },
  {
    id: "E5",
    date: "07.22",
    type: "媒体转述",
    title: "提出水军主张",
    body: "相关公司表示已收集部分证据、向警方报案，并悬赏征集水军线索。声明证明主张已经提出，不等于事实已经确认。",
    state: "公司声明经媒体转述，独立结论待核验",
  },
];

const claims = [
  {
    status: "接受",
    tone: "accept",
    title: "个人可以按兴趣决定看不看一部电影",
    body: "原始表述是行动偏好，不是电影质量判断，也没有要求其他人跟随。",
    evidence: "依据 E1",
  },
  {
    status: "拒绝",
    tone: "reject",
    title: "“不看”等于抵制、不支持或不爱国",
    body: "从个人选择到道德结论之间缺少必要前提，属于把原命题升级后再进行批评。",
    evidence: "依据 E1、E4",
  },
  {
    status: "有条件接受",
    tone: "conditional",
    title: "“一地鸡毛”只针对恶意攻击者",
    body: "后续说明可以解释说话意图，但原视频中的“你们”没有清楚限定范围，普通观众感到被波及并非只能由恶意剪辑解释。",
    evidence: "对照 E2、E3",
  },
  {
    status: "暂缓判断",
    tone: "pending",
    title: "大量评论来自付费水军",
    body: "复制文本和集中出现只能提高协同传播的可能性。要确认付费组织，还需要任务指令、资金、账号网络或平台与警方结论。",
    evidence: "当事方主张见 E3、E5",
  },
  {
    status: "拒绝",
    tone: "reject",
    title: "所有批评者都是黑粉或被带节奏的人",
    body: "有人可能只是反对侮辱性表达。反对回应方式，不等于赞同恶意剪辑。",
    evidence: "对照 E2、E3",
  },
];

const logicGroups = [
  {
    title: "语言层",
    gates: "定词、正句",
    body: "先区分“支持”“抵制”“粉丝”“黑粉”和“水军”。真正的原命题只是：我更喜欢周星驰本人出演的电影，因此目前不打算看这一部。",
  },
  {
    title: "证据层",
    gates: "验据",
    body: "“被断章取义”要对照原视频与传播最广的切片；“付费水军”要核对账号关系、任务指令和资金，而不是只看相似评论。",
  },
  {
    title: "推理层",
    gates: "搭桥、查一致",
    body: "“不看”不能直接推出“不爱国”。同时，说话者心里想骂谁，与公开表达实际上覆盖了谁，需要分别判断。",
  },
  {
    title: "修正层",
    gates: "校准概率、重建论证",
    body: "目前只能说存在组织化传播的可能。更好的回应应逐条展示剪辑缺失的上下文，并把疑似账号交给平台核查。",
  },
];

const crowdChain = [
  "个人观影偏好",
  "被压缩成“不支持周星驰”",
  "上升为立场和道德判断",
  "当事方称相同说法被反复复制",
  "“一地鸡毛”成为新情绪符号",
  "双方开始用身份代替论证",
];

export default function XuxubaobaoCasePage() {
  return (
    <>
      <template
        data-design-contract
        dangerouslySetInnerHTML={{
          __html: `<!--
THESIS: 把热点页做成可复核的证据工作台，拒绝新闻复述加个人态度的两块长文。
OWN-WORLD: 延续冷银灰、墨色与朱红；左侧是粘性证据时间线，右侧是开放排版的判断、逻辑与群体机制。
STORY: 读者先看暂定结论，再逐项核对材料、推理断点和未知证据，最后看到如何改判。
FIRST VIEWPORT: 左侧为标题与核心问题，右侧为当前判断和证据状态；主要行动是向下进入双栏工作台。
FORM: 在既有知识索引桌中扩展一张案件卷宗，桌面采用 42 比 58 的非对称双栏。
-->`,
        }}
      />

      <SiteHeader />

      <main id="main">
        <article className="case-page" id="top">
          <header className="case-header">
            <div className="case-title">
              <Link className="back-link" href="/hotspots">
                <span aria-hidden="true">←</span> 返回社会热点
              </Link>
              <p className="hero-kicker">旭旭宝宝与《功夫女足》争议</p>
              <h1>一场观影偏好，怎样变成了身份审判？</h1>
            </div>

            <div className="case-verdict">
              <p>当前判断</p>
              <strong>有条件接受</strong>
              <p>
                原始发言属于个人选择；道德化推断不成立；回应对象存在表达歧义；付费水军目前待证。
              </p>
              <dl>
                <div>
                  <dt>更新</dt>
                  <dd>2026.07.29</dd>
                </div>
                <div>
                  <dt>证据状态</dt>
                  <dd>待补原视频链接</dd>
                </div>
              </dl>
            </div>
          </header>

          <p className="case-thesis">
            最初争论的是看不看电影，真正引爆的是“你在骂谁”，最后又变成“谁有资格代表真实网友”。
          </p>

          <div className="case-workbench">
            <aside className="case-evidence" aria-labelledby="evidence-title">
              <div className="case-evidence-sticky">
                <div className="case-column-heading">
                  <p>原事件</p>
                  <h2 id="evidence-title">证据时间线</h2>
                  <span>转录稿、当事方说法和独立结论分开标记。</span>
                </div>

                <ol className="evidence-timeline">
                  {evidence.map((item) => (
                    <li key={`${item.date}-${item.title}`}>
                      <div className="evidence-marker">
                        <time dateTime={`2026-${item.date.replace(".", "-")}`}>
                          {item.date}
                        </time>
                        <span>{item.id}</span>
                      </div>
                      <div>
                        <p>{item.type}</p>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                        {item.excerpt ? <blockquote>{item.excerpt}</blockquote> : null}
                        <span className="evidence-state">{item.state}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="case-analysis">
              <section aria-labelledby="ledger-title">
                <div className="case-column-heading">
                  <p>分析</p>
                  <h2 id="ledger-title">判断账本</h2>
                  <span>每个命题单独判断，不让一个立场替其他命题担保。</span>
                </div>

                <div className="claim-ledger">
                  {claims.map((claim) => (
                    <article
                      className={`claim-item claim-${claim.tone}`}
                      key={claim.title}
                    >
                      <span>{claim.status}</span>
                      <div>
                        <h3>{claim.title}</h3>
                        <p>{claim.body}</p>
                        <span className="claim-evidence">{claim.evidence}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="logic-section" aria-labelledby="logic-title">
                <div className="analysis-section-title">
                  <h2 id="logic-title">用逻辑学的七关检查</h2>
                  <p>
                    先把事实、解释、前提和结论放回各自的位置，再判断一句话究竟能推出多少。
                  </p>
                </div>

                <div className="inference-break" aria-label="第一处推理断点">
                  <span>不想看一部电影</span>
                  <strong>缺少必要前提</strong>
                  <span>抵制周星驰或不爱国</span>
                </div>

                <div className="logic-groups">
                  {logicGroups.map((group) => (
                    <article key={group.title}>
                      <div>
                        <h3>{group.title}</h3>
                        <span>{group.gates}</span>
                      </div>
                      <p>{group.body}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="crowd-section" aria-labelledby="crowd-title">
                <div className="analysis-section-title">
                  <h2 id="crowd-title">群体心理的适用门槛</h2>
                  <p>
                    当前结论是“有条件通过”。当事方描述了共同刺激、重复语言和阵营化，但没有评论样本或独立数据证明所有批评者形成了同一种心理群体。
                  </p>
                </div>

                <ol className="crowd-chain">
                  {crowdChain.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>

                <div className="crowd-reading">
                  <div>
                    <h3>双向简化</h3>
                    <p>
                      一部分批评者把“不看电影”升级成道德问题；一部分支持者又把不同意见统一归入黑粉、水军和恶意带节奏。
                    </p>
                  </div>
                  <div>
                    <h3>理论边界</h3>
                    <p>
                      《乌合之众》提供的是机制假说，不是现代实证定律。它不能证明谁是水军，也不能给某个群体贴病理标签。
                    </p>
                  </div>
                  <div className="instinct-default">
                    <h3>直觉默认错误</h3>
                    <p>
                      最容易犯的错，是只看最刺眼的切片就先选阵营。高情绪片段更容易被记住，重复出现也容易被误当作多份独立证据，但它既不能还原完整发言，也不能证明付费组织。
                    </p>
                  </div>
                </div>
              </section>

              <section className="case-next" aria-labelledby="next-title">
                <div>
                  <h2 id="next-title">24 小时内可以做什么</h2>
                  <p>
                    补齐四段原视频链接、传播最广的十个切片，并收集“不爱国”和“水军”主张的原始样本。每条材料记录来源、上下文和传播链。
                  </p>
                </div>
                <div>
                  <h2>什么证据会让我改判</h2>
                  <ul>
                    <li>完整视频与现有转录不一致。</li>
                    <li>高传播切片没有删减关键上下文。</li>
                    <li>平台或警方确认付费组织关系。</li>
                    <li>没有找到“不看就是不爱国”的原始样本。</li>
                  </ul>
                </div>
              </section>

              <section className="case-sources" aria-labelledby="sources-title">
                <h2 id="sources-title">材料与局限</h2>
                <p>
                  当前分析以用户整理的四段发言转录为主。多数公开报道是在转述当事方说法，不是独立调查；平台账号图谱、资金记录和警方结论仍然缺失。
                </p>
                <ul>
                  <li>
                    <a
                      href="https://finance.sina.com.cn/tech/roll/2026-07-19/doc-iniihzch1210750.shtml"
                      target="_blank"
                      rel="noreferrer"
                    >
                      新浪科技：原始偏好与 7 月 18 日回应
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only">（在新窗口打开）</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.gamersky.com/news/202607/2174611.shtml"
                      target="_blank"
                      rel="noreferrer"
                    >
                      游民星空：7 月 20 日回应
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only">（在新窗口打开）</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.sina.cn/news/detail/5323825735795761.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      白鹿视频相关报道：公司声明与悬赏
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only">（在新窗口打开）</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://news.china.com/socialgd/10000169/20260720/49620714.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      中华网：对回应方式的相反视角
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only">（在新窗口打开）</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dinishabaobie.github.io/logic-field-guide/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      逻辑学：本页使用的七关方法
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only">（在新窗口打开）</span>
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
