import Vue from 'vue';
import _ from 'lodash';

Vue.filter('ucFirst', (value) => {
    return _.upperFirst(value);
})