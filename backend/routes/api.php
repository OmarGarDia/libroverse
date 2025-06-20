<?php

use App\Http\Controllers\API\LibraryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

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

Route::post('/login', [AuthenticatedSessionController::class, 'store']) // Esto será /api/login
    ->middleware('guest');

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
    Route::delete('/books/{userBook}', [LibraryController::class, 'removeBook']);
    Route::get('/stats', [LibraryController::class, 'getStats']);
});
