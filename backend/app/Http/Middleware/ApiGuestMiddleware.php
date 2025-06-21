<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiGuestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->session()->has('login_web_user_id')) {
            return response()->json(['message' => 'Ya estás autenticado'], 403);
        }

        // Alternativamente, para usuarios autenticados por token
        // if ($request->user() && $request->user()->tokenCan('some-scope')) { ... }

        return $next($request);
    }
}
