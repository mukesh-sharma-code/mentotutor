<?php

use App\Http\Controllers\Api\V1\DemoBookingController;
use App\Http\Controllers\Api\V1\HealthController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/health', [HealthController::class, 'check']);

Route::prefix('api/v1')->group(function () {
    Route::post('/demo-bookings', [DemoBookingController::class, 'store']);
    Route::get('/demo-bookings', [DemoBookingController::class, 'index']);

    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users', [UserController::class, 'index']);
});
