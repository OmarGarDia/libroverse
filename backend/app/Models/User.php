<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'bio',
        'avatar',
        'birth_date',
        'location',
        'reading_preferences',
        'books_read',
        'reading_goal',
        'reading_goal_year',
        'books_read_current_year',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'date',
            'reading_preferences' => 'array',
            'books_read' => 'integer',
            'is_active' => 'boolean',
            'last_activity' => 'datetime',
        ];
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole($role)
    {
        return $this->roles->contains('name', $role);
    }

    public function hasPermission($permission)
    {
        return $this->roles->flatMap->permissions->contains('name', $permission);
    }

    public function bookNote()
    {
        return $this->hasMany(BookNote::class);
    }

    public function userBooks()
    {
        return $this->hasMany(UserBook::class);
    }

    public function receivedFriendRequests()
    {
        return $this->hasMany(Friendship::class, 'friend_id');
    }

    public function friends()
    {
        $sentFriends = $this->sentFriendRequests()
            ->where('status', 'accepted')
            ->with('friend')
            ->get()
            ->pluck('friend');

        $receivedFriends = $this->receivedFriendRequests()
            ->where('status', 'accepted')
            ->with('user')
            ->get()
            ->pluck('user');

        return $sentFriends->merge($receivedFriends);
    }
}
