import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
const NavLink = ({
  href,
  children,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => <a href={href} onClick={onClick} className="text-gray-300 hover:text-white transition-colors font-medium">
    {children}
  </a>;
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navLinks = [{
    href: "https://preview--blaze-ai-landing-page-01.lovable.app/#hero",
    label: "Home"
  }, {
    href: "https://preview--blaze-ai-landing-page-01.lovable.app/#about",
    label: "About"
  }, {
    href: "https://preview--blaze-ai-landing-page-01.lovable.app/#features",
    label: "Features"
  }, {
    href: "https://preview--blaze-ai-landing-page-01.lovable.app/#exams",
    label: "Exams"
  }, {
    href: "https://preview--blaze-ai-landing-page-01.lovable.app/#waitlist",
    label: "Waitlist"
  }];
  return <header className="sticky top-[44px] z-50 w-full bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm">
          <NavLink href={navLinks[0].href}>{navLinks[0].label}</NavLink>
          <NavLink href={navLinks[1].href}>{navLinks[1].label}</NavLink>
          <NavLink href={navLinks[2].href}>{navLinks[2].label}</NavLink>
          <NavLink href={navLinks[3].href}>{navLinks[3].label}</NavLink>
          <NavLink href={navLinks[4].href}>{navLinks[4].label}</NavLink>
        </nav>
        <div className="hidden md:flex items-center">
          <a href="https://preview--blaze-ai-landing-page-01.lovable.app/#waitlist">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-base">Be Part of the Founders’ Circle</Button>
          </a>
        </div>
        <div className="md:hidden">
          <Button onClick={toggleMenu} variant="ghost" size="icon" className="text-white hover:bg-white/10">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && <div className="md:hidden border-t border-purple-500/10">
          <nav className="container mx-auto flex flex-col items-center gap-4 py-4">
            {navLinks.map(link => <NavLink key={link.label} href={link.href} onClick={toggleMenu}>{link.label}</NavLink>)}
            <a href="https://preview--blaze-ai-landing-page-01.lovable.app/#waitlist" onClick={toggleMenu}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold w-full">
                Join waitlist
              </Button>
            </a>
          </nav>
        </div>}
    </header>;
};
export default Header;