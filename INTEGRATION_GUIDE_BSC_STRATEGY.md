# BSC Strategy Session Integration Guide

## Overview

This guide walks you through integrating the BSC Industry Strategy Session into your Altus Collective platform. The session is members-only, includes a 45-minute timer, PDF export, and Q&A system.

## What's Included

### Components
- **SessionTimer.tsx** — 45-minute countdown with visual progress bar
- **PDFExportButton.tsx** — Altus-branded PDF export
- **QASection.tsx** — Q&A system with Supabase integration

### Pages
- **page.tsx** — Main BSC strategy session page with all content sections

### API Routes
- **GET/POST /api/sessions/bsc-strategy/questions** — Manage questions
- **POST /api/sessions/bsc-strategy/questions/[id]/upvote** — Upvote questions

## Installation Steps

### 1. Install Dependencies

```bash
npm install html2pdf.js
```

### 2. File Structure

The files are already placed in the correct locations:

```
src/
├── app/
│   ├── (portal)/
│   │   └── sessions/
│   │       └── bsc-strategy/
│   │           ├── page.tsx
│   │           └── components/
│   │               ├── SessionTimer.tsx
│   │               ├── PDFExportButton.tsx
│   │               └── QASection.tsx
│   └── api/
│       └── sessions/
│           └── bsc-strategy/
│               └── questions/
│                   ├── route.ts
│                   └── [id]/
│                       └── upvote/
│                           └── route.ts
```

### 3. Database Setup (Supabase)

Run the following SQL migration to create the Q&A tables:

```sql
-- Create questions table
CREATE TABLE IF NOT EXISTS bsc_strategy_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_name VARCHAR(255),
  upvotes INTEGER DEFAULT 0,
  answered BOOLEAN DEFAULT FALSE,
  answer TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create upvotes table
CREATE TABLE IF NOT EXISTS bsc_strategy_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES bsc_strategy_questions(id) ON DELETE CASCADE,
  user_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(question_id, user_email)
);

-- Create indexes
CREATE INDEX idx_questions_category ON bsc_strategy_questions(category);
CREATE INDEX idx_questions_created ON bsc_strategy_questions(created_at DESC);
CREATE INDEX idx_questions_upvotes ON bsc_strategy_questions(upvotes DESC);

-- Enable RLS
ALTER TABLE bsc_strategy_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bsc_strategy_upvotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read questions" ON bsc_strategy_questions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert questions" ON bsc_strategy_questions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Anyone can read upvotes" ON bsc_strategy_upvotes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upvote" ON bsc_strategy_upvotes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### 4. Update API Routes (Production)

Replace the mock database in the API routes with Supabase:

**`src/app/api/sessions/bsc-strategy/questions/route.ts`**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('bsc_strategy_questions')
      .select('*')
      .order('upvotes', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching questions:', error);
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

    const { data, error } = await supabase
      .from('bsc_strategy_questions')
      .insert([
        {
          question,
          category,
          user_email: userEmail,
          user_name: userName,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### 5. Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 6. Test the Integration

1. Navigate to `/sessions/bsc-strategy` (members-only)
2. Verify the 45-minute timer appears in the top-right
3. Test the PDF export button
4. Submit a test question via the Q&A form
5. Verify the question appears in the list

## Design System

All components use Altus design tokens:

- **Accent Color:** #5DADE2 (Cyan)
- **Text Color:** #1A1A1A (Charcoal)
- **Background:** White with gray-50 accents
- **Typography:** Professional sans-serif

## Customization

### Change Session Duration

Edit `SessionTimer.tsx`:

```typescript
<SessionTimer durationMinutes={60} /> // Change 45 to desired minutes
```

### Update Branding

Edit `PDFExportButton.tsx`:

```typescript
brandName="YOUR_BRAND_NAME"
accentColor="#YOUR_COLOR"
```

### Add More Content Sections

Add new sections to `page.tsx` following the existing pattern:

```typescript
<section id="new-section" className="py-16 bg-white">
  {/* Your content */}
</section>
```

## Troubleshooting

### Q&A Not Loading
- Check Supabase connection in `.env.local`
- Verify RLS policies are enabled
- Check browser console for errors

### PDF Export Not Working
- Ensure `html2pdf.js` is installed
- Check that the DOM element is properly rendered
- Verify no CSP violations in browser console

### Timer Not Appearing
- Check z-index conflicts with other fixed elements
- Verify SessionTimer component is imported in page.tsx
- Check browser console for React errors

## Next Steps

1. **Customize content** — Update the five strategic pillars with your specific insights
2. **Add analytics** — Track session engagement and Q&A metrics
3. **Integrate with events** — Link strategy session to your events calendar
4. **Create follow-ups** — Build email sequences for post-session engagement

## Support

For issues or questions, refer to:
- Altus Collective documentation
- Next.js App Router docs
- Supabase documentation
