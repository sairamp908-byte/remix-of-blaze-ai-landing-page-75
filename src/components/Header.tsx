import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavLink = ({
  href,
  children,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <a href={href} onClick={onClick} className="text-gray-300 hover:text-white transition-colors font-medium">
    {children}
  </a>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <NavLink href={link.href}>
                  {link.label}
                </NavLink>
                {index < navLinks.length - 1 && (
                  <span className="mx-6 text-slate-600">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </nav>
        
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 font-medium px-6">
            Sign In
          </Button>
          <a href="#waitlist">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold gap-2 px-6">
              <Sparkles className="h-4 w-4" />
              Get Free Trial
            </Button>
          </a>
        </div>
        
        <div className="md:hidden">
          <Button onClick={toggleMenu} variant="ghost" size="icon" className="text-white hover:bg-white/10">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-700/50">
          <nav className="container mx-auto flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href} onClick={toggleMenu}>
                {link.label}
              </NavLink>
            ))}
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 font-medium w-full max-w-xs">
              Sign In
            </Button>
            <a href="#waitlist" onClick={toggleMenu} className="w-full max-w-xs">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold w-full gap-2">
                <Sparkles className="h-4 w-4" />
                Get Free Trial
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;