import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap } from 'lucide-react';
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
    { href: "#hero", label: "Home" },
    { href: "#about", label: "Classroom" },
    { href: "#features", label: "Features" },
    { href: "#exams", label: "About" },
  ];

  return (
    <header className="sticky top-[44px] z-50 w-full bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center justify-center flex-1 space-x-12 text-sm">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center">
          <a href="#waitlist">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-base gap-2">
              <GraduationCap className="h-5 w-5" />
              Join Classroom
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
        <div className="md:hidden border-t border-purple-500/10">
          <nav className="container mx-auto flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href} onClick={toggleMenu}>
                {link.label}
              </NavLink>
            ))}
            <a href="#waitlist" onClick={toggleMenu}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold w-full gap-2">
                <GraduationCap className="h-5 w-5" />
                Join Classroom
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;