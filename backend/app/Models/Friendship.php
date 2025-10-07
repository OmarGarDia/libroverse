<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Friendship extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'friend_id',
        'status',
        'accepted_at'
    ];

    protected $dates = [
        'accepted_at',
        'created_at',
        'updated_at'
    ];

    /**
     * Relación con el usuario que envía la solicitud
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relación con el usuario que recibe la solicitud
     */
    public function friend(): BelongsTo
    {
        return $this->belongsTo(User::class, 'friend_id');
    }

    /**
     * Scope para amistades aceptadas
     */
    public function scopeAccepted($query)
    {
        return $query->where('status', 'accepted');
    }

    /**
     * Scope para solicitudes pendientes
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}
