<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'biography',
        'photo',
        'birth_date',
        'death_date',
        'nationality',
        'website'
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'death_date' => 'date',
        ];
    }

    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_author')->withPivot('role')->withTimestamps();
    }

    public function getIsAliveAttribute()
    {
        return is_null($this->death_date);
    }
}
