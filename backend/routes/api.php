<?php

use App\Http\Controllers\API\LibraryController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\API\BookNotesController;
use App\Http\Controllers\API\FriendshipController;
use App\Http\Controllers\API\ReadingProgressController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [RegisteredUserController::class, 'store'])->middleware('api.guest'); // Esto será /api/register

Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('api.guest'); // Esto será /api/login

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']) // Esto será /api/logout
    ->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) { // Esto será /api/user
    return $request->user();
});

Route::prefix('library')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [LibraryController::class, 'index']);
    Route::post('/books', [LibraryController::class, 'addBook']);
    Route::put('/books/{userBook}/progress', [LibraryController::class, 'updateProgress']);
    Route::put('/books/{userBook}/rating', [LibraryController::class, 'rateBook']);
    Route::put('/books/{userBook}/status', [LibraryController::class, 'updateStatus']);
    Route::delete('/books/{userBook}', [LibraryController::class, 'removeBook']);
    Route::get('/stats', [LibraryController::class, 'getStats']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/user', [UserController::class, 'update']);
    Route::post('/user/avatar', [UserController::class, 'updateAvatar']);
    Route::put('/user/reading-goal', [UserController::class, 'updateReadingGoal']);
});


Route::prefix('books/{bookId}/notes')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [BookNotesController::class, 'index']);
    Route::post('/', [BookNotesController::class, 'store']);
    Route::delete('/{noteId}', [BookNotesController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/reading-progress/{userBookId}', [ReadingProgressController::class, 'getProgress']);
});


Route::middleware('auth:sanctum')->prefix('friends')->group(function () {
    Route::get('/', [FriendshipController::class, 'index']);
    Route::get('/search', [FriendshipController::class, 'search']);
    Route::post('/request', [FriendshipController::class, 'sendRequest']);
    Route::post('/accept/{friendshipId}', [FriendshipController::class, 'acceptRequest']);
    Route::post('/reject/{friendshipId}', [FriendshipController::class, 'rejectRequest']);
    Route::get('/pending', [FriendshipController::class, 'pendingRequests']);
    Route::delete('/remove/{friendId}', [FriendshipController::class, 'removeFriend']);
});
