<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reading_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_book_id')->constrained()->onDelete('cascade');
            $table->integer('pages_read');
            $table->integer('total_pages');
            $table->decimal('progress_percentage', 5, 2);
            $table->date('reading_date');
            $table->text('notes')->nullable();
            $table->timestamps();

            // Evitar duplicados del mismo día
            $table->unique(['user_book_id', 'reading_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_progress');
    }
};
