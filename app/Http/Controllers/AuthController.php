<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    /***
    * Create a new AuthController instance.
    *
    * @return void
    */
   public function __construct()
   {
       $this->middleware('auth:api', ['except' => ['login','register']]);
   }

   /**
    * Get a JWT via given credentials.
    *
    * @return \Illuminate\Http\JsonResponse
    */
   public function login()
   {
       $credentials = request(['email', 'password']);

       if (! $token = auth()->attempt($credentials)) {
           return response()->json(['error' => 'Unauthorized'], 401);
       }

       return $this->respondWithToken($token);
   }
   public function register(){
        User::create([
            'login' => request('login'),
            'name' => request('name'),
            'lastName' => request('lastName'),
            'email' => request('email'),
            'adress' => request('adress'),
            'phoneNumber' => request('phoneNumber'),
            'password' => Hash::make(request('password'))
        ]);
       return $this->login(request());
   }
   /**
    * Get the authenticated User.
    *
    * @return \Illuminate\Http\JsonResponse
    */
   public function me()
   {
       return response()->json(auth()->user());
   }
   /**
    * Get the authenticated User.
    *
    * @return \Illuminate\Http\JsonResponse
    */
   public function update(Request $request)
   {
        auth()->user()->update($request->all());
        return response()->json(
            [
                'status' => 'user profile was updated',
                'user' => auth()->user()
            ]
        ,200);
   }

   /**
    * Log the user out (Invalidate the token).
    *
    * @return \Illuminate\Http\JsonResponse
    */
   public function logout()
   {
    //    auth()->logout();

    //    return response()->json(['message' => 'Successfully logged out']);
       auth()->logout();

        $data = [

        'status' => true,

        'code' => 200,

        'data' => [

        'message' => 'Successfully logged out'

        ],

        'err' => null

        ];

        return response()->json($data);
   }

   /**
    * Refresh a token.
    *
    * @return \Illuminate\Http\JsonResponse
    */
   public function refresh()
   {
       return $this->respondWithToken(auth()->refresh());
   }

   /**
    * Get the token array structure.
    *
    * @param  string $token
    *
    * @return \Illuminate\Http\JsonResponse
    */
   protected function respondWithToken($token)
   {
       return response()->json([
           'access_token' => $token,
           'token_type' => 'bearer',
           'expires_in' => auth()->factory()->getTTL() * 60,
           'user' => auth()->user()
       ]);
   }
}
