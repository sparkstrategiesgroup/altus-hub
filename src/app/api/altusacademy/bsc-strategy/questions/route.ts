/**
 * API Route: GET/POST Questions for BSC Strategy Masterclass
 * Route: /api/altusacademy/bsc-strategy/questions
 * Requires authentication
 * Uses Supabase for persistence
 */

import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with Supabase in production
const questionsDB: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In production, fetch from Supabase
    // const { data, error } = await supabase
    //   .from('bsc_strategy_questions')
    //   .select('*')
    //   .order('upvotes', { ascending: false })
    //   .order('created_at', { ascending: false });

    return NextResponse.json(questionsDB.sort((a, b) => b.upvotes - a.upvotes));
  } catch (error) {
    console.error('GET /api/altusacademy/bsc-strategy/questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { question, category, userEmail, userName } = body;

    if (!question || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create new question
    const newQuestion = {
      id: Date.now().toString(),
      question,
      category,
      user_email: userEmail,
      user_name: userName,
      upvotes: 0,
      answered: false,
      answer: null,
      created_at: new Date().toISOString(),
    };

    // In production, insert into Supabase
    // const { data, error } = await supabase
    //   .from('bsc_strategy_questions')
    //   .insert([newQuestion])
    //   .select()
    //   .single();

    questionsDB.push(newQuestion);

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error('POST /api/altusacademy/bsc-strategy/questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
