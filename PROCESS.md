# businessagents.io — Process & System

**Framework source:** resources.founderlabs.io

---

## 0. THE LOOP (Never Stop)

```
    ┌─────────────────────────────────────┐
    │                                     │
    ▼                                     │
┌───────────┐    ┌───────────┐    ┌───────────┐
│   TEST    │───▶│  DOCUMENT │───▶│   LEARN   │
│assumption │    │  results  │    │ + add new │
└───────────┘    └───────────┘    │assumptions│
                                  └─────┬─────┘
                                        │
                                        ▼
                                  ┌───────────┐
                                  │  REPEAT   │
                                  │until goal │
                                  └───────────┘
```

**This is not a one-time process. This is THE process.**

Each test reveals:
- What worked / didn't work
- Why (hypothesis)
- New questions (new assumptions to test)

### Learnings Log

| Date | Test | Result | Learning | New Assumption Added |
|------|------|--------|----------|---------------------|
| 2026-01-24 | Identify audience (Reddit) | ✅ 4 subreddits with 500k-5M subs | Audience exists and is findable | Can we CONNECT with them? (A3) |
| | | | | |

*Add every test result here. This is the source of truth.*

---

## 1. THE FUNNEL

```
Traffic Sources (SEO, Social, Reddit)
         ↓
   Landing Pages (directory, guides)
         ↓
   Engagement (time on site, pages/visit)
         ↓
   Capture (checklist download, submit form)
         ↓
   Monetization (affiliate clicks, eventually: ads, sponsorships)
```

### Metrics to Track Weekly

| Stage | Metric | Target | How to Measure |
|-------|--------|--------|----------------|
| Traffic | Visitors | 100/week first | Cloudflare Analytics |
| Landing | Bounce rate | <60% | Cloudflare Analytics |
| Engagement | Pages/visit | >2 | Cloudflare Analytics |
| Capture | Email signups | 5/week | Formsubmit notifications |
| Monetization | Affiliate clicks | Track | Add UTM to links |

---

## 2. CRITICAL ASSUMPTIONS TO TEST

**These must be validated with REAL DATA before scaling.**

### Assumption 1: Niche Size (Market)
**Question:** Is there enough money being spent on solving "which AI tool should I use?" to support this business?

**How to test:**
- Search volume for "best AI tools for small business" and related terms
- Affiliate payouts for tools in the space (indicates revenue potential)
- Count competitors/alternatives (more = validated market)
- Check if companies are paying for ads on these keywords

**Success criteria:** 
- 1000+ monthly searches for core keywords
- Affiliate payouts of $50+ per conversion exist
- 5+ competitors doing similar things

**Test status:** PARTIALLY TESTED (2026-01-24)
**Observations:**
- theresanaiforthat.com exists as major competitor (validates market)
- Multiple articles rank for "AI tools for small business" (content demand exists)
- Tools in directory have affiliate programs paying $50-200+ per signup
- At least 5+ direct competitors (futurepedia.io, theresanaiforthat.com, aitoolsdirectory.com, etc.)

**Result:** Market EXISTS but need to validate SIZE with real traffic data
**Next step:** Get actual traffic estimates for competitors (Similarweb/Semrush access needed)

---

### Assumption 2: Audience Identification
**Question:** Can we clearly identify who these people are and where they congregate?

**How to test:**
- List specific subreddits with subscriber counts
- List specific Twitter accounts they follow
- List specific newsletters they read
- Find 10 real people who fit the profile

**Success criteria:**
- 3+ subreddits with 50k+ subscribers where our audience is active
- 5+ Twitter accounts with 10k+ followers our audience follows
- Can name 10 specific people by handle who fit

**Test status:** TESTED (2026-01-24)
**Result:** ✅ SUCCESS CRITERIA MET (Reddit)

**Real data - Subreddits:**
| Subreddit | Subscribers | Relevance |
|-----------|-------------|-----------|
| r/smallbusiness | 2,367,809 | Core audience |
| r/entrepreneur | 5,049,339 | Broader, includes our ICP |
| r/startups | 1,979,257 | Early-stage founders |
| r/SaaS | 542,227 | SaaS founders (subset) |

**Twitter/X - Still needs testing:**
- [ ] Find 5+ accounts with 10k+ followers our audience follows
- [ ] Name 10 specific people who fit profile

**Next step:** Test actual CONNECTION (Assumption 3) - can we get responses?

---

### Assumption 3: Audience Connection ⚠️ CRITICAL - REQUIRES REAL ACTION
**Question:** Can we actually reach this audience and get their attention?

**⚠️ THIS CANNOT BE TESTED BY RESEARCH. REQUIRES REAL POSTS/ACTIONS.**

**How to test (REAL ACTIONS ONLY):**
1. Post 5 helpful comments on r/smallbusiness → measure upvotes/responses
2. Post 2 Twitter threads from @PepperBotts_AI → measure engagement
3. DM 10 people who fit profile → measure reply rate

**Success criteria:**
- Reddit: 3+ comments get 5+ upvotes within 48 hours
- Twitter: 1+ thread gets 10+ likes or 5+ retweets within 48 hours
- DMs: 3+ replies out of 10 (30% response rate)

**If criteria NOT met:** Pivot message, try different angle, or reconsider niche

**Test status:** NOT TESTED - WAITING FOR MAIN AGENT TO EXECUTE
**Result:** [TBD]
**Actual data:** [TBD]

**Content ready for test:**
- Reddit templates: `/root/clawd/content/reddit-responses-businessagents.md`
- Twitter threads: `/root/clawd/content/twitter-threads-businessagents.md`

---

### Assumption 4: Value Proposition Resonance
**Question:** Does "no hype, just what works" actually resonate?

**How to test:**
- A/B test headlines on landing page
- Track which messages get engagement on social
- Ask directly in conversations

**Success criteria:**
- One headline variant converts 2x better than another
- Specific phrases get quoted/shared back

**Test status:** NOT TESTED
**Result:** [TBD]

---

## CURRENT HYPOTHESIS (to be validated)

**Who we serve:** Small business owners (1-50 employees) who are overwhelmed by AI tool options and want honest, curated recommendations.

**Self-Selection Filter:**
- Demographic: Small business owners, solopreneurs, bootstrapped founders
- Psychographic: Overwhelmed by AI hype, want practical not cutting-edge, budget-conscious
- Identity: "Small business owner" not "startup founder", practical not technical

**Value Prop:** "No hype. No fluff. Just what works."

⚠️ **ALL OF THE ABOVE ARE ASSUMPTIONS UNTIL TESTED**

---

## 3. WEEKLY REVIEW PROCESS (Every Friday, 30 min)

### Questions to Answer:
1. **What changed?** (traffic up/down/flat, signups, clicks)
2. **Why did it change?** (what did we do differently?)
3. **Where's the bottleneck?** (which funnel stage has biggest drop-off vs expected?)
4. **What's ONE thing to test next week?**

### Review Template:

```markdown
## Week of [DATE]

### Numbers
- Traffic: [X] visitors
- Bounce rate: [X]%
- Pages/visit: [X]
- Email signups: [X]
- Affiliate clicks: [X]

### What Changed
[Notes on changes from last week]

### Bottleneck Analysis
Biggest drop-off: [STAGE]
Hypothesis why: [THEORY]

### This Week's Test
Test: [DESCRIPTION]
Metric to watch: [SPECIFIC METRIC]
Success criteria: [WHAT GOOD LOOKS LIKE]

### Last Week's Test Results
Test: [WHAT WE TESTED]
Result: [OUTCOME]
Learning: [WHAT WE LEARNED]
Decision: [CONTINUE / STOP / PIVOT]
```

---

## 4. TESTING FRAMEWORK

### How to Test
1. **One variable at a time** - Don't test headline AND CTA simultaneously
2. **30-100 conversions** before deciding - Need enough data
3. **Reversible decisions** - Can always change back
4. **Speed over perfection** - Wrong decisions auto-correct

### Test Ideas Queue

| Priority | Test | Hypothesis | Metric | Status |
|----------|------|------------|--------|--------|
| 1 | Reddit value-first comments | Helpful replies drive traffic | Referral traffic | Not started |
| 2 | Twitter thread launch | Curated content gets engagement | Clicks to site | Not started |
| 3 | Checklist page CTA variations | Different headlines convert better | Email signups | Not started |
| 4 | Add more comparison pages | "X vs Y" searches convert well | Organic traffic | Not started |
| 5 | Individual tool pages | Long-tail SEO | Organic traffic | Not started |

### Current Test (Week 1)
**Test:** Distribution via Reddit and Twitter
**Hypothesis:** Value-first content in communities drives qualified traffic
**Metric:** Referral traffic from social
**Duration:** 1 week
**Success:** >50 visitors from social sources

---

## 5. CONTENT PRODUCTION SYSTEM

### Types of Content (by purpose)

| Type | Purpose | Frequency | Example |
|------|---------|-----------|---------|
| Category Guide | SEO + Authority | 1x per category | /support-tools |
| Comparison | High-intent SEO | 2/month | /apollo-vs-clay |
| Tool Update | Freshness | When tools change | Update pricing |
| Lead Magnet | Email capture | 1 active | /checklist |

### Content Checklist (before publishing)
- [ ] Title includes target keyword
- [ ] Meta description compelling + <160 chars
- [ ] H1 matches search intent
- [ ] Internal links to related pages
- [ ] External links to tool websites
- [ ] Mobile responsive
- [ ] Page loads fast
- [ ] Added to sitemap

---

## 6. DISTRIBUTION SYSTEM

### Channels & Frequency

| Channel | Frequency | Content Type | Owner |
|---------|-----------|--------------|-------|
| Reddit (r/smallbusiness) | 3x/week | Helpful comments | Main agent |
| Twitter (@PepperBotts_AI) | Daily | Threads, tips | Main agent |
| SEO | Ongoing | New pages | Researcher |

### Reddit Rules
1. Be genuinely helpful first
2. Only mention site when directly relevant
3. Never spam the same response
4. Engage with follow-ups

### Twitter Rules
1. Lead with value, not promotion
2. Threads perform better than single tweets
3. Engage with replies
4. Track which topics resonate

---

## 7. MONETIZATION ROADMAP

### Phase 1: Foundation (Current)
- Build traffic through content + distribution
- Capture emails via checklist
- Track affiliate clicks (not optimized yet)

### Phase 2: Affiliate Revenue (When traffic >500/week)
- Apply to affiliate programs (Jasper, Apollo, etc.)
- Add affiliate links to high-traffic pages
- Track conversion by tool

### Phase 3: Sponsorship (When traffic >2000/week)
- "Featured Tool" placements
- Newsletter sponsorships
- Review sponsorships (disclosed)

### Phase 4: Premium (When email list >1000)
- Premium directory features
- Detailed comparison reports
- Consulting/advisory

---

## 8. DECISION LOG

Track major decisions for learning:

| Date | Decision | Reasoning | Outcome |
|------|----------|-----------|---------|
| 2026-01-24 | Launch with 21 tools | Start focused, expand based on demand | TBD |
| 2026-01-24 | 4 category guides | Cover main use cases, SEO value | TBD |
| 2026-01-24 | Lead magnet checklist | Email capture for future monetization | TBD |

---

## WEEKLY COMMITMENTS

**This Week (2026-01-24 to 2026-01-31):**

### Priority 1: Test Assumption 3 (Audience Connection)
1. [ ] Post 5 helpful Reddit comments → Track upvotes after 48h
2. [ ] Post 2 Twitter threads → Track engagement after 48h
3. [ ] Record ACTUAL numbers, not guesses

### Priority 2: Operations
4. [ ] Register for Ant Media hackathon (deadline TOMORROW)
5. [ ] Set up Cloudflare Analytics tracking
6. [ ] First weekly review on Friday

### Success Criteria for This Week
- Reddit: 3+ comments with 5+ upvotes = VALID assumption
- Twitter: 1+ thread with 10+ likes = VALID assumption
- If NOT met: Revisit messaging or niche

### What We'll Learn
- Can we actually connect with this audience?
- Does our value prop resonate?
- Is this worth continuing?

### Possible Outcomes & Next Actions

**If Reddit/Twitter SUCCESS (criteria met):**
- Learning: We CAN connect with this audience
- New assumption to test: Can we convert engagement → site traffic?
- Next test: Track referral traffic from posts

**If Reddit/Twitter FAIL (criteria not met):**
- Learning: Current message doesn't resonate OR wrong channel
- New assumptions to test: 
  - Is the VALUE PROP wrong?
  - Are we in the WRONG communities?
  - Is the CONTENT format wrong?
- Next test: Try different message angle, different subreddit, or different content format

**Either way, we learn something. Document it. Add new assumptions. Test again.**

---

*Review this document every Friday. Update based on learnings.*
