// Функция загрузки курса валют и анимации загрузки старницы
function loadCurrencyRates() {
  const loader = document.getElementById('loader');
  const items = document.getElementById('items');

  loader.classList.add('loader_active');
  items.innerHTML = '';

  /* Отправка запроса. 
  Как только получаем данные просиходит скрытие анимации через loader_active
  */
  fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
      .then(res => res.json())
      .then(data => {
          loader.classList.remove('loader_active');

          const valutes = data.response.Valute;
          let html = '';

          for (let code in valutes) {
              const cur = valutes[code];

              html += `
              <div class="item">
                  <div class="item__code">${cur.CharCode}</div>
                  <div class="item__value">${cur.Value.toFixed(2)}</div>
                  <div class="item__currency">руб.</div>
              </div>
              `;
          }

          items.innerHTML = html;
      });
}

// Загрузка данных на страницу (при ее загрузке)
document.addEventListener('DOMContentLoaded', loadCurrencyRates);