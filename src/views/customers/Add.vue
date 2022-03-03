<template>
    <div>
        <button @click="showModal = true">Open Modal</button>
        <modal v-if="showModal">
            <button @click="showModal = false">Close</button>
        </modal>
    </div>
</template>

<script>
import Modal from "../../components/common/Modal";
export default {
    name: "Add",
    components: {Modal},
    data() {
        return {
            showModal: false,
        }
    }
}
</script>

<style scoped>

</style>