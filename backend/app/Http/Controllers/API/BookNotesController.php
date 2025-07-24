<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BookNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookNotesController extends Controller
{
    public function index(Request $request, $bookId)
    {
        $notes = BookNote::where('user_id', $request->user()->id)
            ->where('book_id', $bookId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notes);
    }

    public function store(Request $request, $bookId)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'page_number' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $note = BookNote::create([
            'user_id' => $request->user()->id,
            'book_id' => $bookId,
            'content' => $request->content,
            'page_number' => $request->page_number,
        ]);

        return response()->json($note, 201);
    }

    public function destroy(Request $request, $bookId, $noteId)
    {
        $note = BookNote::where('user_id', $request->user()->id)
            ->where('book_id', $bookId)
            ->where('id', $noteId)
            ->firstOrFail();

        $note->delete();

        return response()->json(['message' => 'Nota eliminada']);
    }
}
