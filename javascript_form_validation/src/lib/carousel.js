export default class Carousel {
	constructor(width, height, imagesWithDescriptions) {
		this.width = width;
		this.height = height;
		this.slides = [];
		this.activeSlideIndex = 0;
		this.carouselElement = this.createCarousel(imagesWithDescriptions);
		this.buttonClick();
	}

	createCarousel(imagesWithDescriptions) {
		const carousel = document.createElement('div');
		carousel.classList.add('image-carousel');
		carousel.style.width = `${this.width}px`;
		carousel.style.height = `${this.height}px`;
		const ul = document.createElement('ul');
		ul.classList.add('images');
		let isFirst = true;

		const circlesDiv = document.createElement('div');
		circlesDiv.style.top = '0px';
		circlesDiv.style.left = `${this.width / 2}px`;
		circlesDiv.className = 'circlesDiv';
		let circlesDivWidth = 0;

		for (const [image, alt] of Object.entries(imagesWithDescriptions)) {
			const li = document.createElement('li');
			li.className = 'slide';
			const img = document.createElement('img');
			img.setAttribute('src', image);
			img.setAttribute('alt', alt);
			img.setAttribute('width', this.width);
			img.setAttribute('height', this.height);
			if (isFirst) {
				li.setAttribute('data-active', '');
				isFirst = false;
				this.activeSlideIndex = 0;
			}
			this.slides = this.slides.concat(li);
			li.appendChild(img);
			const circle = document.createElement('button');
			// add class to circle
			circle.classList.add('circle');
			circle.id = `${image}`;
			console.log(circle);
			circlesDiv.appendChild(circle);
			circlesDivWidth += 1 + 0.25 * 2;
			ul.appendChild(li);
		}
		this.backButton = document.createElement('button');
		this.backButton.className = 'back';
		this.backButton.innerHTML = '&#8656;';
		this.backButton.style.top = `${this.height / 2}px`;
		this.backButton.style.left = '0px';
		this.nextButton = document.createElement('button');
		this.nextButton.className = 'forward';
		this.nextButton.innerHTML = '&#8658;';
		this.nextButton.style.top = `${this.height / 2}px`;
		this.nextButton.style.right = '0px';

		circlesDiv.style.left = `${this.width / 2 - circlesDivWidth}px`;
		circlesDiv.style.transform = `translateX(${-circlesDivWidth / 2}rem)`;
		console.log(circlesDiv);
		carousel.appendChild(circlesDiv);
		carousel.appendChild(ul);
		carousel.appendChild(this.backButton);
		carousel.appendChild(this.nextButton);
		return carousel;
	}

	buttonClick() {
		this.backButton.addEventListener('click', () => {
			this.slides[this.activeSlideIndex].removeAttribute('data-active');
			this.activeSlideIndex =
				this.activeSlideIndex - 1 < 0
					? this.slides.length - 1
					: this.activeSlideIndex - 1;
			this.slides[this.activeSlideIndex].setAttribute('data-active', '');
		});
		this.nextButton.addEventListener('click', () => {
			this.slides[this.activeSlideIndex].removeAttribute('data-active');
			this.activeSlideIndex =
				(this.activeSlideIndex + 1) % this.slides.length;
			this.slides[this.activeSlideIndex].setAttribute('data-active', '');
		});
	}

	circleClick() {
		const circles = document.getElementsByClassName('circle');
		console.log(circles, `${circles.length}`);
		Array.from(circles).forEach((circle) => {
			circle.addEventListener('click', () => {
				console.log(circle.id);
				this.slides[this.activeSlideIndex].removeAttribute(
					'data-active',
				);
				this.activeSlideIndex = Array.from(circles).indexOf(circle);
				this.slides[this.activeSlideIndex].setAttribute(
					'data-active',
					'',
				);
			});
		});
	}
}
