<?php

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

Route::get('/sanctum/csrf-cookie', function (Request $request) { // Esto será /sanctum/csrf-cookie
    return response()->noContent();
});

Route::post('/register', [RegisteredUserController::class, 'store']) // Esto será /api/register
    ->middleware('guest');

Route::post('/login', [AuthenticatedSessionController::class, 'store']) // Esto será /api/login
    ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']) // Esto será /api/logout
    ->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) { // Esto será /api/user
    return $request->user();
});
