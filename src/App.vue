<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
}

</script>
<style>
::-webkit-scrollbar 
{
    width: 6px;   
    height: 10px;
}
::-webkit-scrollbar-thumb 
{
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    background: rgba(0,0,0,0.1);
}
::-webkit-scrollbar-track 
{
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.15);
    box-shadow: inset 0 0 5px rgba(0,0,0,0.15);
    border-radius: 0;
    background: rgba(0,0,0,0.02);
}
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #2c3e50;
}
body {
  padding-right: 0px ;
  overflow-x: visible ;
  min-width: 1250px;
  scroll-behavior: smooth;
}
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #5b81c0;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #5b81c0;
  background-color: #e8eaec;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  background-color: #5b81c0;
}
.fade-enter-active,.fade-leave-active {
  transition: opacity .3s;
}
.fade-enter,.fade-leave-to {
  opacity: 0;
}
.ivu-menu-submenu-title > i{
  margin-right:0px !important;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
