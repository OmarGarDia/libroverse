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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('isbn_10', 10)->nullable();
            $table->string('isbn_13', 13)->nullable();
            $table->string('cover_image')->nullable();
            $table->integer('pages')->nullable();
            $table->date('publication_date')->nullable();
            $table->string('language', 5)->default('es');
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->integer('ratings_count')->default(0);
            $table->foreignId('publisher_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('price', 8, 2)->default(0);
            $table->enum('format', ['physical', 'ebook', 'audiobook'])->default('physical');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['title', 'is_active']);
            $table->index(['isbn_10', 'isbn_13']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
