<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\CollectorController;
use App\Http\Controllers\Api\CollectionRequestController;
use App\Http\Controllers\Api\SignupController;
use App\Http\Controllers\Api\HouseholderController;
use App\Http\Controllers\Api\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// public route 
Route::post('register', [RegisterController::class, 'register']);
Route::post('login',    [RegisterController::class, 'login']);
Route::apiResource('collectors', CollectorController::class);

Route::post('request-service', [CollectionRequestController::class, 'store']);
Route::get('request/{id}', [CollectionRequestController::class, 'index']);
Route::delete('request/{id}', [CollectionRequestController::class, 'destroy']);
Route::patch('/householders/{id}/additional', [HouseholderController::class, 'storeAdditionalInfo']);

// protected routes 
Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::get('userDetails',    [RegisterController::class, 'userDetails']);

});

  //angular api 
 Route::post('signup', [SignupController::class, 'signup']);
 Route::post('login1', [SignupController::class, 'login']);
 //user details 
 Route::get('/users', [UserController::class, 'getAllUsers']);  // Fetch all users
 Route::put('/users/{id}', [UserController::class, 'updateUser']);  // Update user
 Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
 //collector details 
 Route::get('/collectors', [CollectorController::class, 'index']);
 Route::get('/collectors/{collectorId}', [CollectorController::class, 'show']);
 Route::post('/collectors', [CollectorController::class, 'store']);
 Route::put('/collectors/{collectorId}', [CollectorController::class, 'update']);
 Route::delete('/collectors/{collectorId}', [CollectorController::class, 'destroy']);
