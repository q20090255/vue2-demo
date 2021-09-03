<template>
  <div class="menuBoxClass">
    <el-menu
      class="menuClass"
      :unique-opened="true"
      :default-active="nowActive"
      @select="clickMenu"
    >
      <template v-for="(item, index) in routerList">
        <!-- 只做了两级菜单，级别多了记得加 -->
        <el-menu-item :key="index" v-if="!item.children" :index="item.id + '&&' + item.name">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
        <el-submenu :key="index" v-else-if="item.children" :index="item.id + '&&' + item.name">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 考虑美观二级往后可以选择 小标题，下拉，对话框 等不同形式的 -->
          <template v-for="(item1, index1) in item.children">
            <el-menu-item :key="index1" :index="item1.id + '&&' + item1.name">
              <span slot="title">{{ item1.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import router from '@/router/router'

  export default {
    name: 'my-menu',
    data() {
      return {
        nowActive: ''
      }
    },
    computed: {
      // 路由列表 - 感觉相当的耗性能
      routerList() {
        console.time('路由构建')
        let routerlist = JSON.parse(JSON.stringify(router[1].children))
        const addId = (list, faId = '') => {
          // @param faID 父级Id
          list.forEach((item, index) => {
            if (faId !== '') {
              item.id = `${faId}-${index}`
            } else {
              item.id = `${index}`
            }
            if (item.children?.length) {
              addId(item.children, index)
            }
          })
        }
        addId(routerlist)
        const filterShow = list => {
          list.forEach(item => {
            if (item.children?.length) {
              item.children = filterShow(item.children)
            }
          })
          return list.filter(x => x?.meta?.isShow ?? false)
        }
        let _routerList = filterShow(routerlist)
        console.timeEnd('路由构建')
        return _routerList
      }
    },
    methods: {
      // 点击路由
      clickMenu(key, keyPath) {
        // console.log('菜单信息', key, keyPath)
        this.nowActive = key
        let routerName = key.split('&&')[1]
        this.$router.push({ name: routerName })
      }
    },
    mounted() {}
  }
</script>
