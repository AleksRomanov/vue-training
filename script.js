import Vue from "vue";
import meetupsData from "./api/meetups-data";

const app = new Vue({
    el: '#app',
    data() {
        return {
          meetups: meetupsData,
        };
    }
});

window.app = app;
