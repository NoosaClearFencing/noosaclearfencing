# Website refresh — awaiting owner approval

This branch is a proposal. Do not merge or deploy until the owner approves the preview.

## Changes
- Responsive coastal design with clearer navigation, service information, FAQs and mobile contact links.
- Confirmed phone, email, Monday–Saturday 07:30–17:00 hours, and Facebook link.
- Quote CTA scrolls to contact options. The email CTA opens the visitor's email client with a prefilled enquiry; it does not submit or store a lead. Phone/email work without JavaScript.
- Descriptive page title, canonical URL, social metadata, image descriptions, structured business data, robots.txt and sitemap.xml.
- Explicit image dimensions, below-fold lazy loading, no third-party fonts, no new trackers or dependencies.

## Before publishing
1. Owner review and approval of design/copy.
2. Confirm image provenance or supply genuine project photos. A current website image contains a Grok watermark. The proposal uses existing landscape images as design imagery and avoids labelling them as verified installations or specific locations.
3. Verify the ABN and QBCC licence. The previous page lists ABN 68690835959 and licence 15554051. The refresh omits these pending verification rather than reproducing uncertain credentials. Restore verified details before launch if required.
4. Confirm product specifications and compliance wording before adding those claims. The old blanket Form 15 compliance and 2–3 week turnaround claims are not repeated.
5. Check GitHub Pages custom-domain HTTPS, especially www.noosaclearfencing.com.au, independently of this code change. Keep the existing CNAME unchanged.

## Preview
Run `python3 -m http.server 8765 --bind 127.0.0.1` in this directory, then open http://127.0.0.1:8765/ .
No build step is needed. GitHub Pages serves index.html directly.

Structured data describes the business but does not guarantee a Google rich result or ranking. No street address, reviews or ratings have been invented.
