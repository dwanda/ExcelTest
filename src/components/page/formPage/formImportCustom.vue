<template>
  <div>
    <div class="topMenuBox">
      <input type="file" name="file" @change="getUploadData" id="testInput" />
      <Button @click="downloadExcel">测试下载</Button>
      <Button @click="openExportPicBox" class="exportButton">测试导出图片</Button>

      <div class="sliderBox">
        <Slider v-model="scaleValue" show-tip="never" :min="1"></Slider>
      </div>
    </div>
    <excelShowBox
      :boxData="savedExcelData.boxData"
      :paperData="savedExcelData.paperData"
      :scaleValue="scaleValue"
      @clickCell="clickCell"
    />
    <excelExportPIC ref="excelExportPIC" />
    <dataTypeSetting ref="dataTypeSetting" />
  </div>
</template>

<script>
import Excel from "exceljs";
import caculateExcelData from "./formComponent/utils/dealExcelJsData";
import { caculateColor } from "./formComponent/utils/caculateColor";
import { saveAs } from "file-saver";
import excelShowBox from "./formComponent/excelShowBox";
import excelExportPIC from "./formComponent/exportFormPIC";
import dataTypeSetting from "./formComponent/dataTypeSetting";

export default {
  data() {
    return {
      workbook: "",
      savedExcelData: {
        boxData: []
      },
      themeColor: [],
      scaleValue: 50
    };
  },
  components: {
    excelShowBox,
    excelExportPIC,
    dataTypeSetting
  },
  methods: {
    //exceljs读的数据
    getUploadData(e) {
      let files = e.target.files[0];
      let reader = new FileReader();
      reader.readAsArrayBuffer(files);
      reader.onloadend = e => {
        // console.log(e)
        let testStartTime = Math.round(new Date().getTime());
        console.log("开始导入");

        let data = new Uint8Array(e.target.result);
        this.workbook = new Excel.Workbook();

        this.workbook.xlsx.load(data).then(() => {
          console.log(
            "excel加载耗时",
            (Math.round(new Date().getTime()) - testStartTime) / 1000 + "秒"
          );
          console.log(this.workbook);

          // 默认能读到主题的excel才是可以解析的。
          if (this.workbook._themes.theme1) {
            this.themeColor = caculateColor(this.workbook._themes);
            this.workbook.eachSheet(worksheet => {
              let excelModule = new caculateExcelData(
                worksheet,
                this.themeColor
              );

              this.savedExcelData = excelModule.beginLoading();
              localStorage.setItem(
                "excelData",
                JSON.stringify(this.savedExcelData)
              );
            });
          } else {
            this.$Message.error("文件格式有误，无法解析");
          }

          let testEndTime = Math.round(new Date().getTime());
          console.log(
            "导入结束，总耗时",
            (testEndTime - testStartTime) / 1000 + "秒"
          );
        });
      };
    },
    downloadExcel() {
      if(!this.workbook){
        this.$Message.error("因demo原因，请重新上传一遍文件即可测试下载");
      }
      this.workbook.xlsx.writeBuffer().then(buffer => {
        // done
        saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`);
      });
    },
    openExportPicBox() {
      this.$refs.excelExportPIC.openBox();
    },
    clickCell(itemData) {
      if(itemData.formula){
        console.log('empty')
        if(itemData.formula.bindType===1){
          this.$refs.dataInputSetting.openBox(itemData);
        }
        else if(itemData.formula.bindType===2){
          this.$refs.dataOutputSetting.openBox(itemData);
        }
      }
      else{
        this.$refs.dataTypeSetting.openBox(itemData);
      }
    }
  },
  mounted() {
    if (localStorage.getItem("excelData")) {
      this.savedExcelData = JSON.parse(localStorage.getItem("excelData"));
      console.log(this.savedExcelData);
    }
  }
};
</script>

<style scoped>
.sliderBox {
  display: inline-block;
  width: 100px;
  margin: 0 100px;
}
.topMenuBox {
  height: 80px;
  display: flex;
  align-items: center;
  padding-left: 50px;
}
.exportButton {
  margin-left: 50px;
}
</style>