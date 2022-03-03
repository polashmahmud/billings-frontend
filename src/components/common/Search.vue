<template>
    <div class="d-flex align-items-center border bg-white">
        <input
            type="text"
            v-model="search"
            class="w-100 border-0 p-2"
            placeholder="Search customer ..."
        >

        <div style="width: 20px; height: 20px; margin-left: 15px; margin-right: 15px" v-if="changeSearchIcon" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <svg v-else style="width: 20px; height: 20px; margin-left: 15px; margin-right: 15px" fill="none"
             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>

    </div>
</template>

<script>
export default {
    name: "Search",
    props: ["currentPage"],
    data() {
        return {
            search: '',
            timer: null,
            changeSearchIcon: false
        }
    },
    methods: {
        searchWithTimer(search) {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.$emit('change', {page: this.currentPage, search: search})
                this.timer = null;
            }, 800);
        }
    },
    watch: {
        'currentPage': {
            handler(currentPage) {
                this.$emit('change', {page: currentPage, search: this.search})
            }
        },
        'search': {
            handler(value) {
                this.searchWithTimer(value)
            }
        },
        'timer': {
            handler(value) {
                this.changeSearchIcon = value !== null;
            }
        }
    }
}
</script>

<style scoped>

</style>