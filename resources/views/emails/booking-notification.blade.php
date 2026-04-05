<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New demo booking</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Segoe UI,system-ui,-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#be123c 0%,#9f1239 100%);padding:24px 28px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#fecdd3;">{{ config('app.name') }}</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;line-height:1.25;color:#ffffff;">New demo booking</h1>
              <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#fecdd3;">Someone submitted the book-a-demo form on your site.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.5;color:#334155;">
                <strong style="color:#0f172a;">{{ $booking->first_name }} {{ $booking->last_name }}</strong>
                wants to schedule a session. Details below.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                @foreach ([
                  ['Schedule', $booking->date . ' at ' . $booking->time . ' · ' . $booking->timezone],
                  ['Email', $booking->email],
                  ['Phone', $booking->contact_no],
                  ['Country', $booking->country],
                  ['How they heard', $booking->source],
                  ['Grade', $booking->grade],
                  ['Subject', $booking->subject],
                  ['Topic', $booking->topic ?: '—'],
                  ['Additional info', $booking->additional_info ?: '—'],
                ] as $row)
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;width:38%;vertical-align:top;">{{ $row[0] }}</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:15px;color:#0f172a;vertical-align:top;word-break:break-word;">{{ $row[1] }}</td>
                </tr>
                @endforeach
              </table>

              <p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#94a3b8;">
                This message was sent automatically from {{ config('app.name') }}. Reply directly to the customer using the email above.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:11px;color:#94a3b8;text-align:center;">&copy; {{ date('Y') }} {{ config('app.name') }}</p>
      </td>
    </tr>
  </table>
</body>
</html>
