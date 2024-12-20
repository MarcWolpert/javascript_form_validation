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

// const carousel1 = new Carousel(400, 600, carouselKV);
// headlineContent.appendChild(carousel1.carouselElement);
// carousel1.circleClick();

//form validation
const email = document.getElementById('mail');
email.addEventListener('input', (e) => {
	console.log('email', email.validity);
	if (email.validity.typeMismatch) {
		email.setCustomValidity('I am expecting an email address!');
	} else {
		//renders input valid so form will submit
		email.setCustomValidity('');
	}
});

//form validation of a specific email domain
const email2 = document.getElementById('mail2');
email2.addEventListener('input', (e) => {
	//validate with built-in restraints
	email2.setCustomValidity('');
	if (!email2.validity.valid) {
		return;
	}
	//extend with custom constraints
	if (!email2.value.endsWith('@example.com')) {
		email2.setCustomValidity(
			'Please enter an email address of @example.com',
		);
	}
});

const form3 = document.getElementById('form3');
const email3 = document.getElementById('mail3');
const emailError = document.querySelector('#mail3 + span.error');

email3.addEventListener('input', (event) => {
	if (email3.validity.valid) {
		emailError.textContent = ''; // Remove the message content
		emailError.className = 'error'; // Removes the `active` class
	} else {
		// If there is still an error, show the correct error
		showError();
	}
});

form3.addEventListener('submit', (event) => {
	// if the email field is invalid
	if (!email3.validity.valid) {
		// display an appropriate error message
		showError();
		// prevent form submission
		event.preventDefault();
	}
});

function showError() {
	if (email3.validity.valueMissing) {
		// If empty
		emailError.textContent = 'You need to enter an email address.';
	} else if (email3.validity.typeMismatch) {
		// If it's not an email address,
		emailError.textContent = 'Entered value needs to be an email address.';
	} else if (email3.validity.tooShort) {
		// If the value is too short,
		emailError.textContent = `Email should be at least ${email3.minLength} characters; you entered ${email.value.length}.`;
	}
	// Add the `active` class
	emailError.className = 'error active';
}
