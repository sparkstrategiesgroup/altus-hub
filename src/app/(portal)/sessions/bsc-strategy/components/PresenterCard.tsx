/**
 * Presenter Card Component - BSC Strategy Masterclass
 * Displays presenter bio, credentials, and expertise
 * Altus design system
 */

'use client';

interface PresenterCardProps {
  name: string;
  title: string;
  company: string;
  bio: string;
  expertise: string[];
  image?: string;
  email?: string;
  linkedin?: string;
}

export default function PresenterCard({
  name,
  title,
  company,
  bio,
  expertise,
  image,
  email,
  linkedin,
}: PresenterCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Presenter Header */}
        <div className="flex gap-4 mb-6">
          {image && (
            <div className="flex-shrink-0">
              <div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold text-xl"
                style={{
                  backgroundImage: image ? `url(${image})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {!image && name.charAt(0)}
              </div>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-sm font-semibold" style={{ color: '#5DADE2' }}>
              {title}
            </p>
            <p className="text-sm text-gray-600">{company}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed text-sm">{bio}</p>
        </div>

        {/* Expertise */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Areas of Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {expertise.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-semibold text-white rounded-full"
                style={{ backgroundColor: '#5DADE2' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Links */}
        {(email || linkedin) && (
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: '#5DADE2' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: '#5DADE2' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
