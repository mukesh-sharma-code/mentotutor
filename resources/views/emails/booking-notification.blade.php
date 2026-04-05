New demo booking — {{ config('app.name') }}:

Name: {{ $booking->first_name }} {{ $booking->last_name }}
Email: {{ $booking->email }}
Contact: {{ $booking->contact_no }}
Country: {{ $booking->country }}
Source: {{ $booking->source }}
Grade: {{ $booking->grade }}
Subject: {{ $booking->subject }}
Topic: {{ $booking->topic }}
Date: {{ $booking->date }}
Time: {{ $booking->time }}
Timezone: {{ $booking->timezone }}
Additional Info:
{{ $booking->additional_info }}
