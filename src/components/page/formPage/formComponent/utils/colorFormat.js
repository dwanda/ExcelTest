export function changeColorFormat (sColor, tintValue){
    //十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        //处理六位的颜色值
        let sColorChange = [];
        for (let i=1; i<7; i+=2) {
            sColorChange.push(parseInt(sColor.slice(i, i+2),16));    
        }
        
        let returnHSL = rgbToHsl(sColorChange[0], sColorChange[1], sColorChange[2])

        let finalTint = CalculateFinalLumValue(tintValue, returnHSL[2]/100*255)

        return "hsl(" + returnHSL[0] + "," + returnHSL[1]+ "%," + parseInt(finalTint/255*100)+ "%)";
        
        // return 'rgba('+ sColorChange[0]+','+sColorChange[1]+','+sColorChange[2]+','+changeLight+')'
    }
}

//rgb(112, 173, 71);

/**
 * RGB 颜色值转换为 HSL.
 * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内
 * 返回的 h, s, 和 l 在 [0, 1] 之间
 *
 * @param   Number  r       红色色值
 * @param   Number  g       绿色色值
 * @param   Number  b       蓝色色值
 * @return  Array           HSL各值数组
 */
function rgbToHsl(r,g,b){
	r=r/255;
	g=g/255;
	b=b/255;

	let min=Math.min(r,g,b);
	let max=Math.max(r,g,b);
	let l=(min+max)/2;
	let difference = max-min;
	let h,s;
	if(max==min){
		h=0;
		s=0;
	}else{
		s=l>0.5?difference/(2.0-max-min):difference/(max+min);
		switch(max){
			case r: h=(g-b)/difference+(g < b ? 6 : 0);break;
			case g: h=2.0+(b-r)/difference;break;
			case b: h=4.0+(r-g)/difference;break;
		}
		h=Math.round(h*60);
	}
	s=Math.round(s*100);//转换成百分比的形式
	l=Math.round(l*100);
	return [h,s,l];
}

//excel专属对于颜色tint的换算
function CalculateFinalLumValue(tint, lum){
    let lum1 = 0;
    if (tint < 0){
        lum1 = lum * (1.0 + tint);
    }
    else{
        lum1 = lum * (1.0 - tint) + (255 - 255 * (1.0 - tint));
    }
    return lum1;
} 
