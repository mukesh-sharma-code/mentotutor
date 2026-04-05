<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBookingRequest;
use App\Mail\BookingNotification;
use App\Models\DemoBooking;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class DemoBookingController extends Controller
{
    /**
     * POST /api/v1/demo-bookings
     */
    public function store(CreateBookingRequest $request): JsonResponse
    {
        $validated = $request->validated();

        Log::info('booking: creating new demo booking', [
            'email' => $validated['email'],
            'name'  => $validated['firstName'] . ' ' . $validated['lastName'],
        ]);

        $booking = DemoBooking::create([
            'date'            => trim($validated['date']),
            'time'            => trim($validated['time']),
            'timezone'        => trim($validated['timezone']),
            'first_name'      => trim($validated['firstName']),
            'last_name'       => trim($validated['lastName']),
            'email'           => trim($validated['email']),
            'contact_no'      => trim($validated['contactNo']),
            'country'         => trim($validated['country']),
            'source'          => trim($validated['source']),
            'grade'           => trim($validated['grade']),
            'subject'         => trim($validated['subject']),
            'topic'           => trim($validated['topic']),
            'additional_info' => trim($validated['additionalInfo'] ?? ''),
        ]);

        Log::info("booking: created successfully", ['booking_id' => $booking->id]);

        // Fire-and-forget admin email. Log errors but do not fail the booking.
        try {
            $adminEmail = config('mail.admin_email');
            $mailer     = config('mail.default');
            $host       = config('mail.mailers.smtp.host');
            $port       = config('mail.mailers.smtp.port');
            $username   = config('mail.mailers.smtp.username');
            $fromAddr   = config('mail.from.address');

            Log::info("booking: email config", [
                'admin_email' => $adminEmail,
                'mailer'      => $mailer,
                'smtp_host'   => $host,
                'smtp_port'   => $port,
                'smtp_user'   => $username,
                'from_address'=> $fromAddr,
            ]);

            if ($adminEmail) {
                Log::info("booking: sending admin email to {$adminEmail}...");
                Mail::to($adminEmail)->send(new BookingNotification($booking));
                Log::info("booking: admin email sent successfully to {$adminEmail}");
            } else {
                Log::warning("booking: ADMIN_EMAIL not configured, skipping email");
            }
        } catch (\Throwable $e) {
            Log::error("booking: failed to send admin email", [
                'booking_id' => $booking->id,
                'error'      => $e->getMessage(),
                'trace'      => $e->getTraceAsString(),
            ]);
        }

        return response()->json([
            'message' => 'Demo booking created successfully',
            'data'    => $booking->toCamelArray(),
        ], 201);
    }

    /**
     * GET /api/v1/demo-bookings
     */
    public function index(): JsonResponse
    {
        $bookings = DemoBooking::orderByDesc('id')->get();

        return response()->json([
            'data' => $bookings->map(fn (DemoBooking $b) => $b->toCamelArray()),
        ]);
    }
}
