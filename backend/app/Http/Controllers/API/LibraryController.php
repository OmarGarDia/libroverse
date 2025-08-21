<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ReadingProgress;
use App\Models\User;
use App\Models\UserBook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        try {
            if ($userBook->user_id !== $request->user()->id) {
                return response()->json([
                    'message' => 'No autorizado'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'progress' => 'required|integer|min:0|max:100',
                'current_page' => 'nullable|integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $progress = $request->progress;
            $currentPage = $request->current_page ?? 0;

            $status = 'reading';
            if ($progress === 0) {
                $status = 'want_to_read';
            } else if ($progress === 100) {
                $status = 'completed';
            }

            $updateData = [
                'current_page' => $currentPage,
                'status' => $status,
            ];

            if ($status === 'reading' && !$userBook->started_reading_at) {
                $updateData['started_reading_at'] = now();
            } elseif ($status === 'completed' && !$userBook->finished_reading_at) {
                $updateData['finished_reading_at'] = now();
                if (!$userBook->started_reading_at) {
                    $updateData['started_reading_at'] = now();
                }
            }

            $userBook->update($updateData);

            if ($currentPage > 0) {
                $today = now()->toDateString();

                ReadingProgress::updateOrCreate(
                    [
                        'user_book_id' => $userBook->id,
                        'reading_date' => $today
                    ],
                    [
                        'pages_read' => $currentPage,
                        'total_pages' => $userBook->book->pages ?? 0,
                        'progress_percentage' => ($userBook->book->pages > 0) ?
                            round(($currentPage / $userBook->book->pages) * 100, 2) : 0
                    ]
                );
            }
            return response()->json([
                'user_book' => $userBook->fresh(),
                'message' => 'Progreso actualizado'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar el progreso',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function rateBook(Request $request, UserBook $userBook)
    {
        try {
            if ($userBook->user_id !== $request->user()->id) {
                return response()->json([
                    'message' => 'No autorizado'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'rating' => 'required|integer|min:1|max:5'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userBook->update([
                'user_rating' => $request->rating
            ]);

            return response()->json([
                'message' => 'Calificación actualizada correctamente',
                'userBook' => $userBook->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al calificar el libro',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function removeBook(Request $request, UserBook $userBook)
    {
        try {
            if ($userBook->user_id !== $request->user()->id) {
                return response()->json([
                    'message' => 'No autorizado'
                ], 403);
            }

            $userBook->delete();

            return response()->json([
                'message' => 'Libro eliminado de la biblioteca correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el libro',
                'error' => $e->getMessage()
            ], 500);
        }
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

    private function updateStatus(Request $request, Userbook $userBook)
    {
        try {
            if ($userBook->user_id !== $request->user()->id) {
                return response()->json([
                    'message' => 'No autorizado'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'status' => 'required|in:want_to_read, reading, abandoned, on_hold, completed'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $updateData = ['status' => $request->status];

            if ($request->status === 'reading' && !$userBook->started_reading_at) {
                $updateData['started_reading_at'] = now();
            } elseif ($request->status === 'completed' && !$userBook->finished_reading_at) {
                $updateData['finished_reading_at'] = now();
                if (!$userBook->started_reading_at) {
                    $updateData['started_reading_at'] = now();
                }
            }

            $userBook->update($updateData);

            return response()->json([
                'message' => 'Estado actualizado correctamente',
                'userBook' => $userBook->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el estado',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
