import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EarlyAccessBanner from '@/components/EarlyAccessBanner';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <EarlyAccessBanner />
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Pre-Launch / Beta Stage</h2>
              <p className="text-muted-foreground mb-4">
                BLaiZE University is currently in pre-launch/beta stage. By joining our waitlist and participating in our beta program, you understand and agree that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Features and functionality may change without notice</li>
                <li>The platform is under active development and testing</li>
                <li>Some features may be experimental or incomplete</li>
                <li>We may request feedback and suggestions from beta users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                We strive to provide reliable access to our services, however:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>We do not guarantee uninterrupted access to our platform</li>
                <li>Maintenance, updates, or technical issues may cause temporary disruptions</li>
                <li>Service availability may vary during the beta phase</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content, features, and functionality on BLaiZE University, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>AI-generated quizzes and learning materials</li>
                <li>Performance analytics and insights</li>
                <li>Study roadmaps and recommendations</li>
                <li>Software, algorithms, and user interface</li>
                <li>Branding, logos, and design elements</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Are the exclusive property of BLaiZE University and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">User Conduct</h2>
              <p className="text-muted-foreground mb-4">
                By using our services, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use the platform for legitimate educational purposes only</li>
                <li>Not share your account credentials with others</li>
                <li>Not attempt to reverse engineer or copy our AI algorithms</li>
                <li>Provide honest feedback during the beta phase</li>
                <li>Respect other users and maintain appropriate conduct</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the fullest extent permitted by law, BLaiZE University shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of data, profits, or business opportunities</li>
                <li>Service interruptions or technical issues</li>
                <li>Accuracy of AI-generated content or recommendations</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Our liability is limited to the amount you have paid for our services, if any.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. We will notify users of significant changes through email or platform notifications. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at{' '}
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

export default TermsOfService;