<template>
    <div class="selectStyle" :style="{
        maxWidth:maxWidth+'px'
    }">
        <div class="selectPosition">
            {{this.position}}
        </div>
        <div class="selectValue">
            {{this.calValue}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        position:{
            type:String,
            default:'A1'
        },
        calValue:{
            type:[String, Number],
            default:''
        },
        maxWidth:{
            type:Number,
            default:300
        }
    }
}
</script>

<style scoped>
.selectStyle{
    min-width: 300px;
    min-height: 30px;
    width: 100%;
    border: 1px dashed #c4c4c4;
    border-radius: 5px;
    text-align:center;
    margin-bottom: 20px;
    display: flex;
    cursor: default;
}
.selectStyle div{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
}
.selectPosition{
    width: 80px;
    border-right: 1px dashed #c4c4c4;
}
.selectValue{
    height: 100%;
    min-width: 250px;
    width: 100%;
}
</style>

