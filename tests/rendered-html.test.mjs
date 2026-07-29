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
  assert.match(caseHtml, /四段原视频已核实/);
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
  assert.match(caseHtml, /显示对应判断：个人偏好/);
  assert.match(caseHtml, /分析截止 7 月 16 日/);
  assert.match(caseHtml, /累计使用截至当日的一段材料：仅 7 月 16 日直播原话/);
  assert.match(caseHtml, /分析截止 7 月 18 日/);
  assert.match(caseHtml, /累计使用 7 月 16、18 日两段材料/);
  assert.match(caseHtml, /分析截止 7 月 19 日/);
  assert.match(caseHtml, /累计使用 7 月 16、18、19 日三段材料/);
  assert.match(caseHtml, /分析截止 7 月 20 日/);
  assert.match(caseHtml, /累计对照 7 月 16、18、19、20 日全部四段材料/);
  assert.match(caseHtml, /水军说法的确定度发生了跳跃/);
  assert.match(caseHtml, /反讽式道歉把“解释原话”改造成公开反击/);
  assert.match(caseHtml, /“正常观众”与“黑粉”二分/);
  assert.match(caseHtml, /旭旭宝宝的错误/);
  assert.match(caseHtml, /舆论升级点/);
  assert.match(caseHtml, /回应决策复盘/);
  assert.match(caseHtml, /四天对照后可确认推理断点/);
  assert.match(caseHtml, /四段材料展示的都是旭旭宝宝对评论的概括/);
  assert.doesNotMatch(caseHtml, /但本段只提供/);
  assert.match(caseHtml, /乌合之众：重复与传染/);
  assert.match(caseHtml, /乌合之众：神圣信念边界/);
  assert.match(caseHtml, /暂缓判断/);
  assert.match(caseHtml, /两条错误链互相喂养，却不能互相证明/);
  assert.match(caseHtml, /href="\/knowledge\/logic"/);
  assert.match(caseHtml, /data-design-contract/);
  assert.doesNotMatch(caseHtml, /付费水军已经|证实存在付费水军/);
  assert.doesNotMatch(
    caseHtml,
    /dinishabaobie\.github\.io\/logic-field-guide/,
  );

  for (const relationId of [
    "16-preference",
    "16-conflict-frame",
    "16-evaluation",
    "16-consensus",
    "18-choice",
    "18-friends",
    "18-rhetoric",
    "18-target",
    "18-attack",
    "18-escalation-vow",
    "19-counter-mobilize",
    "19-scope",
    "19-boundary",
    "19-coordination",
    "19-water",
    "19-two-buckets",
    "19-accountability",
    "19-repair",
    "20-negative",
    "20-boycott",
    "20-symbol",
    "20-certainty",
    "20-locust",
    "20-agency",
    "20-commit",
    "20-camps",
  ]) {
    const matches = caseHtml.match(
      new RegExp(`data-relation-id="${relationId}"`, "g"),
    );
    assert.equal(
      matches?.length,
      2,
      `${relationId} should connect one original quote to one analysis node`,
    );
  }

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
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});
