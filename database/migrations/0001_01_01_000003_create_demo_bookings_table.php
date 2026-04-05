<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('demo_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('date', 32);
            $table->string('time', 32);
            $table->string('timezone', 128);
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('email', 150);
            $table->string('contact_no', 32);
            $table->string('country', 100);
            $table->string('source', 100);
            $table->string('grade', 100);
            $table->string('subject', 100);
            $table->string('topic', 200);
            $table->text('additional_info')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demo_bookings');
    }
};
