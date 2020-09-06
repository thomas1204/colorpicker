class LoreeColorPicker {
	constructor(id) {
		this.id = id;
		this.wrapper = null;
		this.width = 300
		this.height = 180
		this.chooserHeight = 12;
		this.color = "rgb(255, 0, 0)";
		this.palette = null;
		this.paletteContext = null;
		this.paletteButton = null;
		this.chooser = null;
		this.chooserContext = null;
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
		this.updateColorsInPalette()
	}
	
	// attaches palette chooser button
	attachPaletteButton(paletteWrapper) {
		this.paletteButton = document.createElement('button');
		this.paletteButton.className = "loree-custom-color-picker-palette-button";
		this.paletteButton.style.top = '-9px';
		this.paletteButton.style.left = '-9px';
		this.palette.appendChild(this.paletteButton);
		this.updatePaletteButtonColor();
	}
	
	// attaches chooser
	attachChooser(chooserWrapper) {
		this.chooser = document.createElement('canvas');
		this.chooser.className = "loree-custom-color-picker-chooser";
		this.chooser.width = this.width;
		this.chooser.height = this.chooserHeight;
		chooserWrapper.appendChild(this.chooser);
		this.updateColorsInChooser()
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
	
	updatePaletteButtonColor() {
		console.log('this.paletteButton', this.paletteButton.parentElement.children);
		const imageData = this.paletteContext.getImageData(this.paletteButton.offsetLeft, this.paletteButton.offsetTop, 18, 18);
		this.paletteButton.style.backgroundColor = `rgba(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]},1)`;
	}
	
	
}
