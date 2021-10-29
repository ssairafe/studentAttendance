<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app" v-if="isFetched">
        <div class="container">
            <div class="row column-headers">
                <div class="col-3">
                    <h3>Student ID</h3>
                </div>
                <div class="col-3">
                    <h3>Student Name</h3>
                </div>
                <div class="col-3">
                    <h3>Student Email</h3>
                </div>
                <div class="col-3">
                    <h3>Attendance</h3>
                </div>
            </div>
            <div class="mobile-header">
                <h1>Your Students</h1>
            </div>
            <student-rows-component v-on:fetch="getStudentData" v-for="student in studentData" :student-info="student" :key="student.studentId"></student-rows-component>
        </div>
    </div>
    <script src="{{ mix('/js/app.js') }}"></script>
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>

</html>
