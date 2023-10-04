<template>
    <router-view :key="$route.path"></router-view>
</template>

<script>
export default {
    data: () => ({}),

    methods: {}
}
</script>
<style scoped lang="css">
.split-bg {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
}
</style>
