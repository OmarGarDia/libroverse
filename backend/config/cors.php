<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    // Asegúrate que esta línea tenga todas las rutas que necesitas:
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:5173', // <--- ¡Verifica que esta URL sea EXACTA!
        'http://127.0.0.1:5173', // <--- ¡Añade esta por si acaso!
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // <--- ¡DEBE SER TRUE!
];
