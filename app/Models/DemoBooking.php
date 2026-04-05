<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemoBooking extends Model
{
    public $timestamps = false;

    protected $table = 'demo_bookings';

    protected $fillable = [
        'date',
        'time',
        'timezone',
        'first_name',
        'last_name',
        'email',
        'contact_no',
        'country',
        'source',
        'grade',
        'subject',
        'topic',
        'additional_info',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    /**
     * Boot: auto-set created_at on creating.
     */
    protected static function booted(): void
    {
        static::creating(function (DemoBooking $booking) {
            $booking->created_at = $booking->created_at ?? now();
        });
    }

    /**
     * Convert to camelCase array for JSON (matching Go API response).
     */
    public function toCamelArray(): array
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'time' => $this->time,
            'timezone' => $this->timezone,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'contactNo' => $this->contact_no,
            'country' => $this->country,
            'source' => $this->source,
            'grade' => $this->grade,
            'subject' => $this->subject,
            'topic' => $this->topic,
            'additionalInfo' => $this->additional_info,
            'createdAt' => $this->created_at?->toIso8601String(),
        ];
    }
}
