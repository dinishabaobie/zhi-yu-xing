import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { href: "/games", label: "游戏" },
  { href: "/work", label: "工作" },
  { href: "/knowledge", label: "知识" },
  { href: "/#writing", label: "笔记" },
  { href: "/#about", label: "关于" },
];

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      <header className="site-header">
        <a className="wordmark" href="/" aria-label="知与行，返回首页">
          <span className="wordmark-mark" aria-hidden="true" />
          知与行
        </a>

        <nav className="desktop-nav" aria-label="主要导航">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <details className="mobile-nav">
            <summary>菜单</summary>
            <nav aria-label="移动端导航">
              {navigation.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="wordmark footer-wordmark" href="/">
        <span className="wordmark-mark" aria-hidden="true" />
        知与行
      </a>
      <p>游戏、工作、知识与持续写作。</p>
      <a className="footer-top" href="#top">
        回到页首 <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
