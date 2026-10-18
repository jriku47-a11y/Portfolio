<?php
/* ============================================================================
   CONTACT FORM CONFIG — TEMPLATE
   ----------------------------------------------------------------------------
   This file is SAFE to commit: every value ships empty.

   To enable the contact form on a host that runs PHP:

     1. Copy this file  ->  api/config.local.php
     2. Fill in the values below.
     3. Restart / reload PHP. That is it.

   api/config.local.php is listed in .gitignore and must NEVER be committed
   or uploaded. It is ignored by the patterns *.local.php and the explicit
   api/config.local.php entry.

   You can also skip this file entirely and set real environment variables on
   your host (RESEND_API_KEY, MAIL_FROM, MAIL_TO, GMAIL_USER,
   GMAIL_APP_PASSWORD). Environment variables take precedence over this file.

   SECURITY RULES
     - Never put an app password, API key, or account password in this file
       and then commit it.
     - Never put secrets in js/content.js or any other file the browser can
       read.
     - MAIL_TO is required. If it is empty the endpoint returns HTTP 501 and
       the page tells visitors the form is not connected, rather than faking
       a success message.
   ========================================================================= */

return [
  /* ---- Option A: HTTPS mail API (recommended — runs on port 443) ----
     Sign up at resend.com, copy the API key, and verify your sending domain.
     Uncomment and fill in to use this instead of SMTP.                     */
  // 'RESEND_API_KEY' => 're_xxxxxxxxxxxxxxxxxxxxxxxx',
  // 'MAIL_FROM'      => 'Portfolio <portfolio@yourdomain.com>',

  /* ---- Option B: Gmail SMTP (needs 2-Step Verification + an App password)
     Google Account -> Security -> 2-Step Verification -> App passwords.
     Generate one, paste it here, and never share or commit it.            */
  // 'GMAIL_USER'          => 'you@gmail.com',
  // 'GMAIL_APP_PASSWORD'  => '',

  /* ---- Where messages land (REQUIRED to enable the form) ---- */
  'MAIL_TO' => '',
];