# Authenticated ZAP API Scan

- **Date:** 2026-09-26
- **ZAP:** 2.17.0
- **Target:** `http://127.0.0.1:5000` (local backend API)
- **Authentication:** Synthetic `PUBLIC_USER` test account created through the local signup page; token was supplied through ZAP's request replacer.
- **Frontend:** Not actively scanned in this authenticated run.

## Results

| Severity | Alerts |
|---|---:|
| High | 0 |
| Medium | 0 |
| Low | 17 instances |
| Informational | 0 |

The 17 Low instances are repeated response-header findings:

- **`X-Powered-By` information disclosure** — 11 instances.
- **Missing `X-Content-Type-Options`** — 6 instances.

Completed active scans used ZAP's `API` policy on these read-only GET endpoints: `/api/reports/my`, `/api/reports/statistics`, `/api/zones/`, `/api/species/`, and `/api/species/all`. A full default-policy scan also completed on `/api/reports/my`. These active scans reported no alerts.

Authenticated role checks returned **403** for the Public User account on `/api/admin/pending-users`, `/api/investigations/my-investigations`, `/api/reports/my-district`, `/api/auth/profile`, and `/api/profile/me`.

## Coverage limits

This run did not actively scan write, delete, or upload routes. Report and investigation code paths can send email/SMS, and upload paths can call external storage services. Admin-, authorized-person-, and zoologist-specific functionality was not authenticated because only a Public User test account was available. The scan also does not establish that untested routes are free of vulnerabilities.

Four initial default-policy scans were stopped at 37% after the DOM-based XSS rule stalled on JSON endpoints. They are incomplete and are not counted as completed scans above.

## Follow-up write-method checks

Follow-up authenticated HTTP probes were made with the same synthetic `PUBLIC_USER` account. These were manual dynamic checks, not ZAP active scans. The connected backend uses a remote MongoDB; report creation also sends email, and investigation submission can send SMS, so successful create/update/delete/upload actions and those notification paths were not invoked.

The follow-up requests were replayed through ZAP 2.17.0's proxy and exported as a ZAP-generated HTML report: `zap-followup-write-route-evidence.html`. The report records the proxied request/response evidence and passive findings; no active attack scan was run against write routes.

| Method and route | Result |
|---|---|
| `PUT /api/profile/public/me` with an empty JSON object | 400; no valid fields provided |
| `PUT /api/profile/public/password` with an empty JSON object | 400; required fields missing |
| `POST /api/reports` with an empty JSON object | 400; district required; no report created |
| `PUT /api/reports/not-a-valid-id` | 500; response discloses Mongoose `Cast to ObjectId failed` details |
| `DELETE /api/reports/not-a-valid-id` | 500; response discloses Mongoose `Cast to ObjectId failed` details |
| `PUT` and `DELETE /api/reports/000000000000000000000000` | 404 Report not found; no report changed/deleted |
| `POST /api/zones` | 403 for `PUBLIC_USER` |
| `POST /api/investigations/start/not-a-valid-id` and `DELETE /api/investigations/cancel/not-a-valid-id` | 403 for `PUBLIC_USER` |
| `PUT` and `DELETE /api/species/not-a-valid-id` | 403 for `PUBLIC_USER` |
| `PUT /api/admin/approve/not-a-valid-id` and `DELETE /api/admin/users/not-a-valid-id` | 403 for `PUBLIC_USER` |

The report ID behavior is a confirmed input-validation/error-handling finding: malformed IDs produce HTTP 500 and expose an internal database-library error; well-formed but nonexistent IDs return 404. This does not show report ownership bypass; source code constrains report update/delete queries to the authenticated reporter. Successful authenticated writes, uploads, and deletes still need a disposable/test database and safe test integrations to scan without affecting project data or contacting users.
