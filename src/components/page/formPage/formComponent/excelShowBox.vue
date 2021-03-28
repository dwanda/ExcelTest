<template>
  <div class="mainContainBox">
    <div 
      class="constrainGridBox"
      :style="{
        'width':paperData.width*scaleValue/50/2+'px',
        'height':paperData.height*scaleValue/50/2+'px',
      }"
    >
      <div
        class="excelGridBox"
        v-if="boxData"
        :style="{
          'transform':'scale('+scaleValue/50/2+')'
        }"
      >
        <template v-for="selectItemType in boxData">
          <div
            v-for="item in selectItemType"
            :key="item.address"
            class="basicComponent"
            :id="item.address"
            :style="{
              'height':60,
              'top':item.position.top+'px',
              'left':item.position.left+'px',
              'width':item.position.width+'px',
              'height':item.position.height+'px',
              'border-top':item.styleData.border.top,
              'border-left':item.styleData.border.left,
              'border-bottom':item.styleData.border.bottom,
              'border-right':item.styleData.border.right,
              'background-color':item.styleData.background,
            }"
          >
            <div
              class="insideContentBox"
              :style="{
                'font-size':item.styleData.fontData.fontSize+'px',
                'line-height':item.styleData.fontData.fontSize+'px',
                'color':item.styleData.fontData.fontColor,
                'font-weight':item.styleData.fontData.fontWeight,
                'font-style':item.styleData.fontData.fontStyle,
                'text-decoration':item.styleData.fontData['text-decoration'],
                'justify-content':item.styleData.align.horizontal,
                'align-items':item.styleData.align.vertical,
                'text-align':item.styleData.align.textAlign
              }"
              @click="clickBox(item)"
            >
              <template v-if="item.type===2||item.type===3">{{item.value}}</template>
              <template v-if="item.type===6">{{item.result}}</template>
              <template v-if="item.type===8">
                <!-- 富文本格式的内容需要单独读取，看这块需不需要使用再说 -->
                {{item.value.richText[0].text}}
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boxData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    paperData: {
      type: Object,
      default: () => {
        return {
          width: 0,
          height: 0
        };
      }
    },
    scaleValue: {
      type: Number,
      default: 50
    }
  },
  methods: {
    clickBox(itemData) {
      this.$emit('clickCell',itemData)
    }
  }
};
</script>

<style scoped>
.mainContainBox {
  position: relative;
  width: calc(100% - 100px);
  height: calc(100vh - 200px);
  margin: auto;
  border: 1px solid #e9e9e9;
  box-shadow: 0 0 8px #e2e2e2;
  overflow-x: auto;
  user-select: none;
}
.excelGridBox {
  position: relative;
  transform-origin: top left;
}
.basicComponent {
  position: absolute;
}
.insideContentBox {
  width: 100%;
  height: 100%;
  display: flex;
  white-space: pre-wrap;
  word-break: break-all;
  text-overflow:clip;
  cursor: pointer;
}
</style>