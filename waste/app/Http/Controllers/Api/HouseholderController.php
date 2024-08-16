<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
// use App\Http\Controllers\Controller;
use App\Models\User;

class HouseholderController
{
    public function storeAdditionalInfo(Request $request, $id)
    {
       // Validate and process the request
       $validatedData = $request->validate([
        'shehia' => 'required|string|max:255',
        'streetRoad' => 'required|string|max:255',
        'houseNumber' => 'required|string|max:255',
    ]);



    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 400);
    }

    // Update user details or save additional info
    $user->shehia = $validatedData['shehia'];
    $user->streetRoad = $validatedData['streetRoad'];
    $user->houseNumber = $validatedData['houseNumber'];
    $user->save();

    return response()->json(['message' => 'Householder details updated successfully'], 200);
}
}
