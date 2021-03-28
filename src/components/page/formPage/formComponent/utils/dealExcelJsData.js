import { changeColorFormat } from './colorFormat.js'

export default class {
    constructor(sheetData,colorTheme){
        this.sheetData = sheetData
        this.colorTheme = colorTheme
    }
    //处理后的位置数据
    sizeData = {}
    proportion = 98/72

    beginLoading(){
        let finalFiltedExcel = {
            paperData:{},
            boxData:Array.from(Array(10), ()=>[])
        }
        //0:空白格子
        //1:被合并的格子，直接跳出循环
        //2:数字格子
        //3:字符格子
        //6:公式格子         
        //8:富文本格子
        let mergeInformation = this.sheetData._merges
        this.sizeData = this.getSizeData()
        finalFiltedExcel.paperData = this.caculatePaperBorder(this.sheetData,this.sizeData)
        console.log(this.sizeData)
        //有合并格子
        if(this.sheetData.hasMerges){
            let rowSum = this.sheetData._rows
            rowSum.forEach((rowData,rowIndex) => {
                rowData._cells.forEach((data,colIndex) =>{
                    //由于使用的是_row的数据，为空时需跳出循环
                    if(data===undefined){
                        return true
                    }
                    let cellData = data.model
                    //类型为被合并的格子则跳出循环
                    if(cellData.type===1){
                        return true   
                    }
                    let mergeData = mergeInformation[cellData.address]                   
                    //有合并内容
                    if(mergeData){
                        // console.log(mergeData,rowIndex,colIndex)
                        cellData.position = this.mergeBoxPosition(mergeData)
                    }
                    //无合并内容
                    else{
                        cellData.position = this.sigleBoxPosition(rowIndex,colIndex)
                    }

                    cellData.styleData = {
                        fontData:this.caculateFont(cellData),
                        border:this.caculateBorderData(cellData),
                        align:this.caculateAlign(cellData),
                        background:this.caculateBackground(cellData)
                    }
    
                    finalFiltedExcel.boxData[cellData.type].push(cellData)
                }) 
            });
        }
        
        //无合并格子
        else {
            let rowSum = this.sheetData._rows
            rowSum.forEach((rowData,rowIndex) => {
                rowData._cells.forEach((data,colIndex) =>{
                    //合并格子跳出循环
                    if(data===undefined){
                        return true
                    }
                    let cellData = data.model
                    if(cellData.type===1){
                        return true
                    }
                    cellData.position = this.sigleBoxPosition(rowIndex,colIndex)
                    cellData.styleData = {
                        fontData:this.caculateFont(cellData),
                        border:this.caculateBorderData(cellData),
                        align:this.caculateAlign(cellData),
                        background:this.caculateBackground(cellData)
                    }
                    finalFiltedExcel.boxData[cellData.type].push(cellData)
                }) 
            });
        }

        //最后统一处理一下需要对每个不同类型特殊处理的部分...
        this.processBoxTypeContent(finalFiltedExcel.boxData)

        return finalFiltedExcel
    }

    caculatePaperBorder(){
        let defaultSizeData = {
            width:0,
            height:0 
        }
    
        defaultSizeData.width = this.sizeData.colWidth[this.sizeData.colWidth.length-1] 
        defaultSizeData.height = this.sizeData.rowHeight[this.sizeData.rowHeight.length-1]
    
        return defaultSizeData
    }
    
    sigleBoxPosition(rowIndex,colIndex){
        let defaultPosition = {
            top:this.sizeData.rowHeight[rowIndex],
            left:this.sizeData.colWidth[colIndex],
            height:(this.sizeData.rowHeight[rowIndex+1]-this.sizeData.rowHeight[rowIndex]),
            width:(this.sizeData.colWidth[colIndex+1]-this.sizeData.colWidth[colIndex])
        }
        return defaultPosition
    }
    
    mergeBoxPosition(mergeData){
        let defaultPosition = {
            top:this.sizeData.rowHeight[mergeData.top-1],
            left:this.sizeData.colWidth[mergeData.left-1],
            height:(this.sizeData.rowHeight[mergeData.bottom]-this.sizeData.rowHeight[mergeData.top-1]),
            width:(this.sizeData.colWidth[mergeData.right]-this.sizeData.colWidth[mergeData.left-1])
        }
        return defaultPosition
    }
    
    caculateFont(cellData){
        let fontData = cellData.style.font
        let defaultFont = {
            fontSize:parseInt(11*this.proportion)*2,
            fontColor:'#000000',
            fontWeight:'normal',
            fontStyle:'normal',
            'text-decoration':'none'
        }
        if(fontData){
            if(fontData.size){
                defaultFont.fontSize = Math.ceil(fontData.size*this.proportion)*2
            }
            if(fontData.color){
                defaultFont.fontColor = '#'+ (
                    fontData.color.theme!== undefined ? this.colorTheme[fontData.color.theme] : 
                        (fontData.color.argb !== undefined ? fontData.color.argb.slice(2,8):'#000000'))
                if(fontData.color.tint){
                    defaultFont.fontColor = changeColorFormat(defaultFont.fontColor,fontData.color.tint)
                }        
            }
            if(fontData.bold){
                defaultFont.fontWeight = 'bold'
            }
            if(fontData.italic){
                defaultFont.fontStyle = 'italic'
            }
            if(fontData.underline){
                defaultFont['text-decoration'] = 'underline'
            }
            if(fontData.strike){
                defaultFont['text-decoration'] = 'line-through'
            }
            //下划线和删除线只能有一种
        }
        return defaultFont
    }
    
    caculateBorderData(cellData){
        let borderData = cellData.style.border
        let borderDirection = ['top','right','bottom','left']
        let defaultBorder = {
            top:'1px solid #d4d4d4',
            left:'1px solid #d4d4d4',
            bottom:'1px solid #d4d4d4',
            right:'1px solid #d4d4d4',
        }
        //TODO：若保留现有格式，可读右下，左上默认不读，除非是第一行或者第一列
    
        if(borderData){
            for(let type of borderDirection){
                if(borderData[type]){
                    let colorValue = '#d4d4d4'
    
                    if(borderData[type].color){
                        colorValue = borderData[type].color.theme !== undefined ? this.colorTheme[borderData[type].color.theme] : borderData[type].color.argb.slice(2,8)
                        colorValue = '#' + colorValue
                        if(borderData[type].color.tint){
                            colorValue = changeColorFormat(colorValue,borderData[type].color.tint)
                            console.log(colorValue)
                        }     
                    }
                    
                    //按常用到不常用进行排序
                    if(['thin'].includes(borderData[type].style)){
                        defaultBorder[type] = '1px solid '+ colorValue
                    }
                    else if(['dotted','hair'].includes(borderData[type].style)){
                        defaultBorder[type] = '1px dotted '+ colorValue
                    }
                    else if(['medium'].includes(borderData[type].style)){
                        defaultBorder[type] = '2px solid '+ colorValue
                    }
                    else if(['thick'].includes(borderData[type].style)){
                        defaultBorder[type] = '4px solid '+ colorValue
                    }
                    else if(['double'].includes(borderData[type].style)){
                        defaultBorder[type] = '6px double '+ colorValue
                    }
                    else if(['dashDot','dashDotDot','slantDashDot'].includes(borderData[type].style)){
                        defaultBorder[type] = '1px dashed '+ colorValue
                    }
                    else if(['mediumDashed','mediumDashDotDot','mediumDashDot'].includes(borderData[type].style)){
                        defaultBorder[type] = '2px dashed '+ colorValue
                    }
                }
            }
        }
        return defaultBorder
    }
    
    caculateBackground(cellData){
        let defaultColor = '#FFFFFF'

        if(cellData.style.fill){
            let selecetFill = cellData.style.fill
            if(selecetFill.fgColor){
                defaultColor = selecetFill.fgColor.theme !== undefined ? this.colorTheme[selecetFill.fgColor.theme] : selecetFill.fgColor.argb.slice(2,8)
                defaultColor = '#'+defaultColor
                if(selecetFill.fgColor.tint){
                    defaultColor = changeColorFormat(defaultColor,selecetFill.fgColor.tint)
                }       
            }
        }
        return defaultColor
    }

    caculateAlign(cellData){
        //浏览器读不出来缩小字体填充

        let defaultAlign = {
            horizontal:'flex-start',
            vertical:'center',
            textAlign:'left'
        }

        if(cellData.style.alignment){
            let alignData = cellData.style.alignment
            if(alignData.horizontal){
                if(['left'].includes(alignData.horizontal)){
                    defaultAlign.horizontal = 'flex-start'
                }
                else if(['center'].includes(alignData.horizontal)){
                    defaultAlign.horizontal = 'center'
                    defaultAlign.textAlign = 'center'

                }
                else if(['right'].includes(alignData.horizontal)){
                    defaultAlign.horizontal = 'flex-end'
                }
            }
            if(alignData.vertical){
                if(['top'].includes(alignData.vertical)){
                    defaultAlign.vertical = 'flex-start'
                }
                else if(['center'].includes(alignData.vertical)){
                    defaultAlign.vertical = 'center'
                    defaultAlign.textAlign = 'center'
                }
                else if(['bottom'].includes(alignData.vertical)){
                    defaultAlign.vertical = 'flex-end'
                }
            }
        }
        return defaultAlign
    }
    
    //计算行高、列宽，得出方便获取的数据
    getSizeData(){
        console.log(this.sheetData)
        let heightAndWidth = {
            rowHeight:[0],
            colWidth:[0]
        }
        let defaultScale = 2

        let defaultRowHeight = Math.ceil(this.sheetData.properties.defaultRowHeight)*defaultScale
        let previousHeightSum = 0
        let previousWidthSum = 0
    
    //行高部分----------
        for(let i=0; i<this.sheetData.model.rows.length; i++){
            if(this.sheetData.model.rows[i].height){
                let selectHeight = Math.ceil(this.sheetData.model.rows[i].height*this.proportion)
                heightAndWidth.rowHeight[i+1] = (selectHeight*defaultScale+previousHeightSum)
            }
            else{
                heightAndWidth.rowHeight[i+1] = (defaultRowHeight*defaultScale+previousHeightSum)
            }
            previousHeightSum = heightAndWidth.rowHeight[i+1]
        }
        
        //如果还有以行高的数据出现空缺
        if(heightAndWidth.rowHeight.length<this.sheetData.rowCount+1){
            let remainDataNum = (this.sheetData.rowCount+1)-heightAndWidth.rowHeight.length
            previousHeightSum = heightAndWidth.rowHeight[heightAndWidth.rowHeight.length-1]
            do{
                heightAndWidth.rowHeight.push(defaultRowHeight + previousHeightSum)
                previousHeightSum = heightAndWidth.rowHeight[heightAndWidth.rowHeight.length-1]
                remainDataNum--
            }
            while(remainDataNum>0)
        }

    //列宽部分----------
        if(this.sheetData.model.cols){
            console.log('1')
            for(let i=0; i<this.sheetData.model.cols.length; i++){
                let selectCol = this.sheetData.model.cols[i]
                let selectIndex = selectCol.min
                // 判断一下和上一个循环的数据是否相邻
                if(i>0&&this.sheetData.model.cols[i-1].max+1!==this.sheetData.model.cols[i].min){
                    let startIndex = this.sheetData.model.cols[i-1].max+1
                    do{
                        heightAndWidth.colWidth[startIndex] = Math.ceil(8*6*this.proportion)*defaultScale + previousWidthSum
                        previousWidthSum = heightAndWidth.colWidth[startIndex]
                        console.log(heightAndWidth.colWidth[startIndex],startIndex,'循环')
                       
                        startIndex++
                    }
                    while(startIndex<this.sheetData.model.cols[i].min)
                }

                do{
                    heightAndWidth.colWidth[selectIndex] = Math.ceil(selectCol.width*6*this.proportion)*defaultScale + previousWidthSum
                    console.log(heightAndWidth.colWidth[selectIndex],selectIndex,'跳出')
                    previousWidthSum = heightAndWidth.colWidth[selectIndex]
                    selectIndex++
                }
                while(selectIndex<=selectCol.max)
            }

            // 如果还有以默认列宽结尾的格子还有很多个的话
            if(heightAndWidth.colWidth.length<this.sheetData.columnCount+1){
                let remainDataNum = (this.sheetData.columnCount+1)-heightAndWidth.colWidth.length
                let lastColWidth = Math.ceil(8.38*6*this.proportion)*defaultScale
                previousWidthSum = heightAndWidth.colWidth[heightAndWidth.colWidth.length-1]
                do{
                    heightAndWidth.colWidth.push(lastColWidth + previousWidthSum)
                    previousWidthSum = heightAndWidth.colWidth[heightAndWidth.colWidth.length-1]
                    remainDataNum--
                }
                while(remainDataNum>0)
            }
        }
        else{
            let defaultColWidth = Math.ceil(8.38*6*this.proportion)*defaultScale
            let remainDataNum = this.sheetData.columnCount
            if(remainDataNum===0){
                //特殊情况：如果无任何内容的表单，columnCount是等于0的
                remainDataNum = this.sheetData.columns.length
            }

            let previousWidthSum = 0
            do{
                heightAndWidth.colWidth.push(defaultColWidth + previousWidthSum)
                previousWidthSum = heightAndWidth.colWidth[heightAndWidth.colWidth.length-1]
                remainDataNum--
            }
            while(remainDataNum>0)
        }
        console.log(heightAndWidth)
        return heightAndWidth
    }

    processBoxTypeContent(dataArray){
        console.log(dataArray)

        //公式格子
        dataArray[6].forEach((item)=>{
            if(item.result){
                //末尾有换行符则去除
                let regex = /.[\r\n]$/g
                if(regex.test(item.result)){
                    item.result = item.result.slice(0,item.result.length-1)  
                }
            }
        })
    }
}