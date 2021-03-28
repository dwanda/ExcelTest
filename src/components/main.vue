<template>
  <div>
    <!-- 中间内容 -->
    <transition name="fade" mode="out-in">
      <router-view ref="flowModules"></router-view>
    </transition>

    <!-- 背景颜色 -->
    <div class="mainBackground" :style="{backgroundColor:backgroundColor }"></div>
  </div>
</template>
<script>
//写个组件监听消息

export default {
  name: "mainMenu",
  data() {
    return {
      menuActiveName: "1",
      unreadMessgaeNum: 1
    };
  },
  computed: {
    backgroundColor() {
      return this.$store.state.backgroundColor;
    }
  },
  watch: {
    menuBarTop() {
      this.$nextTick(() => {
        this.menuActiveName = "1";
        this.$refs.topMainMenu.updateActiveName();
      });
    }
  }
};
</script>

<style scoped>
.mainBackground {
  top: 0px;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
