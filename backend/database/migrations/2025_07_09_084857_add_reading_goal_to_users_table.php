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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('reading_goal')->nullable()->default(50);
            $table->integer('reading_goal_year')->nullable()->default(date('Y'));
            $table->integer('books_read_current_year')->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['reading_goal', 'reading_goal_year', 'books_read_current_year']);
        });
    }
};
