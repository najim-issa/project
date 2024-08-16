<?php

namespace App\Http\Controllers;

use App\Models\Collector;
use App\Models\User;
use Illuminate\Http\Request;

class CollectorController extends Controller
{
    // Fetch all collectors with their associated user data
    public function index()
    {
        $collectors = Collector::with('user:id,name,email, phone_number', 'shehia')->get();

        $result = $collectors->map(function($collector) {
            return [
                // 'collectorId' => $collector->collectorId,
                'name' => $collector->user->name,
                'email' => $collector->user->email,
                'phone_number' => $collector->user->phone_number,
                'shehia' => $collector->user->shehia,
            ];
        });

        return response()->json($result);
    }

    // Fetch a specific collector by collectorId
    public function show($collectorId)
    {
        $collector = Collector::with('user:id,name,email, phone_number')->find($collectorId);

        if ($collector) {
            $result = [
                'collectorId' => $collector->collectorId,
                'name' => $collector->user->name,
                'email' => $collector->user->email,
                'phone_number' => $collector->user->phone_number, 
            ];
            return response()->json($result);
        } else {
            return response()->json(['message' => 'Collector not found'], 404);
        }
    }

    // Add a new collector
    public function store(Request $request)
    {
        $validated = $request->validate([
            'userId' => 'required|exists:users,id',
            // Any additional fields needed from the Collector model
        ]);

        $collector = Collector::create($validated);

        $user = User::find($validated['userId']);

        $result = [
            'collectorId' => $collector->collectorId,
            'name' => $user->name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
        ];

        return response()->json($result, 201);
    }

    // Update an existing collector's data
    public function update(Request $request, $collectorId)
    {
        $collector = Collector::find($collectorId);

        if (!$collector) {
            return response()->json(['message' => 'Collector not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required',
            'email' => 'sometimes|required|email',
            'phone_number' => 'sometimes|required|phone_number',
        ]);

        $collector->update($validated);

        $user = User::find($collector->userId);

        if ($user) {
            $user->update($validated);
        }

        $result = [
            'collectorId' => $collector->collectorId,
            'name' => $user->name,
            'email' => $user->email,
            'phone_number'=> $user->phone_number
        ];

        return response()->json($result);
    }

    // Delete a collector and its associated user data
    public function destroy($collectorId)
    {
        $collector = Collector::find($collectorId);

        if (!$collector) {
            return response()->json(['message' => 'Collector not found'], 404);
        }

        $collector->delete();

        return response()->json(['message' => 'Collector deleted']);
    }
}

