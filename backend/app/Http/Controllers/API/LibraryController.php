<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserBook;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $status = $request->get('status', 'all');

        $query = UserBook::with(['book.authors', 'book.genres'])->where('user_id', $user->id);

        if ($status !== 'all') {
            $query->where('status', $status);
        }

        $userBooks = $query->orderBy('updated_at', 'desc')->paginate(20);
        return response()->json($userBooks);
    }

    public function addBook(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'status' => 'required|in:want_to_read,reading,abandoned,on_hold,completed',
        ]);

        $user = $request->user();
        $userBook = UserBook::updateOrCreate([
            'user_id' => $user->id,
            'book_id' => $request->book_id,
        ], [
            'status' => $request->status,
            'started_reading_at' => $request->status === 'reading' ? now() : null
        ]);

        return response()->json([
            'user_book' => $userBook->load(['book.authors', 'book.genres']),
            'message' => 'Libro agregado a tu biblioteca',

        ]);
    }

    public function updateProgress(Request $request, UserBook $userBook)
    {
        $this->authorize('update', $userBook);

        $request->validate([
            'current_page' => 'required|integer|min:0',
            'status' => 'sometimes|in:want_to_read,reading,read,abandoned,on_hold'
        ]);

        $userBook->update([
            'current_page' => $request->current_page,
            'status' => $request->get('status', $userBook->status),
            'finished_reading_at' => $request->status === 'read' ? now() : null
        ]);

        // Actualizar contador de libros leídos del usuario
        if ($request->status === 'read' && $userBook->wasChanged('status')) {
            $userBook->user->increment('books_read');
        }

        return response()->json([
            'user_book' => $userBook->fresh()->load(['book.authors']),
            'message' => 'Progreso actualizado'
        ]);
    }

    public function rateBook(Request $request, UserBook $userBook)
    {
        $this->authorize('update', $userBook);

        $request->validate([
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'nullable|string|max:1000'
        ]);

        $userBook->update([
            'user_rating' => $request->rating,
            'user_review' => $request->review
        ]);

        // Actualizar rating promedio del libro
        $userBook->book->updateRating();

        return response()->json([
            'user_book' => $userBook->fresh(),
            'message' => 'Calificación guardada'
        ]);
    }

    public function removeBook(UserBook $userBook)
    {
        $this->authorize('delete', $userBook);

        $userBook->delete();

        return response()->json([
            'message' => 'Libro eliminado de tu biblioteca'
        ]);
    }

    public function getStats(Request $request)
    {
        $user = $request->user();

        $stats = [
            'total_books' => UserBook::where('user_id', $user->id)->count(),
            'books_read' => UserBook::where('user_id', $user->id)->read()->count(),
            'books_reading' => UserBook::where('user_id', $user->id)->currentlyReading()->count(),
            'want_to_read' => UserBook::where('user_id', $user->id)->wantToRead()->count(),
            'favorite_books' => UserBook::where('user_id', $user->id)->favorites()->count(),
            'average_rating' => UserBook::where('user_id', $user->id)->whereNotNull('user_rating')->avg('user_rating'),
            'pages_read_this_year' => $this->getPagesReadThisYear($user->id),
        ];

        return response()->json($stats);
    }

    private function getPagesReadThisYear($userId)
    {
        return UserBook::where('user_id', $userId)
            ->where('status', 'read')
            ->whereYear('finished_reading_at', now()->year)
            ->with('book')
            ->get()
            ->sum('book.pages');
    }
}
