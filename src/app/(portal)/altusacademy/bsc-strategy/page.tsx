/**
 * BSC Strategy Masterclass Page
 * Route: /altusacademy/bsc-strategy
 * Professional presentation-style masterclass with presenter info, schedule, and Q&A
 * Members-only access via NextAuth.js
 */

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import SessionTimer from './components/SessionTimer';
import PDFExportButton from './components/PDFExportButton';
import QASection from './components/QASection';
import PresenterCard from './components/PresenterCard';
import MasterclassSchedule from './components/MasterclassSchedule';

export const metadata = {
  title: 'BSC Strategy Masterclass | Altus Academy',
  description: 'Professional masterclass on Building Service Contractor industry strategy with expert insights and Q&A',
};

export default async function BSCStrategyMasterclassPage() {
  const session = await getServerSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Masterclass Header */}
      <section
        className="relative pt-24 pb-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D3E50 100%)',
        }}
      >
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Main Title */}
            <div className="md:col-span-2">
              <div className="inline-block px-4 py-2 bg-cyan-400/20 rounded-full mb-4">
                <span className="text-cyan-400 text-sm font-semibold tracking-widest">ALTUS ACADEMY</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Building Service Contractor Strategy
              </h1>
              <p className="text-xl text-gray-300 mb-2">
                Industry Insights & Strategic Framework for 2025
              </p>
              <p className="text-gray-400 text-sm">
                45-minute masterclass • Expert-led • Members-only
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3">
              <PDFExportButton
                fileName="BSC-Strategy-Masterclass-Altus.pdf"
                brandName="ALTUS COLLECTIVE"
                accentColor="#5DADE2"
              />
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-xs text-gray-400 mb-2">SESSION DETAILS</p>
                <div className="space-y-1 text-sm text-white">
                  <p>📅 Duration: 45 minutes</p>
                  <p>🎯 Format: Masterclass</p>
                  <p>💬 Q&A Included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Session Timer Widget */}
      <SessionTimer durationMinutes={45} />

      {/* Main Content Area */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Schedule & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Schedule Timeline */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Masterclass Timeline</h3>
              <MasterclassSchedule currentTime={0} />
            </div>

            {/* Presenter Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Expert Presenter</h3>
              <PresenterCard
                name="Dr. James Mitchell"
                title="BSC Industry Strategist"
                company="Strategic Insights Group"
                bio="20+ years of experience in facility management and building services. Expert in market consolidation, workforce optimization, and digital transformation strategies for BSC companies."
                expertise={[
                  'Market Analysis',
                  'Workforce Strategy',
                  'Digital Transformation',
                  'M&A Advisory',
                  'ESG Implementation',
                ]}
                email="james.mitchell@strategicinsights.com"
                linkedin="https://linkedin.com/in/jamesmitchell"
              />
            </div>
          </div>

          {/* Right Content Area - Masterclass Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Objectives */}
            <section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-8 border border-cyan-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Current market dynamics and growth opportunities',
                  'Strategies to address workforce challenges',
                  'Digital transformation roadmap for BSCs',
                  'Sustainability and ESG best practices',
                  'Competitive positioning strategies',
                  '90-day action plan for implementation',
                ].map((objective, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: '#5DADE2' }}>
                      ✓
                    </div>
                    <p className="text-gray-700 font-medium">{objective}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Masterclass Sections */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Masterclass Content</h2>

              {/* Section 1: Market Dynamics */}
              <div className="mb-8 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-cyan-50 to-transparent border-b border-gray-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: '#5DADE2' }}>
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Market Dynamics & Trends</h3>
                    <p className="text-sm text-gray-600">Minutes 5-13 • 8 minutes</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    Understanding the current BSC industry landscape, market size, growth drivers, and competitive dynamics shaping the industry in 2025.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="font-semibold text-gray-900 mb-2">Market Size</p>
                      <p className="text-sm text-gray-600">$350+ billion global market with 3-5% annual growth</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="font-semibold text-gray-900 mb-2">Key Drivers</p>
                      <p className="text-sm text-gray-600">Consolidation, sustainability, technology, and outsourcing trends</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Workforce Strategy */}
              <div className="mb-8 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-cyan-50 to-transparent border-b border-gray-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: '#5DADE2' }}>
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Workforce Strategy & Challenges</h3>
                    <p className="text-sm text-gray-600">Minutes 13-21 • 8 minutes</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    Addressing labor shortages, retention strategies, wage pressures, and building a sustainable workforce for long-term success.
                  </p>
                  <div className="space-y-3">
                    {[
                      { challenge: 'Labor Shortage', solution: '200%+ turnover rates require innovative recruitment and retention strategies' },
                      { challenge: 'Wage Pressure', solution: 'Rising labor costs demand operational efficiency and automation' },
                      { challenge: 'Skills Gap', solution: 'Investment in training programs and career development paths' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#5DADE2' }} />
                        <div>
                          <p className="font-semibold text-gray-900">{item.challenge}</p>
                          <p className="text-sm text-gray-600">{item.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Digital Transformation */}
              <div className="mb-8 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-cyan-50 to-transparent border-b border-gray-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: '#5DADE2' }}>
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Digital Transformation</h3>
                    <p className="text-sm text-gray-600">Minutes 21-29 • 8 minutes</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    Technology adoption, automation opportunities, and digital tools that provide competitive advantage in the modern BSC landscape.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Proof of Service Platforms',
                      'Robotics & Automation',
                      'Data Analytics & Insights',
                      'IoT Integration',
                      'Mobile-First Operations',
                      'AI-Powered Scheduling',
                    ].map((tech, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span style={{ color: '#5DADE2' }}>→</span>
                        <span className="text-sm font-medium text-gray-700">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 4: Sustainability & ESG */}
              <div className="mb-8 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-cyan-50 to-transparent border-b border-gray-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: '#5DADE2' }}>
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Sustainability & ESG</h3>
                    <p className="text-sm text-gray-600">Minutes 29-37 • 8 minutes</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    Environmental responsibility, social impact initiatives, and ESG strategies that attract clients and top talent.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-900 mb-2">Environmental</p>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Green cleaning products</li>
                        <li>• Carbon footprint tracking</li>
                        <li>• Waste reduction programs</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-900 mb-2">Social</p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Fair labor practices</li>
                        <li>• Workforce development</li>
                        <li>• Community engagement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Growth Strategy */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-cyan-50 to-transparent border-b border-gray-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: '#5DADE2' }}>
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Growth Strategy & Action Plan</h3>
                    <p className="text-sm text-gray-600">Minutes 37-42 • 5 minutes</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    90-day action plan and strategic recommendations for implementing growth initiatives and competitive advantages.
                  </p>
                  <div className="space-y-3">
                    {[
                      { phase: 'Days 1-30', title: 'Assessment', items: ['Audit operations', 'Identify gaps', 'Set KPIs'] },
                      { phase: 'Days 31-60', title: 'Implementation', items: ['Deploy technology', 'Train team', 'Optimize processes'] },
                      { phase: 'Days 61-90', title: 'Optimization', items: ['Measure results', 'Refine approach', 'Scale winners'] },
                    ].map((period, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 rounded text-xs font-bold text-white" style={{ backgroundColor: '#5DADE2' }}>
                            {period.phase}
                          </span>
                          <p className="font-semibold text-gray-900">{period.title}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {period.items.map((item, i) => (
                            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways</h3>
              <ul className="space-y-3">
                {[
                  'The BSC industry is consolidating with significant M&A activity and technology-driven efficiency gains',
                  'Workforce challenges require innovative solutions including automation, training, and competitive compensation',
                  'Digital transformation is no longer optional—it\'s essential for competitive survival',
                  'Sustainability and ESG are becoming client requirements and talent attractors',
                  'Successful companies will combine market insights with strategic execution and continuous optimization',
                ].map((takeaway, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: '#5DADE2' }}>
                      {idx + 1}
                    </span>
                    <p className="text-gray-700">{takeaway}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Q&A Section */}
      <QASection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-3">About Altus Academy</h4>
              <p className="text-gray-400 text-sm">
                Expert-led masterclasses and strategic learning for industry leaders
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Masterclass Info</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Duration: 45 minutes</p>
                <p>Format: Expert-led</p>
                <p>Q&A: Included</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">Resources</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Download PDF</p>
                <p>Q&A Archive</p>
                <p>Share with team</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">Connect</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Email: academy@altuscollective.us</p>
                <p>Web: altuscollective.us</p>
                <p>Members-only content</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Altus Collective. All rights reserved.</p>
            <p className="mt-2">Professional Strategy Sessions for Industry Leaders</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
