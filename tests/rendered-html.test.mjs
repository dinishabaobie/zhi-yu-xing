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
  assert.match(html, /三个入口，各有自己的秩序/);
  assert.match(html, /《鸣潮》专题/);
  assert.match(html, /2024 年底开始玩/);
  assert.match(html, /href="\/games"/);
  assert.match(html, /game\.jpg/);
  assert.match(html, /href="\/work"/);
  assert.match(html, /work\.jpg/);
  assert.match(html, /href="\/knowledge"/);
  assert.match(html, /热点点评/);
  assert.match(html, /data-design-contract/);
  assert.doesNotMatch(html, /dinishabaobie\.github\.io/);
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
  assert.match(knowledgeHtml, /logic-field-guide\.you-know\.chatgpt\.site/);
  assert.match(
    knowledgeHtml,
    /science-civilization-atlas\.you-know\.chatgpt\.site/,
  );
});

test("ships the authored visual system and removes the starter preview", async () => {
  const [page, layout, siteChrome, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /knowledge-contact-sheet\.jpg/);
  assert.match(siteChrome, /ThemeToggle/);
  assert.match(layout, /lang="zh-CN"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /data-theme="dark"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});
