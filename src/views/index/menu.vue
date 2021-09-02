<template>
  <div class="menuBoxClass">
    <el-menu class="menuClass" :default-active="nowActive" @open="handleOpen" @close="handleClose">
      <!--tempalte v-for="(item,index) in routerList">
        &lt;!&ndash; 只做了两级菜单，级别多了记几加 &ndash;&gt;
        <el-menu-item v-if="!item.children" :index="index">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{item.meta.title}}</span>
          </template>
        </el-menu-item>
        <el-submenu v-else-if="item.children" :index="index">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{item.meta.title}}</span>
          </template>
          &lt;!&ndash; 二级往后可以选择 小标题，下拉，对话框 等不同形式 &ndash;&gt;


          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </tempalte>-->
    </el-menu>
  </div>
</template>

<script>
  import router from '@/router/router'

  export default {
    name: 'my-menu',
    data() {
      return {
        nowActive: '1'
      }
    },
    computed: {
      // 路由列表
      routerList() {
        let targetList = router[1].children.filter(i => i?.meta?.isShow ?? false)
        targetList.forEach(i => {
          if (i.children) {
            i.children = i.children.filter(k => k.meta?.isShow ?? false)
          }
        })
        return targetList
      }
    },
    methods: {
      // 展开、收起 指定的菜单项
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    },
    mounted() {}
  }
</script>

<style scoped lang="scss">
  .menuBoxClass {
    .menuClass {
    }
  }
</style>
