/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('student-rows-component', {
    data: function () {
        return {count: 0};
    },
    props: ['studentInfo'],
    template: `
    <div class="student-row">
    <div class="desktop-student-display row justify-content-center">
        <div class="col-3">
            <p>{{studentInfo.studentId}}</p>
        </div>
        <div class="col-3">
            <h4>{{studentInfo.firstName}} {{studentInfo.lastName}}</h4>
        </div>
        <div class="col-3 student-email-container">
            <a class="student-email" :href="'mailto:{{studentInfo.email}}'">{{studentInfo.email}}</a>
        </div>
        <div class="col-3">
            <div v-if="studentInfo.attendance === null">
                <api-button class="mark-present-button btn btn-success" buttonTitle="Mark Present" @click.native="markPresent(studentInfo.studentId)"></api-button>
                <api-button class="mark-absent-button btn btn-danger" buttonTitle="Mark Absent" @click.native="markAbsent(studentInfo.studentId)"></api-button>
            </div>
            <div v-else-if="studentInfo.attendance === 0">
                Absent
            </div>
            <div v-else>
                Present
            </div>
        </div>
    </div>
    <div class="mobile-student-display row">
        <div class="col-8">
            <h5>{{studentInfo.firstName}} {{studentInfo.lastName}}</h5>
            <p>{{studentInfo.studentId}}</p>
            <a class="student-email" :href="'mailto:{{studentInfo.email}}'">{{studentInfo.email}}</a>
        </div>
        <div class="col-4">
            <div v-if="studentInfo.attendance === null">
            <api-button class="mark-present-button btn btn-success" buttonTitle="Mark Present" @click.native="markPresent(studentInfo.studentId)"></api-button>
            <api-button class="mark-absent-button btn btn-danger" buttonTitle="Mark Absent" @click.native="markAbsent(studentInfo.studentId)"></api-button>
            </div>
            <div v-else-if="studentInfo.attendance === 0">
                Absent
            </div>
            <div v-else>
                Present
            </div>
        </div>
    </div>
    </div>
    `,
    methods: {
        markAbsent(id) {
            fetch(`/students/markAbsent/${id}`).then(res => {
                return this.$emit('fetch');
            });
        },
        markPresent(id) {
            fetch(`/students/markPresent/${id}`).then(res => {
                return this.$emit('fetch');
            });
        }
    }
});

Vue.component('api-button', {
    props: ['buttonTitle'],
    template: `<button>{{buttonTitle}}</button>`
});



const app = new Vue({
    el: '#app',
    data: function () {
        return {
            studentData: [],
            isFetched: false,
        }
    },
    async created() {
        this.getStudentData();
    },
    methods: {
        async getStudentData() {
            const res = await fetch('/students');
            const data = await res.json();
            this.studentData = [];
            this.studentData.push(...data);
            this.isFetched = true;
        }
    }
});
