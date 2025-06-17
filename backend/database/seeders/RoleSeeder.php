<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'reader', 'display_name' => 'Lector'],
            ['name' => 'moderator', 'display_name' => 'Moderador'],
            ['name' => 'admin', 'display_name' => 'Administrador'],
            ['name' => 'super_admin', 'display_name' => 'Super Administrador'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
