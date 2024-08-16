<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
// use App\Http\Controllers\Controller;

class SignupController {
    
   
    public function signup(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:6',
                'phone_number'=> 'required'
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'error' => $validator->errors()
                ], 401);
            }
            
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request ->phone_number,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'message' => 'User registered successfull',
                'data' => $user,
                'token' => $user->createToken('LaravelAuthApp')->plainTextToken
            ], 200);

        }catch(\Throwable $th){
            return response()->json([
                'status' => false,
                'message' => 'Validation error'
               // 'message' => $th->getMessage()
            ], 500);
        }
    }

    // Login user and create token
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::where('email', $request->email)->where('role', 'admin')->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('LaravelAuthApp')->plainTextToken;
            return response()->json([
                'status' => true,
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
    }

    // Get user details (protected route)
    public function userDetails(Request $request)
    {
        $user = $request->user();  // Requires authentication

        return response()->json([
            'status' => true,
            'user' => $user
        ], 200);
    }
}
