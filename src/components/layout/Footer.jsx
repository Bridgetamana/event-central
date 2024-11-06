import Logo from "../ui/Logo";

const Footer = () => {
  const navLinks = [
    { name: "Browse Events", href: "#browse-events" },
    { name: "Featured Event", href: "#featured-event" },
    { name: "Pricing", href: "#pricing" },
    { name: "About Us", href: "#about-us" },
  ];

  const socialLinks = ["Twitter", "LinkedIn", "Facebook", "Instagram"];

  return (
    <footer className="bg-zinc-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo />
            <p className="text-zinc-400 mt-2">
              Empowering you to create memorable events that connect and inspire.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-zinc-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              {socialLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-zinc-400">
          <p>© 2024 EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
