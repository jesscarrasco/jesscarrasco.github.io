Texts.prototype.constructor=Texts;

function Texts(){
	Loader.loadImage('./resources/dragarrow.png', this.onLoadImage, this);
	
	this.arrow;
	
	var title = "<fcWhite><fs14>- 7 sets Venn Diagram - <br>128 color combinations<br> from mixing 7 colors</f></f>";
	
	var text = " ";
	
	var flipText = "<fcWhite><fs24>Side A </f><fs18>drag to spin and see the other side</f></f>";
	
	this.titletBox = new TextFieldHTML({
		'text':title,
		x:120,
		y:150,
		width:300,
		height:4000
	});
	
	this.textBox = new TextFieldHTML({
		'text':text,
		x:120,
		y:110,
		width:200,
		height:4000
	});
	
	this.flipText = new TextFieldHTML({
		'text':flipText,
		width:350,
		height:4000
	});
	
	this.titletBox.draw();
	// this.textBox.draw();
	
	this.resizeWindow();
}

Texts.prototype.onLoadImage=function(e){
	this.arrow = e.result;
}

Texts.prototype.resizeWindow = function(){
	this.flipText.x = canvasWidth - 370;
	this.flipText.y = canvasHeight - 40;
	
	this.flipText.draw();
}

Texts.prototype.draw = function(){
	if(this.arrow!=null) context.drawImage(this.arrow, canvasWidth - 376, canvasHeight - 65);
}

Texts.prototype.setSide = function(sideA){
	this.flipText.setText("<fcWhite><fs24>Side "+(sideA?"A":"B")+" </f><fs18>drag to spin and see the other side</f></f>");
	//this.flipText.draw();
}