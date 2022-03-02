import Vue from "vue";

// Return validation errors
Vue.prototype.$getValidationErrors = (errors = [], checkValue = {}) => {
    const getErrors = {};
    if (errors.response.status === 422) {
        let allErrors = errors.response.data.errors;

        for (const error in checkValue) {
            if (allErrors[error] !== undefined) {
                getErrors[error] = allErrors[error][0];
            } else {
                getErrors[error] = '';
            }
        }
    }

    return getErrors;
}