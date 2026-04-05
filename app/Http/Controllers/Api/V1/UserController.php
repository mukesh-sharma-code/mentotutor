<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * POST /api/v1/users
     */
    public function store(CreateUserRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // Check email uniqueness (matching Go service logic).
        $existing = User::where('email', trim($validated['email']))->first();
        if ($existing) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => ['email' => 'Email already exists'],
            ], 422);
        }

        $user = User::create([
            'name'  => trim($validated['name']),
            'email' => trim($validated['email']),
            'phone' => trim($validated['phone'] ?? ''),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'data'    => [
                'id'        => $user->id,
                'name'      => $user->name,
                'email'     => $user->email,
                'phone'     => $user->phone,
                'createdAt' => $user->created_at?->toIso8601String(),
                'updatedAt' => $user->updated_at?->toIso8601String(),
            ],
        ], 201);
    }

    /**
     * GET /api/v1/users
     */
    public function index(): JsonResponse
    {
        $users = User::orderByDesc('id')->get();

        return response()->json([
            'data' => $users->map(fn (User $u) => [
                'id'        => $u->id,
                'name'      => $u->name,
                'email'     => $u->email,
                'phone'     => $u->phone,
                'createdAt' => $u->created_at?->toIso8601String(),
                'updatedAt' => $u->updated_at?->toIso8601String(),
            ]),
        ]);
    }
}
