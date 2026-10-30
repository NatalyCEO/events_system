const screens = [
  ["p-login", "Вход"],
  ["p-reg", "Регистрация"],
  ["p-catalog", "Главная"],
  ["p-events", "Все мероприятия"],
  ["p-event", "Мероприятие"],
  ["p-signup", "Запись"],
  ["p-conf", "Конференция"],
  ["p-conf-form", "Заявка на конференцию"],
  ["p-conf-files", "Загрузка материалов"],
  ["p-cabinet", "Кабинет"],
  ["p-contacts", "Контакты"],
  ["p-a-login", "Админ · вход"],
  ["p-a-home", "Админ · обзор"],
  ["p-a-list", "Админ · мероприятия"],
  ["p-a-event", "Админ · карточка"],
  ["p-a-conf", "Админ · конференция"],
  ["p-a-form", "Админ · создать"],
  ["p-a-people", "Админ · участники"],
  ["p-a-attend", "Админ · явка"],
  ["p-a-award", "Админ · баллы"],
  ["p-a-coins", "Админ · ЛЭТИ-КОИНы"],
  ["p-a-changes", "Админ · заявки анкеты"],
  ["p-a-change", "Админ · заявка"],
  ["p-a-diplomas", "Админ · дипломы"],
  ["p-a-apps", "Админ · абитуриенты"],
  ["p-a-person", "Админ · человек"],
  ["p-a-stats", "Админ · статистика"],
];

const STAT_PRESETS = {
  year: ["2026-09-01", "2027-08-31"],
  fall: ["2026-09-01", "2026-12-31"],
  month: ["2026-12-01", "2026-12-31"],
};

function fmtRuDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function statsRangeLabel() {
  const from = document.getElementById("stat-from");
  const to = document.getElementById("stat-to");
  const lab = document.querySelector(".stats-filter-actions .place");
  if (from && to && lab) lab.textContent = `${fmtRuDate(from.value)} — ${fmtRuDate(to.value)}`;
}

function statsPreset() {
  const preset = document.getElementById("stat-preset");
  const pair = STAT_PRESETS[preset?.value];
  if (!pair) return;
  const from = document.getElementById("stat-from");
  const to = document.getElementById("stat-to");
  from.value = pair[0];
  to.value = pair[1];
  statsRangeLabel();
}

function statsDatesManual() {
  const preset = document.getElementById("stat-preset");
  if (preset) preset.value = "custom";
  statsRangeLabel();
}

const cabTabs = ["profile", "form", "change", "apps", "points", "docs"];
const legacy = { "p-apps": "apps", "p-profile": "form", "p-points": "points" };

function vkIcon() {
  return `<img class="vk-ico" src="assets/vk-logo.png" alt="" width="16" height="10" />`;
}

function applicantFooter() {
  return `<footer class="site-foot">
    <div class="wrap foot-inner">
      <div class="foot-grid">
        <div>
          <h4>Поступающим</h4>
          <a href="https://abit.etu.ru/" target="_blank" rel="noopener">Преимущества СПбГЭТУ «ЛЭТИ»</a>
          <a href="https://abit.etu.ru/ru/postupayushhim/bakalavriat-i-specialitet/napravleniya-podgotovki/" target="_blank" rel="noopener">Направления подготовки</a>
          <a href="https://abit.etu.ru/ru/postupayushhim/bakalavriat-i-specialitet/" target="_blank" rel="noopener">Приём на первый курс</a>
          <a href="https://abit.etu.ru/ru/postupayushhim/magistratura/" target="_blank" rel="noopener">Приём в магистратуру</a>
          <a href="https://abit.etu.ru/ru/postupayushhim/aspirantura/" target="_blank" rel="noopener">Приём в аспирантуру</a>
          <a href="https://abit.etu.ru/ru/postupayushhim/dovuzovskaya-podgotovka/" target="_blank" rel="noopener">Довузовская подготовка</a>
        </div>
        <div>
          <h4>Приёмная комиссия</h4>
          <a href="tel:+78123258705">+7 812 325-87-05</a>
          <a href="mailto:prcom@etu.ru">prcom@etu.ru</a>
          <a class="foot-vk" href="https://vk.ru/vleti" target="_blank" rel="noopener">${vkIcon()}Поступающим на 1 курс</a>
          <a class="foot-vk" href="https://vk.ru/eltech_magister" target="_blank" rel="noopener">${vkIcon()}Поступающим в магистратуру</a>
          <a class="foot-cta" href="#p-contacts" onclick="go('p-contacts');return false;">Контакты</a>
        </div>
        <div>
          <h4>СПбГЭТУ «ЛЭТИ»</h4>
          <a href="https://etu.ru/" target="_blank" rel="noopener">Официальный сайт университета</a>
          <p>ул. Профессора Попова, д. 5, Санкт-Петербург</p>
        </div>
      </div>
    </div>
  </footer>`;
}

function applicantHeader() {
  return `<header class="top app-top">
    <a class="brand" href="#p-catalog" onclick="go('p-catalog');return false;">СПбГЭТУ «ЛЭТИ» · мероприятия</a>
    <div class="userbar">
      <button type="button" class="points" onclick="go('p-cabinet','points')" title="Баллы и сертификаты">
        <span class="coin" aria-hidden="true"></span>
        <span class="pts-num">17</span>
        <span class="pts-lab">баллов</span>
      </button>
      <button type="button" class="who" onclick="go('p-cabinet','profile')">Фамилия Имя Отчество</button>
    </div>
  </header>`;
}

function adminHeader() {
  return `<header class="top app-top">
    <a class="brand" href="#p-a-home" onclick="go('p-a-home');return false;">СПбГЭТУ «ЛЭТИ» · приёмная комиссия</a>
    <div class="userbar"><span class="who">Фамилия Имя Отчество</span></div>
  </header>`;
}

function adminNavHTML() {
  return `<aside class="cab-nav">
    <button type="button" data-nav="home" onclick="go('p-a-home')">Обзор</button>
    <button type="button" data-nav="events" onclick="go('p-a-list')">Мероприятия</button>
    <button type="button" data-nav="attend" onclick="go('p-a-attend')">Посещаемость</button>
    <button type="button" data-nav="award" onclick="go('p-a-award')">Баллы и сертификаты</button>
    <button type="button" data-nav="coins" onclick="go('p-a-coins')">ЛЭТИ-КОИНы</button>
    <button type="button" data-nav="changes" onclick="go('p-a-changes')">Заявки</button>
    <button type="button" data-nav="apps" onclick="go('p-a-apps')">Абитуриенты</button>
    <button type="button" data-nav="stats" onclick="go('p-a-stats')">Статистика</button>
  </aside>`;
}

function decorateAdmin(sec) {
  sec.insertAdjacentHTML("afterbegin", adminHeader());
  const wrap = sec.querySelector(".wrap");
  if (!wrap) return;
  const main = document.createElement("div");
  main.className = "cab-main";
  while (wrap.firstChild) main.appendChild(wrap.firstChild);
  const shell = document.createElement("div");
  shell.className = "cab-shell";
  shell.insertAdjacentHTML("afterbegin", adminNavHTML());
  shell.appendChild(main);
  wrap.appendChild(shell);
}

function markAdminNav(id) {
  const key = document.getElementById(id)?.dataset.nav;
  document.querySelectorAll("[data-role='admin'] .cab-nav button").forEach((b) => {
    b.classList.toggle("on", b.dataset.nav === key);
  });
}

function cabTab(tab) {
  const id = cabTabs.includes(tab) ? tab : "profile";
  document.querySelectorAll(".cab-nav button[data-tab]").forEach((b) => {
    b.classList.toggle("on", b.dataset.tab === id);
  });
  document.querySelectorAll(".cab-pane").forEach((p) => {
    p.classList.toggle("on", p.dataset.pane === id);
  });
  return id;
}

function go(id, tab) {
  if (legacy[id]) {
    tab = legacy[id];
    id = "p-cabinet";
  }
  document.querySelectorAll(".screen").forEach((el) => el.classList.toggle("on", el.id === id));
  document.querySelectorAll(".tabs button[data-id]").forEach((b) => b.classList.toggle("on", b.dataset.id === id));
  let hash = id;
  if (id === "p-cabinet") {
    const opened = cabTab(tab || "profile");
    hash = opened === "profile" ? "p-cabinet" : "p-cabinet/" + opened;
  }
  markAdminNav(id);
  window.scrollTo(0, 0);
  history.replaceState(null, "", "#" + hash);
}

function routeFromHash() {
  const raw = (location.hash || "#p-catalog").slice(1);
  const [id, tab] = raw.split("/");
  if (legacy[id]) {
    go("p-cabinet", legacy[id]);
    return;
  }
  if (screens.some((s) => s[0] === id)) go(id, tab);
  else go("p-catalog");
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("section.screen[data-role='applicant']").forEach((sec) => {
    sec.insertAdjacentHTML("afterbegin", applicantHeader());
  });
  document.querySelectorAll("section.screen:not(.admin)").forEach((sec) => {
    sec.insertAdjacentHTML("beforeend", applicantFooter());
  });
  document.querySelectorAll("section.screen[data-role='admin']").forEach(decorateAdmin);
  document.querySelectorAll("#p-cabinet .cab-nav button[data-tab]").forEach((b) => {
    b.onclick = () => go("p-cabinet", b.dataset.tab);
  });

  const create = document.getElementById("event-create");
  if (create) {
    const format = create.querySelector(".js-format");
    const link = create.querySelector(".js-online-link");
    const pointsOn = create.querySelector(".js-points-on");
    const pointsMore = create.querySelector(".js-points-more");
    const certOn = create.querySelector(".js-cert-on");
    const certMore = create.querySelector(".js-cert-more");
    if (format && link) {
      format.onchange = () => {
        link.hidden = format.value === "offline";
      };
    }
    if (pointsOn && pointsMore) {
      pointsOn.onchange = () => {
        pointsMore.hidden = pointsOn.value !== "yes";
      };
    }
    if (certOn && certMore) {
      certOn.onchange = () => {
        certMore.hidden = certOn.value !== "yes";
      };
    }
    const kind = create.querySelector(".js-kind");
    const confMore = create.querySelector(".js-conf-more");
    const aud = create.querySelector(".js-aud");
    const grades = create.querySelector(".js-grades");
    const pointsBlock = create.querySelector(".js-points-block");
    const coinsWrap = create.querySelector(".js-coins-wrap");
    function syncCreate() {
      const isConf = kind?.value === "conference";
      const v = aud?.value || "school";
      const coins = isConf || v === "student" || v === "both";
      if (confMore) confMore.hidden = !isConf;
      if (grades) grades.hidden = v === "student";
      if (pointsBlock) pointsBlock.hidden = coins;
      if (coinsWrap) coinsWrap.hidden = !coins;
    }
    if (kind) kind.onchange = syncCreate;
    if (aud) aud.onchange = syncCreate;
    syncCreate();
    const coinsOn = create.querySelector(".js-coins-on");
    const coinsMore = create.querySelector(".js-coins-more");
    if (coinsOn && coinsMore) {
      coinsOn.onchange = () => {
        coinsMore.hidden = coinsOn.value !== "yes";
      };
    }
    const acts = document.getElementById("event-acts");
    const addActBtn = document.getElementById("add-act");
    function bindAct(card) {
      const lim = card.querySelector(".js-act-lim");
      const more = card.querySelector(".js-act-lim-more");
      if (lim && more) {
        lim.onchange = () => {
          more.hidden = lim.value !== "yes";
        };
      }
      const del = card.querySelector(".js-del-act");
      if (del) del.onclick = () => card.remove();
    }
    function addAct() {
      const n = (acts?.children.length || 0) + 1;
      const card = document.createElement("div");
      card.className = "q-card";
      card.innerHTML = `<div class="q-head"><strong>Активность ${n}</strong><button type="button" class="btn btn-line js-del-act">Удалить</button></div>
        <label>Тип</label>
        <select>
          <option>Мастер-класс</option>
          <option>Экскурсия</option>
          <option>Встреча</option>
          <option>Другое</option>
        </select>
        <label>Название</label>
        <input placeholder="Например: Лаборатории и факультеты" />
        <div class="form-grid">
          <div class="field"><label>Время</label><input type="time" /></div>
          <div class="field"><label>Место</label><input placeholder="аудитория N" /></div>
        </div>
        <label>Лимит мест</label>
        <select class="js-act-lim">
          <option value="no">Нет</option>
          <option value="yes">Да</option>
        </select>
        <div class="js-act-lim-more cond-box" hidden>
          <label>Сколько мест</label>
          <input type="number" min="1" placeholder="15" />
        </div>`;
      acts.appendChild(card);
      bindAct(card);
    }
    if (addActBtn && acts) {
      addActBtn.onclick = addAct;
      addAct();
    }

    const list = document.getElementById("extra-qs");
    const addQ = document.getElementById("add-q");
    function bindQuestion(card) {
      const type = card.querySelector(".js-q-type");
      const opts = card.querySelector(".js-q-opts");
      const addOpt = card.querySelector(".js-add-opt");
      if (type && opts) {
        type.onchange = () => {
          opts.hidden = type.value === "text";
        };
      }
      if (addOpt && opts) {
        addOpt.onclick = () => {
          const row = document.createElement("div");
          row.className = "opt-row";
          row.innerHTML = `<input placeholder="Вариант ответа" /><button type="button" class="btn btn-line js-del-opt">×</button>`;
          opts.insertBefore(row, addOpt);
          row.querySelector(".js-del-opt").onclick = () => row.remove();
        };
      }
      card.querySelectorAll(".js-del-opt").forEach((b) => {
        b.onclick = () => b.parentElement.remove();
      });
      const del = card.querySelector(".js-del-q");
      if (del) del.onclick = () => card.remove();
    }
    function addQuestion() {
      const n = (list?.children.length || 0) + 1;
      const card = document.createElement("div");
      card.className = "q-card";
      card.innerHTML = `<div class="q-head"><strong>Вопрос ${n}</strong><button type="button" class="btn btn-line js-del-q">Удалить</button></div>
        <label>Текст вопроса</label>
        <input placeholder="Например: Откуда узнали о мероприятии?" />
        <label>Тип ответа</label>
        <select class="js-q-type">
          <option value="one">Один вариант</option>
          <option value="many">Несколько вариантов</option>
          <option value="text">Свой ответ</option>
        </select>
        <div class="js-q-opts">
          <div class="opt-row"><input placeholder="Вариант ответа" /><button type="button" class="btn btn-line js-del-opt">×</button></div>
          <div class="opt-row"><input placeholder="Вариант ответа" /><button type="button" class="btn btn-line js-del-opt">×</button></div>
          <button type="button" class="btn btn-line js-add-opt">Добавить вариант</button>
        </div>`;
      list.appendChild(card);
      bindQuestion(card);
    }
    if (addQ && list) {
      addQ.onclick = addQuestion;
      addQuestion();
    }
  }

  const markAll = document.getElementById("mark-all");
  if (markAll) {
    markAll.onclick = () => {
      document.querySelectorAll(".js-attend").forEach((el) => {
        el.checked = true;
      });
    };
  }

  const filterBtn = document.getElementById("toggle-apps-filters");
  const filterSheet = document.getElementById("apps-filters");
  if (filterBtn && filterSheet) {
    filterBtn.onclick = () => {
      filterSheet.hidden = !filterSheet.hidden;
    };
  }
  const level = document.getElementById("apps-level");
  const classWrap = document.getElementById("apps-class-wrap");
  if (level && classWrap) {
    level.onchange = () => {
      classWrap.hidden = level.value !== "school";
    };
  }

  const chg = document.getElementById("chg-rows");
  const addChg = document.getElementById("add-chg");
  function addChgRow() {
    const row = document.createElement("div");
    row.className = "chg-row";
    row.innerHTML = `<select>
        <option>Фамилия</option><option>Имя</option><option>Отчество</option>
        <option>Телефон</option><option>Email</option><option>Школа / вуз</option>
        <option>Город</option><option>Регион</option>
      </select>
      <input placeholder="Новое значение" />
      <button type="button" class="btn btn-line js-del-chg">×</button>`;
    chg.appendChild(row);
    row.querySelector(".js-del-chg").onclick = () => {
      if (chg.children.length > 1) row.remove();
    };
  }
  if (chg && addChg) {
    addChg.onclick = addChgRow;
    addChgRow();
  }

  const MAX_SUP = 2;
  function bindSupervisors(root) {
    if (!root) return;
    const list = root.querySelector(".js-sup-list");
    const addBtn = root.querySelector(".js-add-sup");
    if (!list || !addBtn) return;
    function syncAdd() {
      addBtn.hidden = list.children.length >= MAX_SUP;
    }
    function addSupervisor() {
      if (list.children.length >= MAX_SUP) return;
      const n = list.children.length + 1;
      const card = document.createElement("div");
      card.className = "q-card";
      card.innerHTML = `<div class="q-head"><strong>Руководитель ${n}</strong><button type="button" class="btn btn-line js-del-sup">Удалить</button></div>
        <div class="form-grid">
          <div class="field"><label>Фамилия</label><input /></div>
          <div class="field"><label>Имя</label><input /></div>
          <div class="field"><label>Отчество</label><input /></div>
          <div class="field span2"><label>Место работы</label><input /></div>
          <div class="field span2"><label>Должность</label><input /></div>
        </div>`;
      list.appendChild(card);
      card.querySelector(".js-del-sup").onclick = () => {
        if (list.children.length > 1) card.remove();
        syncAdd();
      };
      syncAdd();
    }
    addBtn.onclick = addSupervisor;
    addSupervisor();
  }

  const editHost = document.getElementById("conf-edit-form");
  const srcForm = document.getElementById("p-conf-form");
  if (editHost && srcForm) {
    srcForm.querySelectorAll(".panel.form").forEach((panel) => {
      editHost.appendChild(panel.cloneNode(true));
    });
    const first = editHost.querySelector("h3");
    if (first) first.textContent = "Данные заявки";
    const save = editHost.querySelector(".btn-pri");
    if (save) {
      save.textContent = "Сохранить изменения";
      save.removeAttribute("onclick");
    }
  }
  bindSupervisors(srcForm);
  bindSupervisors(editHost);

  const coinAll = document.querySelector(".js-coin-all");
  if (coinAll) {
    coinAll.onchange = () => {
      document.querySelectorAll(".js-coin-st").forEach((el) => {
        el.checked = coinAll.checked;
      });
    };
  }

  const DEG_PEOPLE = [
    { id: 1, name: "Фамилия Имя Отчество", topic: "Распознавание жестов" },
    { id: 2, name: "Фамилия Имя Отчество", topic: "Модуль расписания" },
    { id: 3, name: "Фамилия Имя Отчество", topic: "Стенд робототехники" },
    { id: 4, name: "Фамилия Имя Отчество", topic: "Цифровой двойник" },
    { id: 5, name: "Фамилия Имя Отчество", topic: "Сеть на ПЛИС" },
  ];
  const assigned = { 1: new Set(), 2: new Set(), 3: new Set() };
  function takenExcept(deg) {
    const s = new Set();
    [1, 2, 3].forEach((d) => {
      if (d !== deg) assigned[d].forEach((id) => s.add(id));
    });
    return s;
  }
  function renderDeg() {
    const grid = document.getElementById("deg-grid");
    if (!grid) return;
    [1, 2, 3].forEach((deg) => {
      const list = grid.querySelector(`[data-deg="${deg}"] .js-deg-list`);
      const taken = takenExcept(deg);
      list.innerHTML = DEG_PEOPLE.filter((p) => !taken.has(p.id))
        .map(
          (p) =>
            `<label class="check-row"><span>${p.name}<small class="place">${p.topic}</small></span><input type="checkbox" data-id="${p.id}" data-deg="${deg}" ${assigned[deg].has(p.id) ? "checked" : ""} /></label>`
        )
        .join("");
    });
  }
  const degGrid = document.getElementById("deg-grid");
  if (degGrid) {
    degGrid.addEventListener("change", (e) => {
      const t = e.target;
      if (t.classList.contains("js-deg-all")) {
        const deg = Number(t.dataset.deg);
        const taken = takenExcept(deg);
        DEG_PEOPLE.forEach((p) => {
          if (!taken.has(p.id)) {
            if (t.checked) assigned[deg].add(p.id);
            else assigned[deg].delete(p.id);
          }
        });
        renderDeg();
        return;
      }
      if (t.dataset.deg && t.dataset.id) {
        const deg = Number(t.dataset.deg);
        const id = Number(t.dataset.id);
        if (t.checked) {
          assigned[deg].add(id);
          [1, 2, 3].forEach((d) => {
            if (d !== deg) assigned[d].delete(id);
          });
        } else assigned[deg].delete(id);
        renderDeg();
      }
    });
    renderDeg();
  }
  const bar = document.getElementById("tabs");
  screens.forEach(([id, label]) => {
    if (id === "p-a-login") {
      const sep = document.createElement("span");
      sep.className = "sep";
      bar.appendChild(sep);
    }
    const b = document.createElement("button");
    b.textContent = label;
    b.dataset.id = id;
    b.onclick = () => go(id);
    bar.appendChild(b);
  });
  routeFromHash();
  window.addEventListener("hashchange", routeFromHash);
});
