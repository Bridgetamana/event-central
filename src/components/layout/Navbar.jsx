import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "../ui/Logo";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: "Browse Events", path: "/events", isRoute: true },
    { name: "Featured Event", section: "featured-event", isRoute: false },
    { name: "Pricing", section: "pricing", isRoute: false },
    { name: "About Us", path: "/about-us", isRoute: true },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed w-full backdrop-blur-sm bg-white/75 border-b border-indigo-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Logo />
          </motion.div>

          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-zinc-600 hover:text-indigo-600 transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.section)}
                  className="text-zinc-600 hover:text-indigo-600 transition-colors"
                >
                  {link.name}
                </button>
              )
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              className="text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              Log in
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4 bg-white p-4 rounded-lg shadow-lg">
            {navLinks.map((link) =>
              link.isRoute ? (
                <button key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-zinc-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </button>
              ) : (
                <button
                  key={link.name}
                  onClick={() => {
                    scrollToSection(link.section);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-zinc-600 hover:text-indigo-600 transition-colors"
                >
                  {link.name}
                </button>
              )
            )}
            <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              Log in
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
