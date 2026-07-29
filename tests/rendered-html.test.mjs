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

  assert.match(caseHtml, /证据时间线/);
  assert.match(caseHtml, /E1/);
  assert.match(caseHtml, /四段原视频已核实/);
  assert.doesNotMatch(
    caseHtml,
    /用户笔记转录，待核原视频|当事方自述，待核原视频/,
  );
  assert.match(caseHtml, /包括有了互联网之后，从这个电脑上，也看/);
  assert.match(caseHtml, /让暴风雨来得更猛烈一些就行/);
  assert.match(caseHtml, /大家不要被他们给乱带了节奏啊/);
  assert.match(caseHtml, /清醒的，充满正义感的人/);
  assert.match(caseHtml, /case-relation-bridge/);
  assert.match(caseHtml, /证据约束判断/);
  assert.match(caseHtml, /判断账本/);
  assert.match(caseHtml, /用逻辑学的七关检查/);
  assert.match(caseHtml, /群体心理的适用门槛/);
  assert.match(caseHtml, /直觉默认错误/);
  assert.match(caseHtml, /暂缓判断/);
  assert.match(caseHtml, /什么证据会让我改判/);
  assert.match(caseHtml, /data-design-contract/);
  assert.doesNotMatch(caseHtml, /付费水军已经|证实存在付费水军/);
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
