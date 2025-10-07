<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Friendship;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendshipController extends Controller
{

    public function index(): JsonResponse
    {
        $user = Auth::user();

        $friends = User::whereIn('id', function ($query) use ($user) {
            $query->select('friend_id')
                ->from('friendships')
                ->where('user_id', $user->id)
                ->where('status', 'accepted')
                ->union($query->newQuery()->select('user_id')
                    ->from('friendships')
                    ->where('friend_id', $user->id)
                    ->where('status', 'accepted'));
        })->select('id', 'name', 'username', 'avatar', 'books_read')->get();

        return response()->json($friends);
    }

    public function search(Request $request): JsonResponse
    {
        $query = $request->get('q');
        $user = Auth::user();

        if (!$query) {
            return response()->json([]);
        }

        $users = User::where('id', '!=', $user->id)
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('username', 'like', "%{$query}%");
            })
            ->select('id', 'name', 'username', 'avatar', 'books_read')
            ->limit(10)
            ->get();

        $users->map(function ($searchUser) use ($user) {
            $friendship = Friendship::where(function ($q) use ($user, $searchUser) {
                $q->where('user_id', $user->id)->where('friend_id', $searchUser->id);
            })->orWhere(function ($q) use ($user, $searchUser) {
                $q->where('user_id', $searchUser->id)->where('friend_id', $user->id);
            })->first();

            $searchUser->friendship_status = $friendship ? $friendship->status : null;
            return $searchUser;
        });

        return response()->json($users);
    }

    public function sendRequest(Request $request): JsonResponse
    {
        $request->validate([
            'friend_id' => 'required|exists:users,id'
        ]);

        $user = Auth::user();
        $friendId = $request->friend_id;

        if ($user->id == $friendId) {
            return response()->json(['error' => 'No puedes enviarte una solicitud a ti mismo'], 400);
        }

        // Verificar si ya existe una amistad
        $existingFriendship = Friendship::where(function ($q) use ($user, $friendId) {
            $q->where('user_id', $user->id)->where('friend_id', $friendId);
        })->orWhere(function ($q) use ($user, $friendId) {
            $q->where('user_id', $friendId)->where('friend_id', $user->id);
        })->first();

        if ($existingFriendship) {
            return response()->json(['error' => 'Ya existe una relación de amistad'], 400);
        }

        $friendship = Friendship::create([
            'user_id' => $user->id,
            'friend_id' => $friendId,
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Solicitud enviada correctamente', 'friendship' => $friendship]);
    }

    public function acceptRequest($friendshipId): JsonResponse
    {
        $user = Auth::user();

        $friendship = Friendship::where('id', $friendshipId)
            ->where('friend_id', $user->id)
            ->where('status', 'pending')
            ->first();

        if (!$friendship) {
            return response()->json(['error' => 'Solicitud no encontrada'], 404);
        }

        $friendship->update([
            'status' => 'accepted',
            'accepted_at' => now()
        ]);

        return response()->json(['message' => 'Solicitud aceptada', 'friendship' => $friendship]);
    }

    public function rejectRequest($friendshipId): JsonResponse
    {
        $user = Auth::user();

        $friendship = Friendship::where('id', $friendshipId)
            ->where('friend_id', $user->id)
            ->where('status', 'pending')
            ->first();

        if (!$friendship) {
            return response()->json(['error' => 'Solicitud no encontrada'], 404);
        }

        $friendship->delete();

        return response()->json(['message' => 'Solicitud rechazada']);
    }

    public function pendingRequests(): JsonResponse
    {
        $user = Auth::user();

        $requests = Friendship::where('friend_id', $user->id)
            ->where('status', 'pending')
            ->with('user:id,name,username,avatar')
            ->get();

        return response()->json($requests);
    }

    public function removeFriend($friendId): JsonResponse
    {
        $user = Auth::user();

        $friendship = Friendship::where(function ($q) use ($user, $friendId) {
            $q->where('user_id', $user->id)->where('friend_id', $friendId);
        })->orWhere(function ($q) use ($user, $friendId) {
            $q->where('user_id', $friendId)->where('friend_id', $user->id);
        })->first();

        if (!$friendship) {
            return response()->json(['error' => 'Amistad no encontrada'], 404);
        }

        $friendship->delete();

        return response()->json(['message' => 'Amistad eliminada']);
    }
}
