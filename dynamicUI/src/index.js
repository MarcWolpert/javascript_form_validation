import './template.css';
import './template.html';
import Dropdown from './lib/dropdown.js';
import Carousel from './lib/carousel.js';

const menuOptions = ['Home', 'Menu', 'Contact', 'About'];

function handleOptionSelected(option) {
	console.log(`Selected option: ${option}`);
	// Implement your navigation logic here
}

const dropdown = new Dropdown('dropdown01', menuOptions, handleOptionSelected);

const optionElements = document.getElementsByClassName('options');
Array.from(optionElements).forEach((element) => {
	element.addEventListener('click', (e) => {
		e.stopPropagation();
		const rect = element.getBoundingClientRect();
		const x = rect.left;
		const y = rect.bottom;
		dropdown.show(x, y);
	});
});

document.addEventListener('click', () => {
	dropdown.hide();
});

const headlineContent = document.getElementsByClassName('headlineContent')[0];
const carouselKV = {
	'https://images.unsplash.com/photo-1733036016861-0541eb76dac5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D':
		'Desert landscape and housing',
	'https://plus.unsplash.com/premium_photo-1732569119693-05321f406646?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D':
		'Man walking thorugh tundra with dog',
	'https://images.unsplash.com/photo-1732763045205-3fbe320e642f?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D':
		'Autumn leaves in focus',
};

const carousel1 = new Carousel(400, 600, carouselKV);
headlineContent.appendChild(carousel1.carouselElement);
carousel1.circleClick();
