'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1xords = section1.getBoundingClientRect();
  console.log(e.target.getBoundingClientRect());
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    //     console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
////////////////////////////////////
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//////////////////////////////
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

/////////////////////////

// window.addEventListener('scroll', function () {
//   console.log(this.scrollY);
//   if (window.scrollY > 60) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
const header = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-85px',
});
observer.observe(header);
///////////////////////////////
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//////////////////////////////

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
imgTargets.forEach(img => imgObserver.observe(img));
////////////////////////////////
const sliderr = function () {
  const slides = document.querySelectorAll('.slide');

  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (s, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  let crnSlide = 0;
  const nxtSlide = function () {
    crnSlide++;
    if (crnSlide > 2) crnSlide = 0;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - crnSlide)}%)`)
    );
    activateDot(crnSlide);
  };
  const prevSlide = function () {
    crnSlide--;
    if (crnSlide < 0) crnSlide = 2;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - crnSlide)}%)`)
    );
    activateDot(crnSlide);
  };
  createDots();

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"`)
      .classList.add('dots__dot--active');
  };
  activateDot(0);
  btnRight.addEventListener('click', nxtSlide);
  btnLeft.addEventListener('click', prevSlide);

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nxtSlide();
  });
};
sliderr();
////////////////////////////////

/////////////////////////////
// window.scrollTo({
//   left: s1xords.left + window.pageXOffset,
//   top: s1xords.top + window.pageYOffset,
//   behavior: 'smooth',
// const h1 = document.querySelector('h1');
// const alertt = function (e) {
//   alert('hahahahahahah');
// };
// h1.addEventListener('mouseenter', alertt);

// setTimeout(() => h1.removeEventListener('mouseenter', alertt), 3000);
// const randomINt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomINt(0, 255)},${randomINt(0, 255)},${randomINt(0, 255)})`;
// // console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document
//   .querySelector('.nav__links')
//   .addEventListener('click', function (e) {});
// document.querySelector('.nav').addEventListener('click', function (e) {});
