<template>
  <div class="viewClass errorBoxClass">
    <p class="title">Σ(っ°Д°)っ: “404啦!!!”</p>
  </div>
</template>

<script>
  export default {
    name: 'fourZeroFour'
  }
</script>

<style scoped lang="scss">
  .errorBoxClass {
    position: relative;

    .title {
      @include all_middle;
      color: $deep-indigo;
      font-size: 50px;
    }
  }
</style>
