import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname.replaceAll("/", "-")}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the personal knowledge portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /知与行/);
  assert.match(html, />个人知识</);
  assert.doesNotMatch(html, /个人知识与作品入口/);
  assert.match(html, /小时候家里穷用不起/);
  assert.match(html, /GPT也用不起Kimi/);
  assert.match(html, /只能用豆包 听她的唐笑/);
  assert.match(html, /我把它当做贫穷送我的礼物/);
  assert.doesNotMatch(html, /走过的路|想过的问题/);
  assert.match(html, /四个入口，各有自己的秩序/);
  assert.match(html, /《鸣潮》专题/);
  assert.match(html, /2024 年底开始玩/);
  assert.match(html, /href="\/games"/);
  assert.match(html, /game\.jpg/);
  assert.match(html, /href="\/work"/);
  assert.match(html, /work\.jpg/);
  assert.match(html, /href="\/knowledge"/);
  assert.match(html, /knowledge\.jpg/);
  assert.match(html, /href="\/hotspots"/);
  assert.match(html, /社会热点/);
  assert.match(html, /一场观影偏好/);
  assert.match(html, /热点点评/);
  assert.match(html, /data-design-contract/);
  assert.doesNotMatch(
    html,
    /dinishabaobie\.github\.io\/(?:wuwa-bon-voyage|electrician-simulator|logic-field-guide|science-civilization-atlas)/,
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("groups the existing sites into game, work, and knowledge collections", async () => {
  const [games, work, knowledge] = await Promise.all([
    render("/games"),
    render("/work"),
    render("/knowledge"),
  ]);

  assert.equal(games.status, 200);
  assert.equal(work.status, 200);
  assert.equal(knowledge.status, 200);

  const [gamesHtml, workHtml, knowledgeHtml] = await Promise.all([
    games.text(),
    work.text(),
    knowledge.text(),
  ]);

  assert.match(gamesHtml, /游戏板块/);
  assert.match(gamesHtml, /旅途愉快/);
  assert.match(gamesHtml, /2024 年底开始玩《鸣潮》/);
  assert.match(gamesHtml, /game\.jpg/);
  assert.match(gamesHtml, /dinishabaobie\.github\.io\/wuwa-bon-voyage\//);

  assert.match(workHtml, /工作板块/);
  assert.match(workHtml, /电工/);
  assert.match(workHtml, /work\.jpg/);
  assert.match(workHtml, /dinishabaobie\.github\.io\/electrician-simulator\//);

  assert.match(knowledgeHtml, /知识板块/);
  assert.match(knowledgeHtml, /逻辑学/);
  assert.match(knowledgeHtml, /科学、技术与文明/);
  assert.match(knowledgeHtml, /href="\/knowledge\/logic"/);
  assert.match(knowledgeHtml, /href="\/knowledge\/science"/);
  assert.doesNotMatch(
    knowledgeHtml,
    /dinishabaobie\.github\.io\/(?:logic-field-guide|science-civilization-atlas)/,
  );
  assert.doesNotMatch(knowledgeHtml, /you-know\.chatgpt\.site/);
});

test("publishes logic and science as full internal knowledge subjects", async () => {
  const [logic, science] = await Promise.all([
    render("/knowledge/logic"),
    render("/knowledge/science"),
  ]);

  assert.equal(logic.status, 200);
  assert.equal(science.status, 200);

  const [logicHtml, scienceHtml] = await Promise.all([
    logic.text(),
    science.text(),
  ]);

  assert.match(logicHtml, /返回知识/);
  assert.match(logicHtml, /在结论之前/);
  assert.match(logicHtml, /七关，不是七章目录/);
  assert.match(logicHtml, /知识地图/);
  assert.match(logicHtml, /谬误断点/);
  assert.match(logicHtml, /练习场/);
  assert.match(logicHtml, /《写给中学生的逻辑学》/);

  assert.match(scienceHtml, /返回知识/);
  assert.match(scienceHtml, /科学、技术/);
  assert.match(scienceHtml, /三条轨道上的能力扩张/);
  assert.match(scienceHtml, /九个历史时代/);
  assert.match(scienceHtml, /理解知识怎样变成塑造世界的力量/);
  assert.match(scienceHtml, /技术十六问/);
  assert.match(scienceHtml, /来源与解释边界/);
});

test("publishes the social-hotspot index and evidence-led case analysis", async () => {
  const [hotspots, casePage] = await Promise.all([
    render("/hotspots"),
    render("/hotspots/xuxubaobao"),
  ]);

  assert.equal(hotspots.status, 200);
  assert.equal(casePage.status, 200);

  const [hotspotsHtml, caseHtml] = await Promise.all([
    hotspots.text(),
    casePage.text(),
  ]);

  assert.match(hotspotsHtml, /不是急着站队，先让证据归位/);
  assert.match(hotspotsHtml, /旭旭宝宝与《功夫女足》争议/);
  assert.match(hotspotsHtml, /href="\/hotspots\/xuxubaobao"/);

  assert.match(caseHtml, /逐日原文与深度解析/);
  assert.match(caseHtml, /四段完整原话，四个时间截面/);
  assert.match(caseHtml, /后来发生的事，不能提前成为理由/);
  assert.match(caseHtml, /16 日只看 16 日/);
  assert.match(caseHtml, /四段原视频转录/);
  assert.doesNotMatch(
    caseHtml,
    /用户笔记转录，待核原视频|当事方自述，待核原视频/,
  );
  assert.match(caseHtml, /包括有了互联网之后，从这个电脑上，也看/);
  assert.match(caseHtml, /让暴风雨来得更猛烈一些就行/);
  assert.match(caseHtml, /大家不要被他们给乱带了节奏啊/);
  assert.match(caseHtml, /清醒的，充满正义感的人/);
  assert.match(caseHtml, /case-connection-layer/);
  assert.match(caseHtml, /data-relation-id="16-preference"/);
  assert.match(caseHtml, /显示对应判断：说的是他自己/);
  assert.match(caseHtml, /分析截止 7 月 16 日/);
  assert.match(caseHtml, /这一天只看这一天/);
  assert.match(caseHtml, /分析截止 7 月 18 日/);
  assert.match(caseHtml, /看 16 日和 18 日两天/);
  assert.match(caseHtml, /分析截止 7 月 19 日/);
  assert.match(caseHtml, /看 16、18、19 三天/);
  assert.match(caseHtml, /分析截止 7 月 20 日/);
  assert.match(caseHtml, /四天全看/);

  // 事实账本与六角度核查必须先于逐句判断出现
  assert.match(caseHtml, /事实账本/);
  assert.match(caseHtml, /先看每句话是从哪来的/);
  assert.match(caseHtml, /他看得到，我们看不到/);
  assert.match(caseHtml, /仍然未知/);
  for (const angle of [
    "接近性",
    "可核验性",
    "独立性",
    "完整性",
    "动机与能力",
    "时效性",
  ]) {
    assert.match(caseHtml, new RegExp(angle), `六角度缺少 ${angle}`);
  }

  // 亲历与推测必须分开：当事人对自身遭遇的陈述不按转述处理
  assert.match(caseHtml, /他自己遇到的事/);
  assert.match(caseHtml, /自己亲身经历的事不用向别人举证，猜的事才要/);
  assert.doesNotMatch(caseHtml, /“无数人”在评论区和私信里指责、谩骂、侮辱他。/);
  // 六角度核查的对象必须是推测，不是亲历
  assert.match(caseHtml, /这六条是用来查“猜的”，不是用来查“亲身经历的”/);

  // 群体分类用《乌合之众》第九章的异质性 / 同质性，而不是自造框架
  assert.match(caseHtml, /群体分类/);
  assert.match(caseHtml, /异质性群体/);
  assert.match(caseHtml, /同质性群体/);
  assert.ok(
    caseHtml.indexOf("群体分类") < caseHtml.indexOf('id="E1-source-title"'),
    "群体分类必须在第一段逐日分析之前给出",
  );

  // 每条判断都要带标准化命题；除结构性结论外都要给改判条件
  assert.match(caseHtml, /analysis-node-claim/);
  assert.match(caseHtml, /analysis-node-revision/);
  assert.match(caseHtml, /改判条件/);

  // 必须写明这是挑选过的关键句，不是逐句穷举
  assert.match(caseHtml, /只挑关键的句子/);
  assert.match(caseHtml, /不是逐句穷举/);

  // 判断节点必须挂在站内逻辑学的同一套七关上
  for (const gate of [
    "逻辑 01 · 定词",
    "逻辑 02 · 正句",
    "逻辑 03 · 验据",
    "逻辑 04 · 搭桥",
    "逻辑 05 · 查一致",
    "逻辑 06 · 校准概率",
    "逻辑 07 · 重建论证",
  ]) {
    assert.match(caseHtml, new RegExp(gate), `缺少七关中的 ${gate}`);
  }

  // 《乌合之众》必须点到具体章节机制
  assert.match(caseHtml, /乌合之众 3 · 群体的想象力/);
  assert.match(caseHtml, /乌合之众 7 · 断言、重复、传染/);
  assert.match(caseHtml, /乌合之众 10 · 用正义包装/);

  // 《简单的逻辑学》第 7 步要求的结论四栏
  assert.match(caseHtml, /适用范围/);
  assert.match(caseHtml, /最大不确定性/);
  assert.match(caseHtml, /什么证据会改判/);
  assert.match(caseHtml, /最小可逆行动/);

  // 读者可带走的五问
  assert.match(caseHtml, /事实清楚了吗？/);
  assert.match(caseHtml, /有没有另一方说法？/);
  assert.match(caseHtml, /我现在是在判断，还是在发泄？/);
  assert.match(caseHtml, /情绪越强，判断越慢/);

  // 可读性：不使用未加解释的术语
  for (const jargon of ["主项", "谓项", "肯定后件", "轻率概括", "便利样本", "外延"]) {
    assert.doesNotMatch(caseHtml, new RegExp(jargon), `热点页不应出现术语「${jargon}」`);
  }

  assert.match(caseHtml, /暂缓判断/);
  assert.match(caseHtml, /两边都在拿“谁是自己人”代替“这话对不对”/);
  assert.match(caseHtml, /href="\/knowledge\/logic"/);
  assert.match(caseHtml, /data-design-contract/);
  assert.doesNotMatch(caseHtml, /付费水军已经|证实存在付费水军/);
  // 材料不对称必须写明，不能让读者以为两边证据一样多
  assert.match(caseHtml, /没有对方的一份/);
  assert.doesNotMatch(
    caseHtml,
    /dinishabaobie\.github\.io\/logic-field-guide/,
  );

  for (const relationId of [
    "16-preference",
    "16-evaluation",
    "16-consensus",
    "18-scale",
    "18-target",
    "18-image",
    "18-escalation",
    "19-consistency",
    "19-scope",
    "19-boundary",
    "19-copy",
    "20-compress",
    "20-boycott",
    "20-sacred",
    "20-jump",
    "20-commit",
    "20-camps",
  ]) {
    const matches = caseHtml.match(
      new RegExp(`data-relation-id="${relationId}"`, "g"),
    );
    assert.ok(
      (matches?.length ?? 0) >= 2,
      `${relationId} should connect at least one original quote to its analysis node`,
    );
  }

  // 每个判断节点必须恰好对应一处解析，原句锚点可以多于一处
  const nodeIds = [
    ...caseHtml.matchAll(/class="analysis-node [^"]*" data-relation-id="([^"]+)"/g),
  ].map((match) => match[1]);
  assert.equal(nodeIds.length, 17);
  assert.equal(new Set(nodeIds).size, 17);

  const day16 = caseHtml.slice(
    caseHtml.indexOf('id="E1-source-title"'),
    caseHtml.indexOf('id="E2-source-title"'),
  );
  const day18 = caseHtml.slice(
    caseHtml.indexOf('id="E2-source-title"'),
    caseHtml.indexOf('id="E3-source-title"'),
  );
  const day19 = caseHtml.slice(
    caseHtml.indexOf('id="E3-source-title"'),
    caseHtml.indexOf('id="E4-source-title"'),
  );
  assert.doesNotMatch(day16, /18 日|19 日|20 日/);
  assert.doesNotMatch(day18, /19 日|20 日/);
  assert.doesNotMatch(day19, /20 日/);
});

test("ships the authored visual system and removes the starter preview", async () => {
  const [page, layout, siteChrome, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /hero\.jpg/);
  assert.match(siteChrome, /ThemeToggle/);
  assert.match(layout, /lang="zh-CN"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /data-theme="dark"/);
  assert.match(css, /@media \(min-width: 1440px\)/);
  assert.match(
    css,
    /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/,
  );
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});
