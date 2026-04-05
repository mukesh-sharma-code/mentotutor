<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date'           => ['required', 'string', 'max:32'],
            'time'           => ['required', 'string', 'max:32'],
            'timezone'       => ['required', 'string', 'max:128'],
            'firstName'      => ['required', 'string', 'max:100'],
            'lastName'       => ['required', 'string', 'max:100'],
            'email'          => ['required', 'regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/'],
            'contactNo'      => ['required', 'string', 'max:32'],
            'country'        => ['required', 'string', 'max:100'],
            'source'         => ['required', 'string', 'max:100'],
            'grade'          => ['required', 'string', 'max:100'],
            'subject'        => ['required', 'string', 'max:100'],
            'topic'          => ['required', 'string', 'max:200'],
            'additionalInfo' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'date.required'      => 'Date is required',
            'time.required'      => 'Time is required',
            'timezone.required'  => 'Timezone is required',
            'firstName.required' => 'First name is required',
            'lastName.required'  => 'Last name is required',
            'email.required'     => 'Valid email is required',
            'email.regex'        => 'Valid email is required',
            'contactNo.required' => 'Contact number is required',
            'country.required'   => 'Country is required',
            'source.required'    => 'Source is required',
            'grade.required'     => 'Grade is required',
            'subject.required'   => 'Subject is required',
            'topic.required'     => 'Topic is required',
            'additionalInfo.max' => 'Additional info must be <= 500 characters',
        ];
    }

    /**
     * Override to return a flat field→message error map (matching Go API format).
     */
    protected function failedValidation(Validator $validator): void
    {
        $errors = [];
        foreach ($validator->errors()->toArray() as $field => $messages) {
            $errors[$field] = $messages[0];
        }

        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation failed',
                'errors'  => $errors,
            ], 422)
        );
    }
}
