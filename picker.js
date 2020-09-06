class LoreeColorPicker {
	constructor(id) {
		this.id = id;
		this.wrapper = null;
		this.width = 300
		this.height = 180
		this.chooserHeight = 12;
		this.color = "green";
		this.palette = null;
		this.paletteContext = null;
		this.paletteCircle = { x: 4, y: 4, width: 10, height: 10};
		this.chooser = null;
		this.chooserContext = null;
		this.chooserCircle = { x: 6, y: 6, width: 6, height: 6};
	}
	
	initiate() {
		const element = document.getElementById(this.id);
		if (!element) return;
		this.wrapper = document.createElement('div');
		this.wrapper.className = "loree-custom-color-picker";
		element.appendChild(this.wrapper);
		this.attachPaletteWrapper();
		this.attachChooserWrapper();
	}
	
	// to change height and width of color palette
	setDimension({width, height}) {
		if (width && typeof width === 'number' && width > 0) {
			this.width = width;
		}
		if (height && typeof height === 'number' && height > 0) {
			this.height = height;
		}
	}
	
	// to update the color
	setColor(color) {
		this.color = color;
		this.updateColorsInPalette();
	}
	
	// to get the color
	getColor(){
		const imageData = this.paletteContext.getImageData(this.paletteCircle.x, this.paletteCircle.y, 1, 1);
		return this.changeRGBToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
	}
	
	changeRGBToHex(r, g, b){
		return "#" + this.getHexValue(r) + this.getHexValue(g) + this.getHexValue(b);
	}
	
	getHexValue(c) {
		const hex = c.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	}
	
	attachPaletteWrapper() {
		const paletteWrapper = document.createElement('div');
		paletteWrapper.className = "loree-custom-color-picker-palette-wrapper";
		this.wrapper.appendChild(paletteWrapper);
		this.attachPalette(paletteWrapper)
	}
	
	attachChooserWrapper() {
		const chooserWrapper = document.createElement('div');
		chooserWrapper.className = "loree-custom-color-picker-chooser-wrapper";
		this.wrapper.appendChild(chooserWrapper);
		this.attachChooser(chooserWrapper)
	}
	
	// attaches palette
	attachPalette(paletteWrapper) {
		this.palette = document.createElement('canvas');
		this.palette.className = "loree-custom-color-picker-palette";
		this.palette.width = this.width;
		this.palette.height = this.height;
		paletteWrapper.appendChild(this.palette);
		this.updateColorsInPalette();
		this.attachPaletteCircle();
		this.paletteOnChange();
	}
	
	// attaches chooser
	attachChooser(chooserWrapper) {
		this.chooser = document.createElement('canvas');
		this.chooser.className = "loree-custom-color-picker-chooser";
		this.chooser.width = this.width;
		this.chooser.height = this.chooserHeight;
		chooserWrapper.appendChild(this.chooser);
		this.updateColorsInChooser();
		this.attachChooserCircle();
	}
	
	updateColorsInPalette() {
		this.paletteContext = this.palette.getContext("2d");
		const gradient = this.paletteContext.createLinearGradient(0, 0, this.width, 0);
		gradient.addColorStop(0, this.color);
		this.paletteContext.fillStyle = gradient;
		this.paletteContext.fillRect(0, 0, this.width, this.height);
		const whiteGradient = this.paletteContext.createLinearGradient(0, 0, this.width, 0); // White color
		whiteGradient.addColorStop(0, "#fff");
		whiteGradient.addColorStop(1, "transparent");
		this.paletteContext.fillStyle = whiteGradient;
		this.paletteContext.fillRect(0, 0, this.width, this.height);
		const blackGradient = this.paletteContext.createLinearGradient(0, 0, 0, this.height); // Black color
		blackGradient.addColorStop(0, "transparent");
		blackGradient.addColorStop(1, "#000");
		this.paletteContext.fillStyle = blackGradient;
		this.paletteContext.fillRect(0, 0, this.width, this.height);
	}
	
	updateColorsInChooser() {
		this.chooserContext = this.chooser.getContext("2d");
		const gradient = this.chooserContext.createLinearGradient(0, 0, this.width, 0);
		gradient.addColorStop(0, "rgb(255, 0, 0)");
		gradient.addColorStop(0.15, "rgb(255, 0, 255)");
		gradient.addColorStop(0.33, "rgb(0, 0, 255)");
		gradient.addColorStop(0.49, "rgb(0, 255, 255)");
		gradient.addColorStop(0.67, "rgb(0, 255, 0)");
		gradient.addColorStop(0.84, "rgb(255, 255, 0)");
		gradient.addColorStop(1, "rgb(255, 0, 0)");
		this.chooserContext.fillStyle = gradient;
		this.chooserContext.fillRect(0, 0, this.width, this.chooserHeight);
	}
	
	attachPaletteCircle(){
		this.paletteContext.beginPath();
		this.paletteContext.arc(this.paletteCircle.x, this.paletteCircle.y, this.paletteCircle.width, 0, Math.PI * 2);
		this.paletteContext.lineWidth = 2.5;
		this.paletteContext.strokeStyle = "white";
		this.paletteContext.stroke();
		this.paletteContext.closePath();
	}
	
	attachChooserCircle(){
		this.chooserContext.beginPath();
		this.chooserContext.arc(this.chooserCircle.x, this.chooserCircle.y, this.chooserCircle.width, 0, Math.PI * 2);
		this.chooserContext.lineWidth = 2.5;
		this.chooserContext.strokeStyle = "white";
		this.chooserContext.stroke();
		this.chooserContext.fill = this.getChooserCircle();
		this.chooserContext.closePath();
	}
	
	getChooserCircle(){
		const imageData = this.chooserContext.getImageData(this.chooserCircle.x, this.chooserCircle.y, 1, 1);
		return this.changeRGBToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
	}
	
	paletteOnChange(){
		let isMouseDown = false;
		
		const onMouseDown = (e) => {
			let currentX = e.clientX - this.palette.offsetLeft;
			let currentY = e.clientY - this.palette.offsetTop;
			if(
				currentY > this.paletteCircle.y &&
				currentY < this.paletteCircle.y + this.paletteCircle.width &&
				currentX > this.paletteCircle.x &&
				currentX < this.paletteCircle.x + this.paletteCircle.width
			) {
				isMouseDown = true;
			} else {
				this.paletteCircle.x = currentX;
				this.paletteCircle.y = currentY;
			}
		}
		
		const onMouseMove = (e) => {
			if(isMouseDown) {
				let currentX = e.clientX - this.palette.offsetLeft;
				let currentY = e.clientY - this.palette.offsetTop;
				this.paletteCircle.x = currentX;
				this.paletteCircle.y = currentY;
			}
		}
		
		const onMouseUp = () => {
			isMouseDown = false;
		}
		
		this.palette.addEventListener("mousedown", onMouseDown);
		this.palette.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	}
	
}
