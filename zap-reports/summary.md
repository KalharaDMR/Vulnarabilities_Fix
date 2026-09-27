# ZAP local scan summary

**Date:** 2026-09-26  
**ZAP:** 2.17.0  
**Targets:** `http://127.0.0.1:3000` and `http://127.0.0.1:5000`  
**Result:** 0 High, 5 Medium, 4 Low, 3 Informational alerts

The ZAP Automation Framework crawled the frontend and the API documentation, imported the available OpenAPI definition, and ran active checks at High attack strength with a Medium alert threshold. The backend active scan reached its 10-minute cap. The unauthenticated scan covered 17 backend nodes and 71 frontend URLs. It did not exercise authenticated user flows.

To avoid integrations and writes that could have external side effects, the scan excluded `/api/reports`, `/api/investigations`, `/api/zones`, and `/api/species`. ZAP also reported an internal null-pointer error in its SSTI blind scan rule, so that rule did not complete. Treat the findings as the scanner's results for the tested scope; the scan does not establish that no other vulnerabilities exist.

## Medium alerts

- **CSP: Failure to Define Directive with No Fallback** — 8 instances. ZAP found a CSP that omits `frame-ancestors` and `form-action` on some frontend responses.
- **Content Security Policy Header Not Set** — 3 instances.
- **Cross-Domain Misconfiguration** — systemic. The React development server at port 3000 returns `Access-Control-Allow-Origin: *`; this was not the Express API's CORS response.
- **Directory Browsing** — 1 instance. ZAP flagged `/static/js/bundle.js/`; a manual GET returned the same JavaScript bundle as `/static/js/bundle.js`, not a directory listing. Likely false positive.
- **Missing Anti-clickjacking Header** — 3 instances.

## Low alerts

- Private IP Disclosure
- `X-Powered-By: Express` response header
- Timestamp Disclosure - Unix
- Missing `X-Content-Type-Options`

See [zap-local-active-scan.html](zap-local-active-scan.html) for ZAP's full alert details and evidence.
