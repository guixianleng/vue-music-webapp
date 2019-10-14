<template>
    <transition name="fade-right">
      <div class="rec-detail" v-if="show">
        <nav-bar
          title="推荐详情"
          left-arrow
          left-text="返回"
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
          <i class="iconfont" slot="right">&#xeb30;</i>
        </nav-bar>
      </div>
    </transition>
</template>

<script>
import NavBar from 'baseUI/NavBar'

export default {
  name: 'Rec-detail',
  components: {
    NavBar
  },
  data () {
    return {
      show: false,
      rankInfo: {}
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    onClickLeft () {
      history.back()
    },
    onClickRight () {
      console.log(111)
    }
  }
}
</script>

<style lang="less">
.rec-detail {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: #fff;
}
</style>
