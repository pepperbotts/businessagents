# Tracking Setup for businessagents.io

## Option 1: Cloudflare Web Analytics (Recommended)

### Setup Steps (in Cloudflare Dashboard)
1. Go to dash.cloudflare.com
2. Select businessagents.io zone
3. Click "Web Analytics" in left sidebar
4. Click "Add a site" → enter businessagents.io
5. Copy the JS snippet
6. Add to all HTML pages before </body>

### Snippet Location
Add this to each HTML file:
```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
```

## Option 2: Simple Counter (No-JS)

Using goatcounter.com (free, privacy-friendly):
1. Sign up at goatcounter.com
2. Get tracking code
3. Add to pages

## Metrics to Track

| Metric | Why | How |
|--------|-----|-----|
| Page views | Overall traffic | Cloudflare Analytics |
| Unique visitors | True reach | Cloudflare Analytics |
| Top pages | What content works | Cloudflare Analytics |
| Referrers | Where traffic comes from | Cloudflare Analytics |
| Bounce rate | Engagement quality | Cloudflare Analytics |
| Form submissions | Email capture | Formsubmit email count |
| Affiliate clicks | Revenue potential | UTM params + redirects |

## Affiliate Link Tracking

When adding affiliate links, use format:
```
https://affiliate.com/signup?ref=businessagents&utm_source=businessagents&utm_medium=directory&utm_campaign=tool-name
```

This lets us track which tools get clicks.

## Weekly Review Data Points

Every Friday, capture:
- [ ] Total visitors this week
- [ ] Top 5 pages
- [ ] Top referrers
- [ ] Form submissions
- [ ] Any affiliate clicks

Store in `/root/clawd/businessagents-site/metrics/YYYY-MM-DD.md`

---

*Nate: Please enable Cloudflare Web Analytics from dashboard and share the beacon token.*
