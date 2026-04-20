<x-mail::message>
# New Contact Inquiry

You have received a new generic inquiry from the Contact Us page.

**Details:**
- **Name:** {{ $contactData['name'] }}
- **Email:** {{ $contactData['email'] }}
- **Contact Number:** {{ $contactData['contactNo'] }}
- **Type:** {{ $contactData['userType'] }}

**Message:**
{{ $contactData['message'] }}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
