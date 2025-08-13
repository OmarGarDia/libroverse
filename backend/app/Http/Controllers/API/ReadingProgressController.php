<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ReadingProgress;
use Illuminate\Http\Request;

class ReadingProgressController extends Controller
{
    public function getProgress(Request $request, $userBookId)
    {
        try {
            $progressHistory = ReadingProgress::where('user_book_id', $userBookId)->orderBy('reading_date', 'desc')->get();

            return response()->json($progressHistory);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al cargar el historial de progreso',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
