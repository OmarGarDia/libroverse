<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'content',
        'page_number',
    ];

    protected $casts = [
        'page_number' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
