<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\User;
// use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController{
    //
    public function register(Request $request){
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
                'role' => 'Customer',
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

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('LaravelAuthApp')->plainTextToken;
            // return response()->json(['token' => $token]);
            return response()->json([
                'status' => true,
                'message' => 'Successfull login',
                'user' => $user,
                'token' => $token
        ], 200);
        } else {
            return response()->json(['error' => 'Unauthorised'], 500);
        }
}

    // Get user details
    public function userDetails()
    {
        return 'protected page';
        // $user = Auth::user();
        // return response()->json(['user' => $user], 200);
    }

}