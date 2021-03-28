// Changes XML to JSON

export function stringToXML(xmlData) {
    let xmlDoc,parser
    if (window.ActiveXObject) {
        //for IE
        xmlDoc=new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async="false";
        xmlDoc.loadXML(xmlData);
        return xmlDoc;
        }
        else if (document.implementation && document.implementation.createDocument) {
        //for Mozila
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(xmlData,"text/xml");
        return xmlDoc;
    }
}

export function xmlToJson(xml) {
    // Create the return object
    var obj = {};
    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } 
    else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } 
            else {
                if (typeof(obj[nodeName].length) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

export function pickColorFromJson (xmlJson){
    // console.log(xmlJson)
    let selectData = xmlJson['a:theme']['a:themeElements']['a:clrScheme']
    let colorArray = new Array(12)
     
    if(selectData['a:dk1']['a:sysClr']['@attributes']['lastClr']){
        colorArray[0] = selectData['a:dk1']['a:sysClr']['@attributes']['lastClr']
    }
    else{
        colorArray[0] = selectData['a:dk1']['a:sysClr']['@attributes']['val']
    }

    if(selectData['a:lt1']['a:sysClr']['@attributes']['lastClr']){
        colorArray[1] = selectData['a:lt1']['a:sysClr']['@attributes']['lastClr']
    }
    else{
        colorArray[1] = selectData['a:lt1']['a:sysClr']['@attributes']['val']
    }

    colorArray[2] = selectData['a:dk2']['a:srgbClr']['@attributes']['val']
    colorArray[3] = selectData['a:lt2']['a:srgbClr']['@attributes']['val']
    colorArray[4] = selectData['a:accent1']['a:srgbClr']['@attributes']['val']
    colorArray[5] = selectData['a:accent2']['a:srgbClr']['@attributes']['val']
    colorArray[6] = selectData['a:accent3']['a:srgbClr']['@attributes']['val']
    colorArray[7] = selectData['a:accent4']['a:srgbClr']['@attributes']['val']
    colorArray[8] = selectData['a:accent5']['a:srgbClr']['@attributes']['val']
    colorArray[9] = selectData['a:accent6']['a:srgbClr']['@attributes']['val']
    colorArray[10] = selectData['a:hlink']['a:srgbClr']['@attributes']['val']
    colorArray[11] = selectData['a:folHlink']['a:srgbClr']['@attributes']['val']
    
    return colorArray
} 