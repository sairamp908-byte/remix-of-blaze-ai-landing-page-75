import React from 'react';
import { BookOpen, ArrowRight, Zap } from 'lucide-react';

const AboutSection = () => {
  return <section id="about" className="py-24 bg-gradient-to-br from-blue-950 via-slate-900 to-purple-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2 mb-6">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-semibold text-sm">REVOLUTIONIZING EDUCATION</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-8 md:text-6xl">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300">BLaiZE University</span>
          </h2>
          <p className="max-w-4xl mx-auto leading-relaxed text-xl text-gray-300">The world's first AI-powered university created to revolutionize how students learn and succeed, study, and achieve academic excellence through personalized, intelligent education.</p>
        </div>

        {/* Mission Statement */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white">Our Revolutionary Vision</h3>
            </div>
            <p className="text-xl leading-relaxed text-gray-200">Education has been broken for centuries — one teacher, one classroom, one system, trying to fit millions of unique minds into the same mold. The result? Only a few shine, while the rest are left behind. Blaize was built to end this. We believe education should not be "one for all," but "education for each."</p>
            <br />
            <p className="text-xl leading-relaxed text-gray-200">We start where the hunger is greatest — competitive exams. Here, every student fights for the top, but outdated systems keep 99% from reaching it. Blaize changes that forever. Our platform combines cutting-edge artificial intelligence with proven pedagogical methods to create the most effective learning experience ever developed.</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl overflow-hidden">
            <h3 className="text-4xl font-bold text-center text-white mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400">Traditional Learning</span> vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">BLaiZE University</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-6 px-6 text-xl font-bold text-red-300">🚪 Traditional Learning</th>
                    <th className="py-6 px-6 text-xl font-bold text-blue-300">⚡ BLaiZE University</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6 text-gray-300">📚 Rote memorization & outdated textbooks</td>
                    <td className="py-6 px-6 text-blue-200">🤖 AI-powered personalized learning that adapts to YOU</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6 text-gray-300">💤 One-size-fits-all boring lectures</td>
                    <td className="py-6 px-6 text-blue-200">🎯 Smart, performance-based quizzes that focus on YOUR weak spots</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6 text-gray-300">⏳ Slow progress, fixed pace for everyone</td>
                    <td className="py-6 px-6 text-blue-200">🚀 Learn 3x faster with adaptive, goal-driven roadmaps</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6 text-gray-300">🏫 Limited to classroom walls</td>
                    <td className="py-6 px-6 text-blue-200">🌍 Learn anywhere, anytime, at your own speed</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6 text-gray-300">😓 Stressful exams & pressure</td>
                    <td className="py-6 px-6 text-blue-200">🧠 Confidence-based mastery system — exams feel easy</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6 text-gray-300">🎓 Education = marks & certificates</td>
                    <td className="py-6 px-6 text-blue-200">🏆 Education = real skills, rank improvement & career success</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6 text-gray-300">💸 Expensive coaching & tuition centers</td>
                    <td className="py-6 px-6 text-blue-200">💡 Affordable, accessible AI mentor for every student</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6 text-gray-300">🕰 Wasting hours on irrelevant practice</td>
                    <td className="py-6 px-6 text-blue-200">🔥 Every minute counts — smart AI ensures no time wasted</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6 text-gray-300">❌ Students feel left behind or ignored</td>
                    <td className="py-6 px-6 text-blue-200">🌟 Every student shines — from beginners to toppers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Global Impact */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-xl p-12 border border-blue-400/30 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-6">Transforming Education Globally</h3>
            <p className="text-xl max-w-4xl mx-auto text-gray-200 text-center font-normal leading-relaxed">We're building a global community of learners who are redefining what's possible in education through the power of artificial intelligence. Competitive exams are only the first step. BLaiZE is a revolution to empower every learner, everywhere.</p>
            <br />
            <p className="text-xl max-w-4xl mx-auto text-gray-200 text-center font-normal leading-relaxed">Our mission is clear: make the brightest student out of every student, not just the chosen few. BLaiZE is not here to improve education. We're here to rebuild it.</p>
            
            <div className="mt-8">
              <a href="#waitlist" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg">
                Join the Revolution
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default AboutSection;