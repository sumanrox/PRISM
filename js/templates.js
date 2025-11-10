// Vulnerability Report Templates
const VRB_TEMPLATES = {
  xss_stored: {
    name: "Stored XSS",
    icon: "bi-code-slash",
    data: {
      vuln_title: "Stored Cross-Site Scripting (XSS) Vulnerability",
      vuln_category: "xss-stored",
      vuln_owasp: "A03:2025",
      vuln_severity: "High",
      cvss_vector: "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N",
      vuln_summary: "A Stored Cross-Site Scripting (XSS) vulnerability was identified in the application. An authenticated attacker can inject malicious JavaScript code that gets stored in the database and executed in the context of other users' browsers when they view the affected page.\n\nThis vulnerability allows persistent execution of arbitrary JavaScript, potentially leading to session hijacking, credential theft, and malicious actions performed on behalf of victims.",
      vuln_steps: "1. Log in to the application with a low-privileged user account\n2. Navigate to [vulnerable feature/page]\n3. Inject the following XSS payload into the [input field name]:\n   ```\n   <script>alert(document.cookie)</script>\n   ```\n4. Submit the form/comment/post\n5. Log in as a different user and navigate to the same page\n6. Observe that the JavaScript payload executes automatically\n7. The alert box displays the victim's session cookies",
      vuln_observables: "Injected payload: <script>alert(document.cookie)</script>\nVulnerable parameter: [parameter_name]\nAffected endpoint: [URL]\nNo input sanitization observed\nNo output encoding detected",
      vuln_impact: "**High Impact** - An attacker can execute arbitrary JavaScript in victims' browsers, potentially:\n\n- Steal session cookies and hijack user accounts\n- Perform unauthorized actions on behalf of victims\n- Redirect users to phishing sites\n- Deface the application interface\n- Harvest sensitive data displayed on the page\n- Deploy keyloggers or other malicious payloads\n\nSince the payload is stored permanently, every user viewing the affected content will be attacked automatically.",
      vuln_mitigation: "1. **Input Validation**: Implement strict allowlists for acceptable input patterns\n2. **Output Encoding**: Apply context-appropriate encoding when rendering user-controlled data:\n   - HTML entity encoding for HTML contexts\n   - JavaScript encoding for JavaScript contexts\n   - URL encoding for URL contexts\n3. **Content Security Policy (CSP)**: Deploy a restrictive CSP header to prevent inline script execution\n4. **HTTPOnly Cookies**: Mark session cookies as HTTPOnly to prevent JavaScript access\n5. **Security Review**: Conduct comprehensive code review of all user input handling",
      vuln_notes: "This is a high-severity vulnerability that should be prioritized for immediate remediation. The vulnerability affects all authenticated users and can lead to widespread account compromise."
    }
  },
  
  sqli: {
    name: "SQL Injection",
    icon: "bi-database-fill-exclamation",
    data: {
      vuln_title: "SQL Injection Vulnerability",
      vuln_category: "sql-injection",
      vuln_owasp: "A03:2025",
      vuln_severity: "Critical",
      cvss_vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
      vuln_summary: "A SQL Injection vulnerability exists in the application, allowing an unauthenticated attacker to manipulate SQL queries and interact directly with the backend database.\n\nBy injecting malicious SQL syntax, an attacker can bypass authentication, extract sensitive data, modify or delete records, and potentially execute operating system commands on the database server.",
      vuln_steps: "1. Navigate to [vulnerable page/endpoint]\n2. Intercept the request using a proxy tool (e.g., Burp Suite)\n3. Modify the [parameter_name] parameter with the following payload:\n   ```\n   ' OR '1'='1' --\n   ```\n4. Forward the modified request\n5. Observe that the application returns all database records\n6. Confirm SQL injection with a time-based payload:\n   ```\n   ' AND SLEEP(5) --\n   ```\n7. Application responds with a 5-second delay, confirming blind SQL injection",
      vuln_observables: "Vulnerable parameter: [parameter_name]\nInjection point: [GET/POST/Cookie]\nDatabase type detected: [MySQL/PostgreSQL/MSSQL]\nSuccessful payload: ' OR '1'='1' --\nError messages disclosed: Yes/No",
      vuln_impact: "**Critical Impact** - An attacker can:\n\n- **Data Breach**: Extract the entire database including user credentials, PII, financial data\n- **Authentication Bypass**: Access admin panels and privileged accounts\n- **Data Manipulation**: Modify or delete critical business data\n- **Privilege Escalation**: Create new administrator accounts\n- **System Compromise**: Execute OS commands if database user has elevated privileges\n- **Compliance Violations**: Breach of GDPR, PCI-DSS, HIPAA requirements",
      vuln_mitigation: "1. **Parameterized Queries**: Use prepared statements with bound parameters for all database operations\n2. **Input Validation**: Implement strict type checking and allowlists\n3. **Least Privilege**: Run database connections with minimal required permissions\n4. **WAF Deployment**: Deploy a Web Application Firewall with SQL injection signatures\n5. **Error Handling**: Suppress detailed database error messages from production\n6. **Code Review**: Audit all database interaction code for injection vulnerabilities",
      vuln_notes: "This is a CRITICAL vulnerability requiring immediate remediation. Database contains sensitive user data and should be considered fully compromised until patched."
    }
  },
  
  csrf: {
    name: "CSRF",
    icon: "bi-shield-exclamation",
    data: {
      vuln_title: "Cross-Site Request Forgery (CSRF) Vulnerability",
      vuln_category: "csrf",
      vuln_owasp: "A01:2025",
      vuln_severity: "Medium",
      cvss_vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:N",
      vuln_summary: "The application is vulnerable to Cross-Site Request Forgery (CSRF) attacks due to missing or improperly implemented anti-CSRF tokens.\n\nAn attacker can craft malicious web pages or emails that, when visited by an authenticated user, will trigger unauthorized state-changing actions on behalf of the victim without their knowledge or consent.",
      vuln_steps: "1. Log in to the application as a legitimate user\n2. Navigate to [sensitive action page] (e.g., change password, update profile)\n3. Perform the action while monitoring requests in a proxy tool\n4. Note that the request does not contain a CSRF token\n5. Craft a malicious HTML page with the following proof-of-concept:\n   ```html\n   <form id=\"csrf\" action=\"https://target.com/change-email\" method=\"POST\">\n     <input name=\"email\" value=\"attacker@evil.com\">\n   </form>\n   <script>document.getElementById('csrf').submit();</script>\n   ```\n6. Host the page and send the link to a logged-in victim\n7. When the victim visits the page, their email is changed to attacker@evil.com",
      vuln_observables: "Vulnerable endpoint: [URL]\nHTTP Method: POST\nNo CSRF token in request\nNo SameSite cookie attribute\nNo Referer validation",
      vuln_impact: "**Medium Impact** - An attacker can perform unauthorized actions including:\n\n- Account takeover via email/password modification\n- Unauthorized fund transfers or purchases\n- Privilege escalation by modifying user roles\n- Data manipulation or deletion\n- Configuration changes\n\nAttacks are invisible to victims and can be deployed via phishing emails, malicious websites, or compromised third-party sites.",
      vuln_mitigation: "1. **CSRF Tokens**: Implement cryptographically random tokens for all state-changing requests\n2. **SameSite Cookies**: Set `SameSite=Strict` or `SameSite=Lax` on session cookies\n3. **Double Submit Cookie**: Use CSRF token in both cookie and request parameter\n4. **Referer Validation**: Verify Origin and Referer headers (as defense-in-depth)\n5. **User Confirmation**: Require re-authentication for sensitive actions\n6. **Framework Features**: Enable built-in CSRF protection in web frameworks",
      vuln_notes: "All state-changing operations should be protected. Priority should be given to high-impact actions like password changes, email updates, and financial transactions."
    }
  },
  
  idor: {
    name: "IDOR",
    icon: "bi-key",
    data: {
      vuln_title: "Insecure Direct Object Reference (IDOR) Vulnerability",
      vuln_category: "idor",
      vuln_owasp: "A01:2025",
      vuln_severity: "High",
      cvss_vector: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N",
      vuln_summary: "An Insecure Direct Object Reference (IDOR) vulnerability allows authenticated users to access resources belonging to other users by manipulating object identifiers in requests.\n\nThe application fails to properly validate authorization before serving sensitive resources, enabling horizontal privilege escalation.",
      vuln_steps: "1. Log in as User A (user_id=1001)\n2. Navigate to profile/documents/orders page\n3. Note the URL contains an object reference: `/api/documents/5432`\n4. Intercept the request in a proxy tool\n5. Modify the document ID to another value: `/api/documents/5433`\n6. Forward the request\n7. Observe that the application returns a document belonging to User B\n8. Enumerate additional resources by incrementing/decrementing IDs",
      vuln_observables: "Vulnerable endpoint: /api/documents/{id}\nPredictable IDs: Sequential integers\nNo authorization check performed\nSuccessfully accessed User B's document ID 5433\nSensitive data exposed: [describe data]",
      vuln_impact: "**High Impact** - An attacker can:\n\n- Access confidential documents, messages, or files of other users\n- View personally identifiable information (PII)\n- Read financial records, invoices, or transaction history\n- Access private communications\n- Enumerate all users and their associated data\n- Violate user privacy and data protection regulations (GDPR, CCPA)",
      vuln_mitigation: "1. **Authorization Checks**: Implement server-side access control for every object access\n2. **Indirect References**: Use random, unpredictable object identifiers (UUIDs)\n3. **User-Object Mapping**: Verify that the requesting user owns/has permission for the resource\n4. **Access Control Framework**: Implement centralized authorization logic\n5. **Audit Logging**: Log all resource access attempts for monitoring\n6. **Rate Limiting**: Prevent automated enumeration attacks",
      vuln_notes: "This vulnerability affects multiple endpoints. A comprehensive security review of all API endpoints and resource access controls is recommended."
    }
  },
  
  ssrf: {
    name: "SSRF",
    icon: "bi-diagram-3",
    data: {
      vuln_title: "Server-Side Request Forgery (SSRF) Vulnerability",
      vuln_category: "ssrf",
      vuln_owasp: "A10:2025",
      vuln_severity: "High",
      cvss_vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:L/A:N",
      vuln_summary: "A Server-Side Request Forgery (SSRF) vulnerability allows an attacker to make the server initiate arbitrary HTTP requests to internal or external systems.\n\nBy manipulating URL parameters, an attacker can scan internal networks, access cloud metadata services, bypass firewalls, and potentially interact with internal services that are not directly accessible from the internet.",
      vuln_steps: "1. Navigate to the URL preview/fetch feature at [endpoint]\n2. Submit a request with the following URL parameter:\n   ```\n   url=http://169.254.169.254/latest/meta-data/iam/security-credentials/\n   ```\n3. Observe that the server fetches the AWS metadata endpoint\n4. Retrieve IAM credentials from the response\n5. Test internal network access:\n   ```\n   url=http://localhost:8080/admin\n   url=http://192.168.1.1\n   ```\n6. Confirm access to internal services and admin panels",
      vuln_observables: "Vulnerable parameter: url\nSuccessful SSRF to: http://169.254.169.254/\nInternal IPs accessible: 127.0.0.1, 192.168.x.x\nNo URL allowlist implemented\nCloud metadata exposed: Yes",
      vuln_impact: "**High Impact** - An attacker can:\n\n- **Cloud Metadata Access**: Steal AWS/Azure/GCP credentials and API keys\n- **Internal Network Scanning**: Map internal infrastructure and services\n- **Bypass Firewalls**: Access internal services not exposed to the internet\n- **Data Exfiltration**: Read sensitive files from internal systems\n- **Credential Theft**: Extract database credentials, API keys, secrets\n- **Remote Code Execution**: Chain with other vulnerabilities for RCE",
      vuln_mitigation: "1. **URL Allowlist**: Implement strict allowlist of permitted domains/IPs\n2. **Block Internal IPs**: Deny requests to private IP ranges (RFC 1918, loopback, link-local)\n3. **Block Cloud Metadata**: Explicitly block 169.254.169.254 and cloud metadata URLs\n4. **Network Segmentation**: Isolate application servers from sensitive internal networks\n5. **Authentication**: Require authentication for URL fetch features\n6. **Response Validation**: Verify response content types and sizes\n7. **Disable Redirects**: Prevent HTTP redirects to bypass filters",
      vuln_notes: "If the application is hosted on AWS/Azure/GCP, cloud metadata access should be tested immediately. This is a high-priority vulnerability in cloud environments."
    }
  },
  
  auth_bypass: {
    name: "Auth Bypass",
    icon: "bi-unlock",
    data: {
      vuln_title: "Authentication Bypass Vulnerability",
      vuln_category: "auth-bypass",
      vuln_owasp: "A07:2025",
      vuln_severity: "Critical",
      cvss_vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
      vuln_summary: "A critical authentication bypass vulnerability allows unauthenticated attackers to gain full access to the application without valid credentials.\n\nBy manipulating authentication parameters or exploiting logic flaws in the authentication mechanism, an attacker can bypass login controls and access privileged functionality.",
      vuln_steps: "1. Navigate to the login page at /login\n2. Intercept the login request using a proxy tool\n3. Modify the authentication request:\n   - Original: `username=admin&password=test123`\n   - Modified: `username=admin&password=&admin=true`\n4. Forward the modified request\n5. Observe successful authentication without valid password\n6. Access admin panel and restricted features\n7. Alternative bypass using SQL injection: `username=admin'-- &password=anything`",
      vuln_observables: "Vulnerable endpoint: /api/login\nBypass parameter: admin=true\nNo password verification performed\nSession created without credential validation\nDirect access to /admin granted",
      vuln_impact: "**Critical Impact** - An attacker can:\n\n- **Complete Account Takeover**: Access any user account including administrators\n- **Data Breach**: Access all application data without restrictions\n- **Privilege Escalation**: Gain administrative privileges\n- **Malicious Operations**: Create/modify/delete users and data\n- **Reputation Damage**: Complete compromise of application security\n- **Compliance Violations**: Breach of security requirements and regulations",
      vuln_mitigation: "1. **Secure Authentication Logic**: Implement robust server-side authentication validation\n2. **Password Verification**: Always verify password hashes using secure algorithms (bcrypt, Argon2)\n3. **Session Management**: Issue sessions only after successful authentication\n4. **Input Validation**: Reject unexpected parameters in authentication requests\n5. **Security Testing**: Conduct thorough penetration testing of authentication flows\n6. **Code Review**: Audit all authentication and authorization code\n7. **MFA Implementation**: Deploy multi-factor authentication for additional security",
      vuln_notes: "CRITICAL PRIORITY - This vulnerability provides unrestricted access to the entire application. Immediate remediation required. All user accounts should be considered compromised."
    }
  }
};
