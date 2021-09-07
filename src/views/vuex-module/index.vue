<template>
  <div class="viewClass">
    <div class="topBox viewClass">
      <div class="line"></div>
      <p>moduleA：{{ testModule }}</p>
      <div class="line"></div>
      <p>moduleB：{{ userModule }}</p>
      <div class="line"></div>
    </div>
    <div class="bottomBox">
      <div class="leftBox">
        <page-a></page-a>
      </div>
      <div class="rightBox">
        <page-b></page-b>
      </div>
    </div>
  </div>
</template>

<script>
  import page1 from './page1'
  import page2 from './page2'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'vuex-module-big-page',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        userModule: state => state.userModule,
        testModule: state => state.testModule
      }),
      ...mapGetters({
        getUserAge: 'getUserAge'
      })
    },
    methods: {},
    components: {
      'page-a': page1,
      'page-b': page2
    }
  }
</script>

<style scoped lang="scss">
  .topBox {
    border-radius: 10px;
    border: 1px solid $deep-orange;
    margin-bottom: 10px;
    height: 200px !important;
    overflow: auto;
  }

  .bottomBox {
    display: flex;

    .leftBox,
    .rightBox {
      flex: 0.5;
      margin: 5px;
    }
  }

  ::v-deep .btnClass,
  ::v-deep .inputClass {
    margin: 10px;
    margin-left: 0;
  }
</style>
