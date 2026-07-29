import {
  bookContributions,
  corePropositions,
  progressTrapChecks,
  scientificLiteracy,
  sourceBoundaries,
} from "./insight-data";
import {
  adoptionGates,
  civilizationChain,
  civilizationLines,
  civilizationPrinciples,
  conceptDefinitions,
  criticalGuardrails,
  crossDomainCapabilities,
  frameworkFuels,
  historicalCouplings,
  historicalLaws,
  maturityStages,
  technologyEvaluationGroups,
} from "./manuscript-data";

const frameworkSections = [
  { href: "#concepts", label: "三个概念" },
  { href: "#unified-framework", label: "统一框架" },
  { href: "#mechanism-lines", label: "四条主线" },
  { href: "#historical-couplings", label: "八次耦合" },
  { href: "#historical-laws", label: "七条规律" },
  { href: "#cross-domain", label: "跨域者" },
  { href: "#technology-evaluation", label: "技术十六问" },
  { href: "#critical-guardrails", label: "六项批判" },
  { href: "#civilization-view", label: "文明观" },
  { href: "#books-and-boundaries", label: "四书与边界" },
] as const;

function visibleText(value: string) {
  return value.replace(/[\u2013\u2014]/g, "-");
}

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}

function SectionHeader({
  index,
  kicker,
  title,
  description,
  titleId,
}: {
  index: number;
  kicker: string;
  title: string;
  description: string;
  titleId: string;
}) {
  return (
    <header className="framework-section__header">
      <p className="section-index" aria-hidden="true">
        {twoDigits(index)}
      </p>
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2 id={titleId}>{title}</h2>
      </div>
      <p>{description}</p>
    </header>
  );
}
export function ReadingFramework() {
  return (
    <article
      id="reading-framework"
      className="reading-framework"
      aria-labelledby="reading-framework-title"
    >
      <header className="framework-lede">
        <div className="framework-lede__heading">
          <p className="section-kicker">时间轴之外 / 新母稿结构</p>
          <h2 id="reading-framework-title">理解知识怎样变成塑造世界的力量</h2>
        </div>
        <div className="framework-lede__summary">
          <p>
            时间轴回答“何时发生”，这份结构回答“为何成立、怎样落地、由谁控制”。
            新笔记的全部骨架被重新组织为十个可回看的阅读章节。
          </p>
          <p>
            阅读顺序并非唯一：可以先看八次耦合获得历史全貌，也可以直接用七道闸门和十六问分析一项当代技术。
          </p>
        </div>
      </header>

      <nav className="framework-index" aria-label="思想框架目录">
        <ol>
          {frameworkSections.map((section, index) => (
            <li key={section.href}>
              <a href={section.href}>
                <span className="framework-index__number" aria-hidden="true">
                  {twoDigits(index + 1)}
                </span>
                <span>{section.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section
        id="concepts"
        className="framework-section framework-section--concepts"
        aria-labelledby="concepts-title"
      >
        <SectionHeader
          index={1}
          kicker="判断起点"
          title="先把科学、技术与文明分开"
          description="三者持续互相塑造，但不能混成一句“科技改变社会”。先确认讨论的是知识、能力，还是承接能力的整体系统。"
          titleId="concepts-title"
        />

        <ol className="proposition-sequence" aria-label="四个核心命题">
          {corePropositions.map((proposition, index) => (
            <li key={proposition.id} className="proposition">
              <article aria-labelledby={`${proposition.id}-title`}>
                <p className="proposition__number" aria-hidden="true">
                  P{twoDigits(index + 1)}
                </p>
                <div className="proposition__body">
                  <h3 id={`${proposition.id}-title`}>
                    {visibleText(proposition.title)}
                  </h3>
                  <p>{visibleText(proposition.summary)}</p>
                </div>
                <p className="proposition__question">
                  <span className="proposition__question-label">追问</span>
                  <span>{visibleText(proposition.question)}</span>
                </p>
              </article>
            </li>
          ))}
        </ol>

        <div className="concept-ledger">
          {conceptDefinitions.map((concept, index) => (
            <article key={concept.id} aria-labelledby={`${concept.id}-title`}>
              <header>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <p>{concept.role}</p>
                  <h3 id={`${concept.id}-title`}>{concept.name}</h3>
                </div>
              </header>
              <p className="concept-ledger__definition">{concept.definition}</p>
              <ul>
                {concept.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="concept-ledger__question">
                <span>判断问题</span>
                {concept.question}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="unified-framework"
        className="framework-section framework-section--unified"
        aria-labelledby="unified-framework-title"
      >
        <SectionHeader
          index={2}
          kicker="统一分析框架"
          title="两种燃料，七道闸门，五个阶段"
          description="技术史的加速不等于每个想法都会落地。能量与信息提供能力，闸门决定方向，成熟度阻止我们把可能误写成现实。"
          titleId="unified-framework-title"
        />

        <div className="fuel-pair" aria-label="技术演化的两种燃料">
          {frameworkFuels.map((fuel, index) => (
            <article key={fuel.id}>
              <span aria-hidden="true">F0{index + 1}</span>
              <p>{fuel.asks}</p>
              <h3>{fuel.name}</h3>
              <p>{fuel.description}</p>
            </article>
          ))}
          <p className="fuel-pair__bridge">
            二者经常互为条件：现代医学、航海、航天和计算机都同时依赖能量与信息；
            信息处理能力的提升，本身也表现为单位能耗可以完成更多计算。
          </p>
        </div>

        <div className="framework-subhead">
          <p>落地路径 / 01</p>
          <h3>一项技术进入历史前要跨过七道闸门</h3>
          <p>前三道大致决定“能不能做”，后四道决定“能否进入社会并被治理”。</p>
        </div>

        <ol className="gate-sequence">
          {adoptionGates.map((gate, index) => (
            <li key={gate.id}>
              <span aria-hidden="true">G{twoDigits(index + 1)}</span>
              <div>
                <h3>{gate.name}</h3>
                <p>{gate.question}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="framework-subhead">
          <p>现实校准 / 02</p>
          <h3>未来技术的五个成熟阶段</h3>
          <p>
            媒体最常见的错误，是把第一、二阶段写成第五阶段即将到来。
          </p>
        </div>

        <ol className="maturity-scale" aria-label="未来技术五个成熟阶段">
          {maturityStages.map((item) => (
            <li key={item.id} className="maturity-level">
              <article aria-labelledby={`${item.id}-title`}>
                <p
                  className="maturity-level__number"
                  aria-label={`第 ${item.level} 阶段`}
                >
                  {twoDigits(item.level)}
                </p>
                <div>
                  <h3 id={`${item.id}-title`}>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="mechanism-lines"
        className="framework-section framework-section--mechanisms"
        aria-labelledby="mechanism-lines-title"
      >
        <SectionHeader
          index={3}
          kicker="文明演化坐标"
          title="四条主线同时展开"
          description="能量与信息解释能力如何扩大，组织解释能力怎样持续，合法性与边界则追问力量是否仍受共同体控制。"
          titleId="mechanism-lines-title"
        />

        <div className="mechanism-ledger">
          {civilizationLines.map((line, index) => (
            <details
              key={line.id}
              className="mechanism-entry"
              open={index === 0}
            >
              <summary>
                <h3>
                  <span className="mechanism-entry__number" aria-hidden="true">
                    L{twoDigits(index + 1)}
                  </span>
                  <span className="mechanism-entry__summary">
                    <strong>{line.name}</strong>
                    <span>{line.question}</span>
                  </span>
                  <span className="mechanism-entry__action" aria-hidden="true">
                    展开
                  </span>
                </h3>
              </summary>
              <div className="mechanism-entry__content">
                <ol aria-label={`${line.name}的发展序列`}>
                  {line.sequence.map((stage, stageIndex) => (
                    <li key={stage}>
                      <span aria-hidden="true">{twoDigits(stageIndex + 1)}</span>
                      <span>{stage}</span>
                    </li>
                  ))}
                </ol>
                <p>{line.interpretation}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section
        id="historical-couplings"
        className="framework-section framework-section--couplings"
        aria-labelledby="historical-couplings-title"
      >
        <SectionHeader
          index={4}
          kicker="从史前到当代"
          title="八次关键耦合"
          description="历史并非孤立发明的串联。每次尺度跃迁都发生在知识、工具、能量、组织、需求与权力关系重新接合之时。"
          titleId="historical-couplings-title"
        />

        <div className="coupling-ledger">
          {historicalCouplings.map((coupling, index) => (
            <details key={coupling.id} open={index === 0}>
              <summary>
                <span aria-hidden="true">C{twoDigits(index + 1)}</span>
                <span>
                  <small>{coupling.period}</small>
                  <strong>{coupling.title}</strong>
                </span>
                <span className="coupling-ledger__action" aria-hidden="true">
                  阅读
                </span>
              </summary>
              <div className="coupling-ledger__content">
                <article>
                  <p>发生了什么</p>
                  <h3>{coupling.shift}</h3>
                </article>
                <article>
                  <p>怎样成为系统</p>
                  <h3>{coupling.system}</h3>
                </article>
                <article>
                  <p>不能忽略什么</p>
                  <h3>{coupling.tension}</h3>
                </article>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section
        id="historical-laws"
        className="framework-section framework-section--laws"
        aria-labelledby="historical-laws-title"
      >
        <SectionHeader
          index={5}
          kicker="跨时代诊断"
          title="科技演化反复出现的七条规律"
          description="规律不是决定论，而是一组可迁移的检查工具。它们帮助我们解释为什么有些技术早已发明却没有普及，有些成功又制造了新的脆弱性。"
          titleId="historical-laws-title"
        />

        <ol className="law-ledger">
          {historicalLaws.map((law, index) => (
            <li key={law.id}>
              <article>
                <span aria-hidden="true">R{twoDigits(index + 1)}</span>
                <div>
                  <h3>{law.title}</h3>
                  <p>{law.explanation}</p>
                </div>
                <p className="law-ledger__diagnostic">
                  <span>诊断</span>
                  {law.diagnostic}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="cross-domain"
        className="framework-section framework-section--cross-domain"
        aria-labelledby="cross-domain-title"
      >
        <SectionHeader
          index={6}
          kicker="读完之后留下什么"
          title="跨域者还要保留拒绝的能力"
          description="只懂技术会忽略真实需要，只懂市场会误判硬边界，只懂价值又可能失去实现路径。真正困难的是把这些问题放进同一张图。"
          titleId="cross-domain-title"
        />

        <blockquote className="cross-domain-thesis">
          <p>
            技术从来不只是工具。它会改变社会能够怎样组织，也会改变人们认为怎样的生活才是可能的；
            但技术也不是最后的解释，每一项技术都必须经过概念、工具、成本、组织、制度、分配与反馈，才会获得具体方向。
          </p>
        </blockquote>

        <ol className="cross-domain-capabilities">
          {crossDomainCapabilities.map((capability, index) => (
            <li key={capability.id}>
              <span aria-hidden="true">{twoDigits(index + 1)}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="technology-evaluation"
        className="framework-section framework-section--evaluation"
        aria-labelledby="technology-evaluation-title"
      >
        <SectionHeader
          index={7}
          kicker="可直接使用的工具"
          title="评价一项新技术的十六问"
          description="不要从“支持还是反对”开始。先确认知识边界，再检查现实能力、权力结构与长期反馈。"
          titleId="technology-evaluation-title"
        />

        <div className="evaluation-matrix">
          {technologyEvaluationGroups.map((group) => (
            <article key={group.id}>
              <header>
                <p>{group.label}</p>
                <h3>{group.title}</h3>
              </header>
              <ol>
                {group.questions.map((question, index) => (
                  <li key={question}>
                    <span aria-hidden="true">{twoDigits(index + 1)}</span>
                    <p>{question}</p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="framework-subhead">
          <p>进步校准 / 03</p>
          <h3>即使能力成立，也要继续问五次</h3>
          <p>总量增加不是终点，分配、权力、韧性与代际成本共同决定它是否值得。</p>
        </div>

        <ol className="progress-checklist">
          {progressTrapChecks.map((check, index) => (
            <li key={check.id}>
              <article aria-labelledby={`${check.id}-title`}>
                <header>
                  <span aria-hidden="true">Q{twoDigits(index + 1)}</span>
                  <h3 id={`${check.id}-title`}>{check.dimension}</h3>
                </header>
                <dl>
                  <div>
                    <dt>表面问题</dt>
                    <dd>{check.shallowQuestion}</dd>
                  </div>
                  <div>
                    <dt>继续追问</dt>
                    <dd>{check.deeperQuestion}</dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="critical-guardrails"
        className="framework-section framework-section--critique"
        aria-labelledby="critical-guardrails-title"
      >
        <SectionHeader
          index={8}
          kicker="写作与判断警戒"
          title="六项必须保留的批判"
          description="通史最容易让已经发生的路线显得自然、线性且唯一。这六项警戒用来阻止解释滑向进步神话、文明排名、单因论与专家免责。"
          titleId="critical-guardrails-title"
        />

        <div className="critique-ledger">
          {criticalGuardrails.map((guardrail, index) => (
            <details key={guardrail.id} open={index === 0}>
              <summary>
                <span aria-hidden="true">{twoDigits(index + 1)}</span>
                <h3>{guardrail.title}</h3>
                <span className="critique-ledger__action" aria-hidden="true">
                  展开
                </span>
              </summary>
              <p>{guardrail.explanation}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="civilization-view"
        className="framework-section framework-section--civilization-view"
        aria-labelledby="civilization-view-title"
      >
        <SectionHeader
          index={9}
          kicker="最终形成的文明观"
          title="扩大能力，也约束已经拥有的力量"
          description="科学、技术与文明的价值不在于彼此合并，而在于保持张力：知识持续纠错，能力可被复制，方向仍由受影响的人共同决定。"
          titleId="civilization-view-title"
        />

        <div className="civilization-credo">
          <article>
            <span>SCIENCE</span>
            <h3>科学</h3>
            <p>
              最宝贵的不是拥有永远正确的答案，而是建立让错误暴露、让知识修正的共同程序。
            </p>
          </article>
          <article>
            <span>TECHNOLOGY</span>
            <h3>技术</h3>
            <p>
              最强大的不是制造新奇器物，而是把人的目的转化为可复制、可叠加、可规模化的能力。
            </p>
          </article>
          <article>
            <span>CIVILIZATION</span>
            <h3>文明</h3>
            <p>
              最重要的不是无限放大能力，而是使能力的生产、分配与纠错仍然服从人的共同生活。
            </p>
          </article>
        </div>

        <div className="civilization-chain" aria-label="文明能力形成链">
          {civilizationChain.map((item, index) => (
            <span key={item}>
              <small aria-hidden="true">{twoDigits(index + 1)}</small>
              {item}
            </span>
          ))}
        </div>

        <ul className="civilization-principles">
          {civilizationPrinciples.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>

        <div className="framework-subhead">
          <p>落回读者 / 04</p>
          <h3>科学素养的五种实践</h3>
          <p>知道更多并不足够，还要辨别边界、保留克制并承担行动责任。</p>
        </div>

        <div className="literacy-notes">
          {scientificLiteracy.map((item, index) => (
            <details key={item.id} open={index === 0}>
              <summary>
                <h3>
                  <span aria-hidden="true">{twoDigits(index + 1)}</span>
                  <span>{item.title}</span>
                </h3>
              </summary>
              <div>
                <p>{item.description}</p>
                <p className="literacy-notes__prompt">
                  <span>自问</span>
                  {item.prompt}
                </p>
              </div>
            </details>
          ))}
        </div>

        <blockquote className="civilization-closing">
          <p>
            人类是否能够继续存在，取决于一种尚未同样成熟的能力：
            能否看见整个系统，约束自己已经拥有的力量，并让受影响的人共同决定它的方向。
          </p>
        </blockquote>
      </section>

      <section
        id="books-and-boundaries"
        className="framework-section framework-section--books"
        aria-labelledby="books-and-boundaries-title"
      >
        <SectionHeader
          index={10}
          kicker="材料从哪里来"
          title="四本书的分工与互相校正"
          description="结构重排版重新综合了通史与文明部分，网站同时保留科学哲学这条认识论线索。四本书各自补足，也各自带着解释盲区。"
          titleId="books-and-boundaries-title"
        />

        <div className="book-ledger">
          {bookContributions.map((book, index) => (
            <article key={book.id} aria-labelledby={`${book.id}-title`}>
              <header>
                <span className="book-ledger__number" aria-hidden="true">
                  B{twoDigits(index + 1)}
                </span>
                <div>
                  <p>{book.layer}</p>
                  <h3 id={`${book.id}-title`}>{book.title}</h3>
                </div>
              </header>
              <p className="book-ledger__question">
                <span>核心追问</span>
                {book.asks}
              </p>
              <dl>
                <div>
                  <dt>主要贡献</dt>
                  <dd>{book.contribution}</dd>
                </div>
                <div>
                  <dt>阅读警戒</dt>
                  <dd>{book.caution}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <aside
        id="source-boundaries"
        className="framework-section framework-section--boundaries"
        aria-labelledby="source-boundaries-title"
      >
        <header className="framework-section__header">
          <p className="section-index" aria-hidden="true">
            10B
          </p>
          <div>
            <p className="section-kicker">使用说明</p>
            <h2 id="source-boundaries-title">来源与解释边界</h2>
          </div>
          <p>
            这是一份个人读书笔记母稿。它提供理解框架，不代替原书、一手资料与更新研究。
          </p>
        </header>

        <ul className="boundary-notes">
          {sourceBoundaries.map((boundary, index) => (
            <li key={boundary.id}>
              <article aria-labelledby={`${boundary.id}-title`}>
                <span aria-hidden="true">{twoDigits(index + 1)}</span>
                <div>
                  <h3 id={`${boundary.id}-title`}>{boundary.title}</h3>
                  <p>{boundary.description}</p>
                  <p className="boundary-notes__implication">
                    <strong>使用时：</strong>
                    {boundary.implication}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
