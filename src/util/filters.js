import Vue from 'vue';
import _ from 'lodash';
import moment from "moment";

Vue.filter('ucFirst', (value) => {
    return _.upperFirst(value);
})

Vue.filter('diffForHuman', (value) => {
    return moment(value).fromNow();
})