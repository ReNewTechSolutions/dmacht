const navItems = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Tips", href: "#tips" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  return (
    <header className="topNav">
      <a className="brandMark" href="#top" aria-label="D-Macht home">
        <span className="brandLogoWide" aria-hidden>
          <img src="/brand/dmacht-logo.svg" alt="" />
        </span>
        <span className="brandTextBlock">
          <strong>D-Macht</strong>
          <small>Industrial support desk</small>
        </span>
      </a>

      <nav className="navLinks" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="navCta" href="#request">
        Request service
      </a>
    </header>
  );
}
