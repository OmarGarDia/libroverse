<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();

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
        ]);

        // Actualizamos el usuario con los datos validados
        $user->update($validatedData);

        // Retornamos el usuario actualizado como JSON
        return response()->json($user);
    }
}
