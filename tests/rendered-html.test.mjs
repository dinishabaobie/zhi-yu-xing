import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.match(html, /旅途愉快/);
  assert.match(html, /电工/);
  assert.match(html, /逻辑学/);
  assert.match(html, /科学/);
  assert.match(html, /dinishabaobie\.github\.io\/wuwa-bon-voyage\//);
  assert.match(html, /dinishabaobie\.github\.io\/electrician-simulator\//);
  assert.match(html, /热点点评/);
  assert.match(html, /data-design-contract/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("ships the authored visual system and removes the starter preview", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /knowledge-contact-sheet\.jpg/);
  assert.match(page, /ThemeToggle/);
  assert.match(layout, /lang="zh-CN"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /data-theme="dark"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});
