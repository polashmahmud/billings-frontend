<template>
    <div class="modal-overlay">
        <div class="custom-modal">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal"
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
    z-index: 10;
}

.custom-modal {
    position: relative;
    width: 500px;
    height: fit-content;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-top: 5%;
    padding: 20px;
}

</style>