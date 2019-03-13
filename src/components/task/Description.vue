<template>
    <div v-html="description"></div>
</template>

<script>
    export default {
        name: "description",
        props:{
          description:String
        }
    }
</script>

<style scoped>

</style>
