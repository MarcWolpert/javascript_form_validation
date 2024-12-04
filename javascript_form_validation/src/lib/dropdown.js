export default class Dropdown {
	constructor(id, options, onSelect) {
		this.id = id;
		this.options = options;
		this.onSelect = onSelect;
		this.maxWidth = Math.max(
			...options.map((option) => this.getTextWidth(option)),
		);
		this.length = options.length;
		this.dropdownElement = this.createDropdown();
	}

	getTextWidth(text) {
		const canvas =
			this.getTextWidth.canvas ||
			(this.getTextWidth.canvas = document.createElement('canvas'));
		const context = canvas.getContext('2d');
		context.font = '16px Arial';
		const metrics = context.measureText(text);
		return metrics.width;
	}

	createDropdown() {
		const dropdown = document.createElement('div');
		dropdown.id = this.id;
		dropdown.classList.add('dropdown');
		dropdown.style.width = `${this.maxWidth + 30}px`;
		dropdown.style.display = 'flex';
		dropdown.style.flexDirection = 'column';

		dropdown.addEventListener('click', (e) => e.stopPropagation());

		this.options.forEach((option) => {
			const button = document.createElement('button');
			button.textContent = option;
			button.style.textAlign = 'center';
			button.style.alignSelf = 'center';
			button.style.width = `${this.maxWidth + 30}px`;
			// button.style.width = `${option.length}ch`;
			button.addEventListener('click', () => this.handleOptionSelect(option));
			dropdown.appendChild(button);
		});
		return dropdown;
	}

	show(x, y) {
		this.hide(); // Ensure only one dropdown is visible
		this.dropdownElement.style.position = 'absolute';
		this.dropdownElement.style.left = `${x}px`;
		this.dropdownElement.style.top = `${y}px`;
		this.dropdownElement.style.zIndex = '1';
		document.body.appendChild(this.dropdownElement);
	}

	hide() {
		if (this.dropdownElement.parentElement) {
			this.dropdownElement.parentElement.removeChild(
				this.dropdownElement,
			);
		}
	}

	handleOptionSelect(option) {
		if (typeof this.onSelect === 'function') {
			this.onSelect(option);
		}
		this.hide();
	}
}
