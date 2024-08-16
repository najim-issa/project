<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserController 
{
    // Fetch all users
    public function getAllUsers()
    {
        try {
            $users = User::where('role', 'Customer')->get();

            return response()->json([
                'status' => true,
                'message' => 'Users fetched successfully',
                'data' => $users
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch users',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    // Update a user
    public function updateUser(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255',
                'password' => 'sometimes|string|min:6',
                'phone_number' => 'sometimes|string|max:15',
                'shehia' => 'sometimes|string|email|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'error' => $validator->errors()
                ], 401);
            }

            $user = User::findOrFail($id);

            // Update user attributes if provided
            if ($request->has('name')) {
                $user->name = $request->name;
            }
            if ($request->has('email')) {
                $user->email = $request->email;
            }
            if ($request->has('phone_number')) {
                $user->phone_number = $request->phone_number;
            }

            if ($request->has('shehia')) {
                $user->phone_number = $request->shehia;
            }
            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'User updated successfully',
                'data' => $user
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update user',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    // Delete a user
    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json([
                'status' => true,
                'message' => 'User deleted successfully',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete user',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
