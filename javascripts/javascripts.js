// ---------- ПАСПОРТ (переключение RU/EN) ----------

document.addEventListener("DOMContentLoaded", function () {
  let toEn = false;

  const map = {
    ".p-surname": { ru: "Карпова", en: "KARPOVA" },
    ".p-name": { ru: "Мария", en: "MARIYA" },
    ".p-place": {
      ru: "Фрунзенское РУВД г. Минска",
      en: "FRUNZENSKOE ROVD, MINSK",
    },
    ".p-birth": { ru: "23.11.2004", en: "23.11.2004" },
    ".p-sex": { ru: "Ж", en: "F" },
    ".p-date": { ru: "11.11.2018", en: "11.11.2018" },
    ".p-num": { ru: "23112004021892319", en: "23112004021892319" },
    ".p-city": { ru: "г. Минск", en: "MINSK" },
  };

  const btn = document.querySelector(".change");
  if (!btn) return;

  btn.addEventListener("click", () => {
    toEn = !toEn;

    for (const [sel, tr] of Object.entries(map)) {
      const el = document.querySelector(sel);
      if (el) el.textContent = toEn ? tr.en : tr.ru;
    }

    btn.textContent = toEn ? "Вернуть русский" : "Изменить язык";
  });

  const elems = document.getElementsByTagName("h1");
  if (elems.length >= 4) {
    const surname = elems[0].textContent;
    const name = elems[1].textContent;
    const birth = elems[3].textContent;
    console.log("Фамилия:", surname);
    console.log("Имя:", name);
    console.log("Год рождения:", birth);
  }
});

// ---------- АЛГОРИТМИЧЕСКАЯ ЗАДАЧА ----------

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("num");
  const btn = document.querySelector(".problem-btn");
  const result = document.querySelector(".problem-result");

  if (!input || !btn || !result) return;

  btn.addEventListener("click", function () {
    const a = parseFloat(String(input.value).replace(",", "."));
    if (Number.isNaN(a)) {
      result.textContent = "Введите число A";
      result.style.color = "crimson";
      return;
    }

    const x = a < 62 ? a ** 2 + 4 + 5 : 1 / a ** 2 + 4 * a + 5;

    result.style.color = "#000000ff";
    result.textContent = `При A = ${a}, результат X = ${x.toFixed(4)}`;
  });
});

// ---------- НАШИ МАСТЕРА (динамические карточки + запись) ----------

document.addEventListener("DOMContentLoaded", function () {
  const shopList = document.getElementById("shop-list");

  // Если мы не на странице studio.html, просто выходим
  if (!shopList) {
    // Но всё равно обрабатываем селект мастера, если он есть (form.html)
    initMasterSelectFromQuery();
    return;
  }

  // Массив мастеров — аналог примера с товарами у препода
  const masters = [
    {
      id: "alexander",
      name: "александр",
      nick: "@san.portf",
      experience: "10 лет опыта",
      style: "neo-tribal",
      img: "./images/m1.jpg",
    },
    {
      id: "pavel",
      name: "павел",
      nick: "@psh.tt",
      experience: "13 лет опыта",
      style: "все стили",
      img: "./images/m2.jpg",
    },
    {
      id: "alisa",
      name: "алиса",
      nick: "@aalaaiaaasa",
      experience: "4 года опыта",
      style: "все стили",
      img: "./images/m3.jpg",
    },
    {
      id: "sergei",
      name: "сергей",
      nick: "@freesoul.tt",
      experience: "25 лет опыта",
      style: "классика",
      img: "./images/m4.jpg",
    },
    {
      id: "dmitry",
      name: "дмитрий",
      nick: "@di.tats",
      experience: "33 года опыта",
      style: "реализм",
      img: "./images/m5.jpg",
    },
    {
      id: "egor",
      name: "егор",
      nick: "@blackonblack",
      experience: "8 лет опыта",
      style: "все стили",
      img: "./images/m6.jpg",
    },
  ];

  // Генерируем HTML карточек мастеров из массива
  masters.forEach(function (m) {
    const card = document.createElement("div");
    card.classList.add("shop-card");

    card.innerHTML = `
      <div class="shop-card-img" style="background-image: url('${m.img}')"></div>
      <div class="info">
        <p class="infotxt info-txt-1">${m.name}</p>
        <p class="infotxt info-txt-2">${m.nick}</p>
        <p class="infotxt info-txt-3">${m.experience}</p>
        <p class="infotxt info-txt-4">${m.style}</p>
        <button class="shop-button" data-master="${m.id}">записаться</button>
      </div>
    `;

    shopList.appendChild(card);
  });

  // Делегирование событий: ловим клики по кнопкам "записаться"
  shopList.addEventListener("click", function (event) {
    const btn = event.target.closest(".shop-button");
    if (!btn) return;

    const masterValue = btn.dataset.master;
    if (!masterValue) return;

    window.location.href =
      "form.html?master=" + encodeURIComponent(masterValue);
  });

  // На всякий случай инициализируем селект по параметру, если такой есть
  initMasterSelectFromQuery();
});

// ---------- Функция для формы записи (подтянуть мастера из URL) ----------

function initMasterSelectFromQuery() {
  const masterSelect = document.getElementById("master-selection");
  if (!masterSelect) return;

  const params = new URLSearchParams(window.location.search);
  const masterFromUrl = params.get("master");

  if (masterFromUrl) {
    masterSelect.value = masterFromUrl;
  }
}
