// Получаем массивы всех изображений и точек слайдера
const slides = Array.from(document.querySelectorAll('.slider__item'));
const dots = Array.from(document.querySelectorAll('.slider__dot'));

// Переключатели назад и вперед
const prev = document.querySelector('.slider__arrow_prev');
const next = document.querySelector('.slider__arrow_next');

let currentIndex = 0;

/* Функция отображения слайда, которая выполняется согласоно условию:
1. Если значение < 0, то переходим в конец
2. Если вышли за послдений индекс, то возвращаемся в начало
3. Иначе обычное переключение (вперед-назад)
*/
function showSlide(index) {
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle('slider__item_active', i === currentIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('slider__dot_active', i === currentIndex);
  });
}

prev.onclick = () => showSlide(currentIndex - 1);
next.onclick = () => showSlide(currentIndex + 1);

dots.forEach((dot, i) => {
  dot.onclick = () => showSlide(i);
});

// при запуске отображается перввя фотография
showSlide(currentIndex);