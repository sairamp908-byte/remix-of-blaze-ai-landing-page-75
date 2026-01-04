import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EarlyAccessBanner from '@/components/EarlyAccessBanner';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <EarlyAccessBanner />
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                At BLaiZE University, we collect the following information to provide you with early access updates and beta invitations:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Full Name - to personalize your experience</li>
                <li>Email Address - for updates, early access notifications, and beta invites</li>
                <li>Phone Number (optional) - for important updates and support</li>
                <li>Target Exam - to provide relevant content and features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Why We Collect This Information</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To send you updates about BLaiZE University's launch and new features</li>
                <li>To provide early access to our platform before public launch</li>
                <li>To send beta invitations and testing opportunities</li>
                <li>To personalize your learning experience based on your target exam</li>
                <li>To provide customer support when needed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">How We Store and Protect Your Information</h2>
              <p className="text-muted-foreground mb-4">
                Your data is stored securely using industry-standard encryption and security measures. We implement appropriate technical and organizational safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications at any time</li>
                <li>Request data portability</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:hello@blaizeuniversity.com" className="text-primary hover:underline">
                  hello@blaizeuniversity.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:hello@blaizeuniversity.com" className="text-primary hover:underline">
                  hello@blaizeuniversity.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default PrivacyPolicy;