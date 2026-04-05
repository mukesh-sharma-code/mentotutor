NEW DEMO BOOKING — {{ config('app.name') }}

{{ $booking->first_name }} {{ $booking->last_name }} submitted the book-a-demo form.

Schedule:    {{ $booking->date }} at {{ $booking->time }} ({{ $booking->timezone }})
Email:       {{ $booking->email }}
Phone:       {{ $booking->contact_no }}
Country:     {{ $booking->country }}
Heard from:  {{ $booking->source }}
Grade:       {{ $booking->grade }}
Subject:     {{ $booking->subject }}
Topic:       {{ $booking->topic ?: '—' }}

Additional info:
{{ $booking->additional_info ?: '—' }}

---
Sent from {{ config('app.name') }}
