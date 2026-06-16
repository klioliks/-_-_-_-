/**
 * script.js — интерактивность для визитки Ольги
 *
 * Здесь четыре небольшие функции:
 * 1. Свечение, следующее за курсором
 * 2. Плавная прокрутка к блоку «О проекте»
 * 3. Появление блока «О проекте» при прокрутке
 * 4. Распускание чернильных цветов при прокрутке (только на компьютере)
 */

// ===== 1. Свечение за курсором =====

const cursorGlow = document.getElementById("cursorGlow");
const body = document.body;

// Проверяем, есть ли у устройства мышь (не тач-экран)
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (hasFinePointer && cursorGlow) {
  body.classList.add("has-mouse");

  // Перемещаем свечение вслед за курсором
  document.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";
  });

  // Скрываем свечение, когда курсор уходит со страницы
  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursorGlow.style.opacity = "1";
  });
}

// ===== 2. Плавная прокрутка по кнопке =====

const scrollBtn = document.getElementById("scrollBtn");
const aboutSection = document.getElementById("about");

if (scrollBtn && aboutSection) {
  scrollBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // scrollIntoView с плавной анимацией
    aboutSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// ===== 3. Появление блока «О проекте» при прокрутке =====

/**
 * Intersection Observer следит, когда элемент попадает в зону видимости,
 * и добавляет класс is-visible для плавного появления.
 */
const aboutBlock = document.querySelector(".about");

if (aboutBlock) {
  aboutBlock.classList.add("reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Отключаем наблюдение после первого появления
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Срабатывает, когда 20% блока видно
    }
  );

  observer.observe(aboutBlock);
}

// ===== 4. Чернильное растение: распускание при прокрутке (только компьютер) =====

const scrollFlowers = document.getElementById("scrollFlowers");

/** Ширина экрана больше 900px — считаем «компьютером» */
const isDesktopFlowers = window.matchMedia("(min-width: 901px)").matches;

if (scrollFlowers && isDesktopFlowers) {
  /**
   * Считаем, насколько пользователь прокрутил страницу (от 0 до 1)
   * и передаём это значение в CSS-переменную --bloom.
   */
  function updateFlowerBloom() {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    const bloom = Math.min(1, Math.max(0, progress));

    scrollFlowers.style.setProperty("--bloom", bloom.toFixed(3));
  }

  // Обновляем при прокрутке и при изменении размера окна
  window.addEventListener("scroll", updateFlowerBloom, { passive: true });
  window.addEventListener("resize", updateFlowerBloom);

  // Начальное состояние — чёрные бутоны
  updateFlowerBloom();
}
