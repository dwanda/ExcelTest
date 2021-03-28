<template>
  <div>
    <!-- 导出JPG、PNG -->
    <Modal scrollable v-model="exportPIC" title="将Excel导出为图片" width="500px" @on-ok="createok">
      <div class="radioArea">
        <p class="radioTitle">图片格式：</p>
        <RadioGroup v-model="type" class="radioGroup">
          <Radio label="JPG"></Radio>
          <Radio label="PNG"></Radio>
        </RadioGroup>
      </div>
      <div class="radioArea">
        <p class="radioTitle">导出质量：</p>
        <RadioGroup v-model="quality" class="radioGroup">
          <Radio label="超清"></Radio>
          <Radio label="高清"></Radio>
        </RadioGroup>
      </div>
      <div class="radioArea">
        <p class="radioTitle">导出名称：</p>
        <Input v-model="fileName" placeholder="默认表单" class="nameInput" />
      </div>
    </Modal>
  </div>
</template>

<script>
import { downloadPng } from "./utils/png_EXPORT.js";

export default {
  name: "exportFormPIC",
  data() {
    return {
      exportPIC: false,
      type: "PNG",
      quality: "高清",
      fileName: ""
    };
  },

  methods: {
    openBox() {
      this.exportPIC = true;
    },
    createok() {
      downloadPng(this)
        .then(reponse => {
          console.log(reponse);
        })
        .catch(e => console.log(e));
    },
    cancel() {}
  },

  watch: {
    createModel(val) {
      if (val) {
        this.flowname = "";
        this.flowtext = "";
        this.flowtype = [];
      }
    }
  }
};
</script>


<style scoped >
.radioArea {
  margin: 20px auto;
  margin-left: 110px;
  display: block;
  position: relative;
  font-size: 14px;
}
.radioTitle {
  margin-bottom: 5px;
}
.radioGroup {
  position: absolute;
  top: 0px;
  left: 90px;
  font-size: 14px;
}
.nameInput {
  width: 160px;
  position: absolute;
  top: -5px;
  left: 90px;
}
</style>

