
import React from 'react';
import Logo from './Logo';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
      {children}
    </a>
);

const SocialLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
      {children}
    </a>
);

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-muted-foreground text-sm">
              The smartest way to study smarter. AI-driven personalized learning for top ranks.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-3">
              <li><FooterLink href="https://preview--blaze-ai-landing-page-01.lovable.app/#features">Features</FooterLink></li>
              <li><FooterLink href="#">Pricing</FooterLink></li>
              <li><FooterLink href="https://preview--blaze-ai-landing-page-01.lovable.app/#waitlist">Waitlist</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><FooterLink href="https://preview--blaze-ai-landing-page-01.lovable.app/#about">About Us</FooterLink></li>
              <li>
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground text-sm">Contact:</span>
                  <div className="flex items-center space-x-2">
                    <SocialLink href="mailto:hello@blaizeuniversity.com"><Mail className="h-4 w-4" /></SocialLink>
                    <SocialLink href="https://instagram.com/blaizeuniversity"><Instagram className="h-4 w-4" /></SocialLink>
                    <SocialLink href="https://linkedin.com/company/blaizeuniversity"><Linkedin className="h-4 w-4" /></SocialLink>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><FooterLink href="/privacy-policy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms-of-service">Terms of Service</FooterLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} BLaiZE. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <SocialLink href="mailto:hello@blaizeuniversity.com"><Mail className="h-5 w-5" /></SocialLink>
            <SocialLink href="https://instagram.com/blaizeuniversity"><Instagram className="h-5 w-5" /></SocialLink>
            <SocialLink href="https://linkedin.com/company/blaizeuniversity"><Linkedin className="h-5 w-5" /></SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
