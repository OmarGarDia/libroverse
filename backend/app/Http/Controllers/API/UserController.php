<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();
        $currentYear = date('Y');

        if ($request->has('reading_goal') && $user->reading_goal_year != $currentYear) {
            $user->reading_goal_year = $currentYear;
            $user->books_read_current_year = 0;
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'bio' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'reading_preferences' => 'nullable|string|max:255',
            'reading_goal' => 'nullable|integer|min:1|max:1000',
        ]);

        // Actualizamos el usuario con los datos validados
        $user->update($validatedData);

        // Retornamos el usuario actualizado como JSON
        return response()->json($user);
    }

    public function updateAvatar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'La imagen debe ser de 5MB máximo',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = $request->user();

            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            $file = $request->file('avatar');
            $filename = 'avatar_' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('avatars', $filename, 'public');

            $user->avatar = $path;
            $user->save();

            return response()->json([
                'message' => 'Avatar actualizado exitosamente',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'avatar' => $user->avatar ? asset('storage/' . $user->avatar) : null,
                    'bio' => $user->bio ?? null,
                    'books_read' => $user->books_read ?? 0,
                    'reading_goal' => $user->reading_goal ?? 50,
                    'reading_goal_year' => $user->reading_goal_year ?? date('Y'),
                    'books_read_current_year' => $user->books_read_current_year ?? 0,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el avatar',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateReadingGoal(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'reading_goal' => 'required|integer|min:1|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = $request->user();
            $currentYear = date('Y');

            // Si es un nuevo año, resetear el progreso
            if ($user->reading_goal_year != $currentYear) {
                $user->reading_goal_year = $currentYear;
                $user->books_read_current_year = 0;
            }

            $user->reading_goal = $request->reading_goal;
            $user->save();

            return response()->json([
                'message' => 'Meta de lectura actualizada correctamente',
                'reading_goal' => $user->reading_goal,
                'reading_goal_year' => $user->reading_goal_year,
                'books_read_current_year' => $user->books_read_current_year,
                'progress_percentage' => round(($user->books_read_current_year / $user->reading_goal) * 100, 1),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error interno del servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
