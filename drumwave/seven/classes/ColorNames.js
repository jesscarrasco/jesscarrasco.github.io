function ColorNames(){};

ColorNames._colors;
ColorNames._rgbArrays;
ColorNames._names;

ColorNames.load = function(){
	Loader.loadData(URL_COLORSNAMES, ColorNames.onLoadColorsnames, this);
}

ColorNames.onLoadColorsnames = function(e){
	var colorNamesTable = TableEncodings.CSVtoTable(e.result);
	c.log(colorNamesTable);
	
	ColorNames._colors = ColorList.fromArray(colorNamesTable[1]);
	ColorNames._names = colorNamesTable[0];
	
	c.log('ColorNames._colors', ColorNames._colors);


	ColorNames._rgbArrays = ColorNames._colors.getRgbArrays(); 	
	c.log('ColorNames._rgbArrays.length', ColorNames._rgbArrays.length);
	
	colorsLoaded(); //<-- provisional
}

ColorNames.getNameAndColorFromColor = function(color){
	if(ColorNames._rgbArrays==null) return null;
	
	var rgb = ColorOperators.HEXtoRGB(color);
	var d;
	var dMin = 99999;
	var iMin;
	for(var i=0; ColorNames._rgbArrays[i]!=null; i++){
		d = Math.pow(ColorNames._rgbArrays[i][0]-rgb[0], 2)+Math.pow(ColorNames._rgbArrays[i][1]-rgb[1], 2)+Math.pow(ColorNames._rgbArrays[i][2]-rgb[2], 2);
		if(d<dMin){
			iMin = i;
			dMin = d;
		}
	}
	return {
		name:ColorNames._names[iMin],
		color:ColorNames._colors[iMin]
	}
}

ColorNames.getNamesAndColorsFromColorList = function(colorList){
	var list = new List();
	for(var i=0; colorList[i]!=null; i++){
		list[i] = ColorNames.getNameAndColorFromColor(colorList[i]);
	}
	return list;
}


