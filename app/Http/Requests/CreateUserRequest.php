<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:120'],
            'email' => ['required', 'regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/'],
            'phone' => ['nullable', 'string', 'max:32'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'  => 'Name is required',
            'email.required' => 'Valid email is required',
            'email.regex'    => 'Valid email is required',
            'phone.max'      => 'Phone must be <= 32 characters',
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
