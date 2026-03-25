/**
 * Q&A Section Component - BSC Strategy Session
 * Members can submit questions, upvote, and filter by category
 * Supabase integration for persistence
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Question {
  id: string;
  question: string;
  category: string;
  user_email: string;
  user_name?: string;
  upvotes: number;
  answered: boolean;
  answer?: string;
  created_at: string;
}

const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'market', label: 'Market Dynamics' },
  { id: 'workforce', label: 'Workforce' },
  { id: 'technology', label: 'Technology' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'growth', label: 'Growth Strategy' },
];

export default function QASection() {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/sessions/bsc-strategy/questions');
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Submit question
  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !session?.user?.email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/sessions/bsc-strategy/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newQuestion,
          category: selectedCategory,
          userEmail: session.user.email,
          userName: session.user.name,
        }),
      });

      if (response.ok) {
        const createdQuestion = await response.json();
        setQuestions([createdQuestion, ...questions]);
        setNewQuestion('');
        setSelectedCategory('general');
      }
    } catch (error) {
      console.error('Failed to submit question:', error);
      alert('Failed to submit question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upvote question
  const handleUpvote = async (questionId: string) => {
    try {
      const response = await fetch(`/api/sessions/bsc-strategy/questions/${questionId}/upvote`, {
        method: 'POST',
      });

      if (response.ok) {
        const updated = await response.json();
        setQuestions(questions.map((q) => (q.id === questionId ? updated : q)));
      }
    } catch (error) {
      console.error('Failed to upvote question:', error);
    }
  };

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    if (filter === 'answered') return q.answered;
    if (filter === 'unanswered') return !q.answered;
    return true;
  });

  return (
    <section id="qa" className="py-16 bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
          Q&A Session
        </h2>
        <p className="text-gray-600 mb-8">Ask questions and learn from industry experts</p>

        {/* Question Submission Form */}
        {session?.user && (
          <form onSubmit={handleSubmitQuestion} className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
            <label className="block text-sm font-semibold mb-2" style={{ color: '#1A1A1A' }}>
              Ask a Question
            </label>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="What would you like to know about the BSC industry strategy?"
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#5DADE2' } as React.CSSProperties}
              rows={3}
            />

            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#5DADE2' } as React.CSSProperties}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !newQuestion.trim()}
                className="px-6 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: '#5DADE2' }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {(['all', 'answered', 'unanswered'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-semibold transition-colors ${
                filter === f
                  ? 'border-b-2'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                borderBottomColor: filter === f ? '#5DADE2' : 'transparent',
                color: filter === f ? '#5DADE2' : undefined,
              }}
            >
              {f === 'all' ? 'All Questions' : f === 'answered' ? 'Answered' : 'Unanswered'}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-gray-600">Loading questions...</p>
          ) : filteredQuestions.length === 0 ? (
            <p className="text-gray-600">No questions yet. Be the first to ask!</p>
          ) : (
            filteredQuestions.map((question) => (
              <div key={question.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded text-white"
                        style={{ backgroundColor: '#5DADE2' }}
                      >
                        {CATEGORIES.find((c) => c.id === question.category)?.label}
                      </span>
                      {question.answered && (
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700">
                          Answered
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-gray-900">{question.question}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      by {question.user_name || question.user_email}
                    </p>
                  </div>
                  <button
                    onClick={() => handleUpvote(question.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span style={{ color: '#5DADE2' }}>👍</span>
                    <span className="text-sm font-semibold">{question.upvotes}</span>
                  </button>
                </div>

                {question.answered && question.answer && (
                  <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-400 rounded">
                    <p className="text-sm font-semibold text-green-900">Answer:</p>
                    <p className="text-sm text-green-800 mt-1">{question.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
