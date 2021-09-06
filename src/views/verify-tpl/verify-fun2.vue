<template>
  <div class="viewClass myViewClass">
    <h3>手工验证 比较灵活</h3>
    <div class="line"></div>
    <el-select class="selectClass" v-model="selVal" placeholder="请选择">
      <el-option
        v-for="(item, index) in selOpt"
        :key="index"
        :label="item.title"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input class="inputClass" v-model.trim="inpVal"></el-input>
    <el-button class="btnClass" @click="handleClick">确认</el-button>
    <div class="line"></div>
    <p class="title">身份证</p>
    <el-input class="inputClass" v-model.trim="inpVal2"></el-input>
    <el-button class="btnClass" @click="handleClick2">确认2</el-button>
    <el-button class="btnClass" @click="resetInpVal2">重置</el-button>
    <div class="line"></div>
  </div>
</template>

<script>
  import * as funjs from './funJS'

  export default {
    name: 'verify-fun2',
    data() {
      return {
        selVal: '',
        selOpt: [
          {
            title: '特殊字符',
            value: 'valSpecail'
          },
          {
            title: '小数',
            value: 'valDou'
          },
          {
            title: '输邮箱',
            value: 'valEmail'
          },
          {
            title: '输手机',
            value: 'valPhone'
          }
        ],
        inpVal: '',
        inpVal2: ''
      }
    },
    methods: {
      handleClick(keyName) {
        let selVal = this.selVal
        let inpVal = this.inpVal

        if (!selVal || !inpVal) return this.$message.warning('左倆不能为空')
        let { status, msg } = funjs[selVal](inpVal)

        if (!status) {
          this.$message.error(msg)
        } else {
          this.$message.success('欧了')
        }
      },
      handleClick2() {
        let IDCardNo = this.inpVal2
        if (!IDCardNo) return this.$message.warning('左边不能为空')

        let IdCardClass = new funjs['IdCardClass'](IDCardNo)
        let isValid = IdCardClass.isValid()

        console.log(`
          填没填对：${isValid}
        `)
      },
      resetInpVal2() {
        this.inpVal2 = ''
      }
    },
    mounted() {}
  }
</script>

<style scoped lang="scss">
  .myViewClass {
    .selectClass,
    .inputClass,
    .btnClass,
    .title {
      margin: 5px;
      display: inline-block;
      vertical-align: middle;
    }

    .inputClass {
      width: 200px;
    }

    .title {
      line-height: 40px;
      color: $deep-rock;
    }
  }
</style>
