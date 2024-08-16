<?php

namespace Database\Factories;

use App\Models\Collector;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CollectorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Collector::class;

    public function definition(): array
    {
        return [
            //
            'userId' => User::factory(), // Assumes you have a User factory
            'vehicleId' => $this->faker->randomNumber(),
            'EmployeeId' => $this->faker->randomNumber(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
