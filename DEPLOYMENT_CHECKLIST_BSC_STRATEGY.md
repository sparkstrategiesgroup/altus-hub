# BSC Strategy Session - Deployment Checklist

## Pre-Deployment

- [ ] All components created and placed in correct directories
- [ ] Dependencies installed (`npm install html2pdf.js`)
- [ ] TypeScript compilation passes (`npm run build`)
- [ ] No console errors in development (`npm run dev`)

## Database Setup

- [ ] Supabase project created and configured
- [ ] SQL migration executed successfully
- [ ] Tables created: `bsc_strategy_questions`, `bsc_strategy_upvotes`
- [ ] Indexes created for performance
- [ ] RLS policies enabled and tested
- [ ] Service role key generated and stored securely

## Environment Configuration

- [ ] `.env.local` updated with Supabase credentials
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set correctly
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set correctly
- [ ] NextAuth.js configuration verified
- [ ] Session provider working correctly

## Component Testing

### SessionTimer
- [ ] Timer displays 45:00 on initial load
- [ ] Start button begins countdown
- [ ] Pause button pauses countdown
- [ ] Reset button resets to 45:00
- [ ] Progress bar updates smoothly
- [ ] Orange alert appears at 5 minutes
- [ ] Green alert appears at 1 minute
- [ ] Session end alert displays at 0:00

### PDFExportButton
- [ ] Button renders with Altus branding
- [ ] Clicking generates PDF without errors
- [ ] PDF contains Altus logo and cyan accents
- [ ] PDF filename is correct
- [ ] PDF downloads to user's device
- [ ] PDF displays properly in PDF reader

### QASection
- [ ] Q&A form appears for authenticated users
- [ ] Question submission works
- [ ] Questions appear in list after submission
- [ ] Category filter works correctly
- [ ] Answered/Unanswered filter works
- [ ] Upvote button increments count
- [ ] User cannot upvote same question twice
- [ ] Questions sorted by upvotes correctly

### Main Page
- [ ] Hero section displays correctly
- [ ] All five content sections render
- [ ] Navigation links scroll to sections
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Footer displays correctly
- [ ] No layout shifts or visual issues

## API Testing

### GET /api/sessions/bsc-strategy/questions
- [ ] Returns 401 for unauthenticated users
- [ ] Returns questions array for authenticated users
- [ ] Questions sorted by upvotes descending
- [ ] Response time < 500ms

### POST /api/sessions/bsc-strategy/questions
- [ ] Returns 401 for unauthenticated users
- [ ] Creates question with valid data
- [ ] Returns 400 for missing fields
- [ ] Question appears in GET response
- [ ] User email stored correctly

### POST /api/sessions/bsc-strategy/questions/[id]/upvote
- [ ] Returns 401 for unauthenticated users
- [ ] Increments upvote count
- [ ] Returns 400 if user already upvoted
- [ ] Prevents duplicate upvotes

## Security Verification

- [ ] Authentication required for all protected routes
- [ ] RLS policies prevent unauthorized data access
- [ ] No sensitive data exposed in client-side code
- [ ] CORS headers configured correctly
- [ ] Rate limiting considered for API routes
- [ ] Input validation on all API endpoints
- [ ] XSS protection enabled
- [ ] CSRF tokens verified

## Performance Optimization

- [ ] Page load time < 2.5s (LCP)
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] First Input Delay (FID) < 100ms
- [ ] Images optimized and lazy-loaded
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] No unused dependencies

## Accessibility

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Alt text on all images
- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Screen reader tested

## Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Production Deployment

- [ ] Environment variables set in Vercel/hosting
- [ ] Database backups configured
- [ ] Error logging configured (Sentry/similar)
- [ ] Analytics configured
- [ ] CDN configured for static assets
- [ ] SSL certificate valid
- [ ] Domain DNS configured
- [ ] Monitoring alerts set up

## Post-Deployment

- [ ] Verify page accessible at production URL
- [ ] Test all features on production
- [ ] Monitor error logs for issues
- [ ] Check analytics for traffic
- [ ] Gather user feedback
- [ ] Document any issues found
- [ ] Plan follow-up improvements

## Rollback Plan

- [ ] Previous version tagged in git
- [ ] Database migration rollback tested
- [ ] Deployment can be reverted if needed
- [ ] Communication plan for issues

## Sign-Off

- [ ] Product Owner approval
- [ ] QA sign-off
- [ ] Security review complete
- [ ] Performance review complete
- [ ] Ready for production deployment

---

**Deployment Date:** _______________

**Deployed By:** _______________

**Notes:** _______________________________________________________________
