<template>
    <div>
        <Modal
            v-model="modalValue"
            footer-hide
            scrollable
            :width="500"
            :styles="{top: '60px'}"
        >   
            <p slot="header" style="color:#727272;">
                <Icon class="headerIcon" type="md-bookmark" />
                <span>设置类型</span>
            </p>
            <div class="subtitle">
                当前选中单元格:
            </div>
            <selectBox 
            :position="selectItem.address"
            :calValue="selectItem.value"
            style="margin:auto;margin-bottom: 20px;"/>
        </Modal>
    </div>
</template>

<script>
import selectBox from './component/selectBox'

export default {
    data(){
        return {
            modalValue:false,
            selectItem:'',
            selectValue:''
        }
    },
    components:{
        selectBox
    },
    methods:{
        openBox(item){
            console.log(item)
            this.selectItem = item
            this.modalValue = true
        }
    }
}
</script>

<style scoped>
.subtitle{
    text-align: center;
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: bold;
}
.headerIcon{
    margin-right: 5px;
}
.typeContainerBox{
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
.typeBox{
    width: 150px;
    height: 150px;
    border-radius: 5px;
    flex-wrap: wrap;
    cursor: pointer;
    margin: 0 20px;
    font-size: 16px;
    background-color: #8daacf;
    color: white;
}
.outputSelectBox{
    background-color: #9bcf8d;
}
.typeIcon{
    font-size: 50px;
    color: white;
    display: block;
    margin:0 auto;
    margin-top: 30px;
    margin-bottom: 10px;
}
.typeText{
    text-align: center;
    font-weight: bold;
}
.selectPosition{
    height: 100%;
    width: 50px;
    border-right: 1px dashed #c4c4c4;
}
.selectValue{
    width: 150px;
}
</style>

