import { xmlToJson,stringToXML,pickColorFromJson } from './translateXML.js'
export function caculateColor(themeData){
    let XMLDOM = stringToXML(themeData.theme1)
    let colorJsonData = xmlToJson(XMLDOM)
    let finalColor = pickColorFromJson(colorJsonData)
    //0和1的颜色会自动反转
    let switchColor = finalColor[0]
    finalColor[0] = finalColor[1]
    finalColor[1] = switchColor

    let switchColor2 = finalColor[3]
    finalColor[3] = finalColor[2]
    finalColor[2] = switchColor2
    return finalColor
}