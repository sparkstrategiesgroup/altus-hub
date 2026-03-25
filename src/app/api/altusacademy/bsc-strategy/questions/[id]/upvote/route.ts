/**
 * API Route: POST Upvote Question for BSC Strategy Masterclass
 * Route: /api/altusacademy/bsc-strategy/questions/[id]/upvote
 * Requires authentication
 * Prevents duplicate upvotes per user
 */

import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with Supabase in production
const upvotesDB: Map<string, Set<string>> = new Map();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const questionId = id;
    const userEmail = session.user.email;

    // Check if user already upvoted
    if (!upvotesDB.has(questionId)) {
      upvotesDB.set(questionId, new Set());
    }

    const upvotes = upvotesDB.get(questionId)!;

    if (upvotes.has(userEmail)) {
      return NextResponse.json({ error: 'Already upvoted' }, { status: 400 });
    }

    upvotes.add(userEmail);

    // In production, update Supabase
    // const { data, error } = await supabase
    //   .from('bsc_strategy_upvotes')
    //   .insert([{ question_id: questionId, user_email: userEmail }]);

    // Return updated question
    const updatedQuestion = {
      id: questionId,
      upvotes: upvotes.size,
      // ... other fields
    };

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error('POST /api/altusacademy/bsc-strategy/questions/[id]/upvote:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
