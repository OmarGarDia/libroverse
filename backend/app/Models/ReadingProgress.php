<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReadingProgress extends Model
{
    use HasFactory;

    protected $table = 'reading_progress';

    protected $fillable = [
        'user_book_id',
        'pages_read',
        'total_pages',
        'progress_percentage',
        'reading_date',
        'notes'
    ];

    protected $casts = [
        'reading_date' => 'date',
        'progress_percentage' => 'decimal:2'
    ];

    public function userBook(): BelongsTo
    {
        return $this->belongsTo(UserBook::class);
    }
}
