import Vue from 'vue';
import _ from 'lodash';
import moment from "moment";

Vue.filter('ucFirst', (value) => {
    return _.upperFirst(value);
})

Vue.filter('diffForHuman', (value) => {
    return moment(value).fromNow();
})

Vue.filter('formatMonth', (value) => {
    return moment(value).format('MMM-YYYY');

})

Vue.filter('dateWithMonth', (value) => {
    if (value !== null && value !== 'N/A') return moment(value).format('DD MMM,  YYYY')
})