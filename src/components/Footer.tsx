import React, { useState, useEffect } from 'react';
import { Github, Youtube, ArrowUp } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

const footerLinks = {
  Framework: [
    { name: 'Documentation', path: '/docs/introduction' },
    { name: 'Nova', path: '/docs/nova' },
    { name: 'Juice', path: '/docs/cli-basics' },
    { name: 'Rocket', path: '/docs/rocket-orm' },
    { name: 'Haven', path: '/docs/haven' },
  ],
  Resources: [
    { name: 'Getting Started', path: '/docs/first-app' },
    { name: 'Tutorials', path: '/docs' },
    { name: 'Examples', path: '/docs/first-app' },
    { name: 'Best Practices', path: '/docs/best-practices' },
    { name: 'FAQ', path: '/docs/faq' },
    { name: 'Video Courses', path: '/docs/courses' },
  ],
  Community: [
    { name: 'Discord', path: 'https://discord.gg/luxid', external: true },
    { name: 'GitHub Discussions', path: 'https://github.com/LuxidDev/Framework/discussions', external: true },
    { name: 'Stack Overflow', path: 'https://stackoverflow.com/questions/tagged/luxid', external: true },
    { name: 'X (Twitter)', path: 'https://x.com/luxidphp', external: true },
    { name: 'YouTube', path: 'https://youtube.com/@luxid', external: true },
    { name: 'Newsletter', path: '/newsletter' },
  ],
  Company: [
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Press Kit', path: '/press' },
    { name: 'Contact', path: '/contact' },
    { name: 'Sponsors', path: '/sponsors' },
  ],
};

// Custom Link component that scrolls to top
const ScrollToTopLink = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default function Footer() {
  const { darkMode } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const renderLink = (link: { name: string; path: string; external?: boolean }) => {
    if (link.external) {
      return (
        <a
          href={link.path}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm transition-colors ${darkMode
            ? 'text-zinc-500 hover:text-white'
            : 'text-zinc-400 hover:text-white'
            }`}
        >
          {link.name}
        </a>
      );
    }
    return (
      <ScrollToTopLink
        to={link.path}
        className={`text-sm transition-colors ${darkMode
          ? 'text-zinc-500 hover:text-white'
          : 'text-zinc-400 hover:text-white'
          }`}
      >
        {link.name}
      </ScrollToTopLink>
    );
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className={`border-t relative ${darkMode
        ? 'bg-zinc-950 border-zinc-900'
        : 'bg-zinc-900 border-zinc-800'
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2">
              <a
                href="/"
                onClick={handleLogoClick}
                className="flex items-center gap-2.5 mb-4 group cursor-pointer"
              >
                <span className="text-xl font-bold text-white">Luxid</span>
                <img
                  src="/lion7.svg"
                  alt="Luxid"
                  className="w-8 h-8 group-hover:scale-110 transition-transform"
                />
              </a>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                The PHP Framework for Modern Web. Build elegant applications with the AVE architecture.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/LuxidDev/Framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${darkMode
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@LuxidDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${darkMode
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/luxidphp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${darkMode
                    ? 'bg-zinc-900 hover:bg-zinc-800'
                    : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                  title="X"
                >
                  <img
                    src={darkMode ? '/x-white.png' : '/x-black.png'}
                    alt="X"
                    className="w-4 h-4"
                  />
                </a>
              </div>
            </div>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-4 text-sm">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link.name}>
                      {renderLink(link)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${darkMode ? 'border-zinc-900' : 'border-zinc-800'
            }`}>
            <p className={`text-sm flex items-center gap-1 ${darkMode ? 'text-zinc-600' : 'text-zinc-500'
              }`}>
              Creator and CEO of Luxid ~
              <a
                href="https://www.jhayonline.dev"
                target="_blank"
                rel="noopener noreferrer"
                className={"text-white font-mono"}
              >
                jhayonline.dev
              </a>
            </p>
            <p className={`text-sm ${darkMode ? 'text-zinc-600' : 'text-zinc-500'
              }`}>
              &copy; 2025 Luxid. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <ScrollToTopLink
                to="/privacy"
                className={`transition-colors ${darkMode
                  ? 'text-zinc-500 hover:text-white'
                  : 'text-zinc-400 hover:text-white'
                  }`}
              >
                Privacy
              </ScrollToTopLink>
              <ScrollToTopLink
                to="/terms"
                className={`transition-colors ${darkMode
                  ? 'text-zinc-500 hover:text-white'
                  : 'text-zinc-400 hover:text-white'
                  }`}
              >
                Terms
              </ScrollToTopLink>
              <ScrollToTopLink
                to="/cookies"
                className={`transition-colors ${darkMode
                  ? 'text-zinc-500 hover:text-white'
                  : 'text-zinc-400 hover:text-white'
                  }`}
              >
                Cookies
              </ScrollToTopLink>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border transition-all duration-300 hover:scale-110 ${showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
            } ${darkMode
              ? 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-white'
              : 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 text-white'
            }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 mx-auto" />
        </button>
      </footer>
    </>
  );
}
