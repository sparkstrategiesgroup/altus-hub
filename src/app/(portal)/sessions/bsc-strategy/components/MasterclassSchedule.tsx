/**
 * Masterclass Schedule Component
 * Timeline of topics with timestamps and progress tracking
 * Altus design system
 */

'use client';

import { useState, useEffect } from 'react';

interface ScheduleSegment {
  id: string;
  title: string;
  startTime: number; // in minutes
  duration: number; // in minutes
  description: string;
  keyPoints: string[];
}

interface MasterclassScheduleProps {
  segments?: ScheduleSegment[];
  currentTime?: number;
  onSegmentClick?: (segmentId: string) => void;
}

const SEGMENTS: ScheduleSegment[] = [
  {
    id: 'intro',
    title: 'Welcome & Industry Overview',
    startTime: 0,
    duration: 5,
    description: 'Introduction to the BSC industry landscape and session objectives',
    keyPoints: ['Market size and scope', 'Key industry trends', 'Session agenda'],
  },
  {
    id: 'market',
    title: 'Market Dynamics & Trends',
    startTime: 5,
    duration: 8,
    description: 'Current market conditions, growth drivers, and competitive landscape',
    keyPoints: ['$350B+ global market', '3-5% annual growth', 'Consolidation trends', 'Regional variations'],
  },
  {
    id: 'workforce',
    title: 'Workforce Strategy & Challenges',
    startTime: 13,
    duration: 8,
    description: 'Labor shortage solutions, retention strategies, and talent development',
    keyPoints: ['200%+ turnover rates', 'Wage pressure management', 'Skills development programs', 'Retention tactics'],
  },
  {
    id: 'technology',
    title: 'Digital Transformation',
    startTime: 21,
    duration: 8,
    description: 'Technology adoption, automation, and digital tools for competitive advantage',
    keyPoints: ['Proof of service platforms', 'Robotics & automation', 'Data analytics', 'IoT integration'],
  },
  {
    id: 'sustainability',
    title: 'Sustainability & ESG',
    startTime: 29,
    duration: 8,
    description: 'Environmental responsibility, social impact, and ESG initiatives',
    keyPoints: ['Green cleaning practices', 'Carbon footprint tracking', 'Fair labor practices', 'ESG reporting'],
  },
  {
    id: 'growth',
    title: 'Growth Strategy & Action Plan',
    startTime: 37,
    duration: 5,
    description: '90-day action plan and strategic recommendations for growth',
    keyPoints: ['Assessment phase', 'Implementation roadmap', 'Optimization metrics', 'Next steps'],
  },
  {
    id: 'qa',
    title: 'Q&A & Discussion',
    startTime: 42,
    duration: 3,
    description: 'Open discussion and audience questions',
    keyPoints: ['Ask questions', 'Share insights', 'Network with peers'],
  },
];

export default function MasterclassSchedule({
  segments = SEGMENTS,
  currentTime = 0,
  onSegmentClick,
}: MasterclassScheduleProps) {
  const [activeSegment, setActiveSegment] = useState<string>(segments[0]?.id || '');
  const [displayTime, setDisplayTime] = useState(currentTime);

  useEffect(() => {
    setDisplayTime(currentTime);

    // Find active segment based on current time
    const active = segments.find(
      (seg) => currentTime >= seg.startTime && currentTime < seg.startTime + seg.duration
    );
    if (active) {
      setActiveSegment(active.id);
    }
  }, [currentTime, segments]);

  const handleSegmentClick = (segmentId: string) => {
    setActiveSegment(segmentId);
    onSegmentClick?.(segmentId);
  };

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = segments.reduce((sum, seg) => sum + seg.duration, 0);
  const overallProgress = (displayTime / totalDuration) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Overall Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full transition-all duration-1000"
          style={{ width: `${overallProgress}%`, backgroundColor: '#5DADE2' }}
        />
      </div>

      {/* Schedule Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Masterclass Schedule</h3>
        <p className="text-sm text-gray-600">
          Total Duration: {formatTime(totalDuration)} • Current Time: {formatTime(displayTime)}
        </p>
      </div>

      {/* Timeline */}
      <div className="divide-y divide-gray-200">
        {segments.map((segment, idx) => {
          const isActive = activeSegment === segment.id;
          const isCompleted = displayTime > segment.startTime + segment.duration;
          const segmentProgress =
            displayTime > segment.startTime
              ? Math.min(
                  ((displayTime - segment.startTime) / segment.duration) * 100,
                  100
                )
              : 0;

          return (
            <div
              key={segment.id}
              onClick={() => handleSegmentClick(segment.id)}
              className={`p-4 cursor-pointer transition-all ${
                isActive
                  ? 'bg-cyan-50 border-l-4'
                  : isCompleted
                  ? 'bg-green-50/30 hover:bg-gray-50'
                  : 'hover:bg-gray-50'
              }`}
              style={{
                borderLeftColor: isActive ? '#5DADE2' : 'transparent',
              }}
            >
              <div className="flex items-start gap-4">
                {/* Segment Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{
                    backgroundColor: isCompleted ? '#10B981' : isActive ? '#5DADE2' : '#D1D5DB',
                  }}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>

                {/* Segment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{segment.title}</h4>
                    <span className="text-xs font-semibold px-2 py-1 rounded text-white" style={{ backgroundColor: '#5DADE2' }}>
                      {formatTime(segment.startTime)} - {formatTime(segment.startTime + segment.duration)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{segment.description}</p>

                  {/* Key Points */}
                  <div className="flex flex-wrap gap-2">
                    {segment.keyPoints.map((point, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {point}
                      </span>
                    ))}
                  </div>

                  {/* Segment Progress */}
                  {isActive && (
                    <div className="mt-3">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{ width: `${segmentProgress}%`, backgroundColor: '#5DADE2' }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {Math.round(segmentProgress)}% complete
                      </p>
                    </div>
                  )}
                </div>

                {/* Duration Badge */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs font-semibold text-gray-600">{segment.duration} min</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-600">Completed</p>
          <p className="text-lg font-bold text-green-600">
            {segments.filter((s) => displayTime > s.startTime + s.duration).length}/{segments.length}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Current</p>
          <p className="text-lg font-bold" style={{ color: '#5DADE2' }}>
            {activeSegment ? segments.find((s) => s.id === activeSegment)?.title : 'Not started'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Remaining</p>
          <p className="text-lg font-bold text-orange-600">
            {formatTime(Math.max(0, totalDuration - displayTime))}
          </p>
        </div>
      </div>
    </div>
  );
}
