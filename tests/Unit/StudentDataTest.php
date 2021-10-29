<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Http\Response;


class StudentDataTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_data()
    {
        $this->json('get', '/students')
        ->assertStatus(Response::HTTP_OK);
    }
}
