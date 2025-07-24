<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'isbn_10',
        'isbn_13',
        'cover_image',
        'pages',
        'publication_date',
        'language',
        'publisher_id',
        'price',
        'format',
        'is_active'
    ];

    protected function casts(): array
    {
        return [
            'publication_date' => 'date',
            'price' => 'decimal:2',
            'average_rating' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($book) {
            if (empty($book->slug)) {
                $book->slug = Str::slug($book->title);
            }
        });
    }


    public function authors()
    {
        return $this->belongsToMany(Author::class, 'book_author')->withPivot('role')->withTimestamps();
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class)->withTimestamps();
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function userBooks(): HasMany
    {
        return $this->hasMany(UserBook::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByGenre($query, $genreId)
    {
        return $query->whereHas('genres', function ($sq) use ($genreId) {
            $sq->where('genres.id', $genreId);
        });
    }

    public function updateRating()
    {
        $ratings = $this->userBooks()->whereNotNull('user_rating');
        $this->average_rating = $ratings->avg('user_rating') ?? 0;
        $this->ratings_count = $ratings->count();
        $this->save();
    }

    public function bookNote()
    {
        return $this->hasMany(BookNote::class);
    }
}
