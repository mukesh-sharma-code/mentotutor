<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ContactMessageController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'contactNo' => 'required|string|max:50',
            'userType' => 'required|string|in:Student,Parent',
            'message' => 'required|string|max:2000',
        ]);

        Log::info('contact: capturing new inquiry', ['email' => $validated['email']]);

        try {
            $contact = ContactMessage::create([
                'name' => trim($validated['name']),
                'email' => trim($validated['email']),
                'contact_no' => trim($validated['contactNo']),
                'user_type' => trim($validated['userType']),
                'message' => trim($validated['message']),
            ]);
            
            Log::info('contact: inquiry successfully saved to database', ['id' => $contact->id, 'email' => $validated['email']]);
        } catch (\Exception $e) {
            // Failsafe. If local DB is disconnected/table missing, catch it so we can still send email.
            Log::error('contact: Could not save to DB (Migration missing or access denied).', ['error' => $e->getMessage()]);
        }

        // Send Email notification!
        try {
            $primaryList = config('mail.admin_emails');
            $ccExtra     = config('mail.admin_cc');
            if ($primaryList !== [] && !empty($primaryList)) {
                $to = $primaryList[0];
                $cc = array_values(array_unique(array_merge(
                    array_slice($primaryList, 1),
                    $ccExtra ?? []
                )));

                $pending = \Illuminate\Support\Facades\Mail::to($to);
                if ($cc !== []) {
                    $pending->cc($cc);
                }

                $pending->send(new \App\Mail\ContactNotification($validated));
                Log::info('contact: admin email sent successfully');
            } else {
                Log::warning("contact: ADMIN_EMAIL not configured, skipping email");
            }
        } catch (\Throwable $e) {
            Log::error("contact: failed to send admin email", [
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'message' => 'Your inquiry was submitted successfully. We will be in touch soon!',
            'data' => $validated
        ], 201);
    }
}
