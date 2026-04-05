<?php

namespace App\Mail;

use App\Models\DemoBooking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public DemoBooking $booking,
    ) {}

    public function envelope(): Envelope
    {
        $name = trim($this->booking->first_name . ' ' . $this->booking->last_name);

        return new Envelope(
            subject: 'New Demo Booking — ' . config('app.name'),
            replyTo: [
                new Address($this->booking->email, $name !== '' ? $name : null),
            ],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-notification',
            text: 'emails.booking-notification-plain',
        );
    }
}
