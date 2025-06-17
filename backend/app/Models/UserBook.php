<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'status',
        'current_page',
        'started_reading_at',
        'finished_reading_at',
        'user_rating',
        'user_review',
        'is_favorite',
        'tags',
        'notes'
    ];

    protected function casts(): array
    {
        return [
            'started_reading_at' => 'date',
            'finished_reading_at' => 'date',
            'user_rating' => 'decimal:1',
            'is_favorite' => 'boolean',
            'tags' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    // Scopes
    public function scopeCurrentlyReading($query)
    {
        return $query->where('status', 'reading');
    }

    public function scopeWantToRead($query)
    {
        return $query->where('status', 'want_to_read');
    }

    public function scopeRead($query)
    {
        return $query->where('status', 'read');
    }

    public function scopeFavorites($query)
    {
        return $query->where('is_favorite', true);
    }

    // Métodos auxiliares
    public function getReadingProgressAttribute()
    {
        if (!$this->book->pages || $this->book->pages == 0) {
            return 0;
        }

        return round(($this->current_page / $this->book->pages) * 100, 2);
    }
}
