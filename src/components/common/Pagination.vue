<template>
    <paginate
        :page-count="pageCount"
        :page-range="pageRange"
        :margin-pages="marginPages"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'page-item'"
        :prev-link-class="'page-link'"
        :next-class="'page-item'"
        :next-link-class="'page-link'"
        :active-class="'active'"
        :disabled-class="'disabled'"
    >
    </paginate>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
    name: "Pagination",
    props: ['pageCount', 'pageRange', 'marginPages'],
    components: {
        Paginate
    },
    methods: {
        changePage(page) {
            this.$emit('changePage', page)
        }
    }
}
</script>

<style scoped>

</style>