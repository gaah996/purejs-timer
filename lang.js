const texts = {
  "pt": {
    "language-title": "Idioma:",
    "language-pt": "Português",
    "language-en": "Inglês",
    "card-title": "Selecionar data:",
    "card-date": "Data:",
    "card-hour": "Hora:",
    "card-minute": "Minuto:",
    "card-second": "Segundo:",
    "card-submit": "Iniciar",
    "timer-title": "Faltam:",
    "timer-end": "Acabou!",
    "timer-reset": "Resetar"
  },
  "en": {
    "language-title": "Language:",
    "language-pt": "Portuguese",
    "language-en": "English",
    "card-title": "Select date:",
    "card-date": "Date:",
    "card-hour": "Hour:",
    "card-minute": "Minute:",
    "card-second": "Second:",
    "card-submit": "Start",
    "timer-title": "Remaining:",
    "timer-end": "End!",
    "timer-reset": "Reset"
  }
}

function setLanguage(e) {
  var language = localStorage.getItem('language');
  if(e || language) {
    var displayLanguage = [e && e.target.value || language];
    localStorage.setItem('language', displayLanguage);
  } else {
    var displayLanguage = Object.assign([], navigator.languages);
    var defaultLanguage = 'pt';
    displayLanguage.push(defaultLanguage);
  }

  Object.keys(texts).forEach(language => {
    if(displayLanguage.includes(language)) {
      window.langText = texts[language];
      setText();
      initLanguageSelector(language);
    }
  });
}

function setText() {
  let langs = document.querySelectorAll('lang');

  langs.forEach(lang => {
    lang.innerHTML = window.langText[lang.getAttribute('text-id')];
  });
}

function initLanguageSelector(selectedLanguage) {
  let languages = ['en', 'pt'];
  var languageSelect = document.querySelector('#language-selector');

  languageSelect.innerHTML = "";

  languages.forEach(language => {
    languageSelect.appendChild(document.createRange().createContextualFragment(`<option value="${language}" ${language == selectedLanguage ? 'selected' : ''}>${window.langText['language-' + language]}</option>`));
  })
}

function clearLanguage() {
  localStorage.removeItem('language');
  location.reload();
}