<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\CollectionRequest;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class CollectionRequestController
{
    public function store(Request $request) {

  try{

    $validator = Validator::make($request->all(), [
        'collectorId' => 'required',
        'userId' => 'required' 
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'error' => $validator->errors()
        ], 401);
    }

    $user = User::find($request->userId);

    // Check if the shehia or streetRoad columns are empty
    if (empty($user->shehia) || empty($user->streetRoad)) {
        // Redirect back to the previous page with an error message
        return response()->json([
            'status' => false,
            'message' => 'Please fill in the required fields: Shehia and Street/Road.'
        ], 500);
        
    }

    $collectionRequest = CollectionRequest::create([
        'userId' => $request-> userId,
        'collectorId' => $request->collectorId,
        'status' => "Pending",
        
    ]);

    return response()->json([
        'message' => 'Request successfull',
    ], 200);

  }  catch(\Throwable $th){
    return response()->json([
        'status' => false,
        // 'message' => 'Validation error'
       'message' => $th->getMessage()
    ], 500);
}
}

public function index($id)
{
    $requests = CollectionRequest::where('userId', $id)->with(['user', 'collector.user'])->orderBy('RequestId', 'desc')->get();

    $result = $requests->map(function($request) {
        return [
            'collectorId' => $request->collectorId,
            'name' => $request->collector->user->name,
            'email' => $request->collector->user->email,
            'phone_number' => $request->collector->user->phone_number,
            'status' => $request->status
        ];
    });

    return response()->json($result);
}

// Delete a specific collection request
public function destroy($id)
{
    try {
        $collectionRequest = CollectionRequest::findOrFail($id);
        $collectionRequest->delete();

        return response()->json([
            'message' => 'Request deleted successfully',
        ], 200);

    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 500);
    }
}
}
