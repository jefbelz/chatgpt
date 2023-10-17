  function getLanguage() {
    // Get the user's selected language from the language selector dropdown
    const languageSelect = document.getElementById('languageSelect');
    console.log(languageSelect);
    return languageSelect.value;
  }
   let translationData = {};
  async function fetchTranslation(language) {
    try {
      const response = await fetch(`i18n/${language}.json`);
      translationData = await response.json();
      return translationData;
    } catch (error) {
      console.error('Error fetching translation:', error);
      const response = await fetch(`i18n/ru.json`);
      translationData = await response.json();
      return translationData;
    }
  }

  function getTranslation(key) {
    const keys = key.split('.');
    let value = translationData;
    for (const k of keys) {
      value = value[k];
      if (!value) return null;
    }
    return value;
  }


  function getTranslationByKey(translationData, key) {
    const keys = key.split('.');
    let value = translationData;
    for (const k of keys) {
      value = value[k];
      if (!value) return null;
    }
    return value;
  }

  function getBCP47LanguageCode(languageCode) {
    const regionCodeMap = {
      'es': 'es-ES',
      'en': 'en-US',
      'ru': 'ru-RU',
      'es-es': 'es-ES',
      'en-us': 'en-US',
       'en-uk': 'en-US',
      'ru-ru': 'ru-RU',
      // Add more language codes and region codes as needed
    };
    const i18nCode = regionCodeMap[languageCode.toLowerCase()];

    if (i18nCode) {
      return i18nCode;
    } else {
      return 'ru'; // Default to the provided language code if not found
    }
  }

  function getI18nCode(languageCode) {
    const regionCodeMap = {
      'es-es': 'es',
      'en-us' : 'en',
      'ru-ru': 'ru' ,
      'es' : 'es',
      'en' : 'en',
      'ru' : 'ru'
      // Add more language codes and region codes as needed
    };
    const i18nCode = regionCodeMap[languageCode.toLowerCase()];

    if (i18nCode) {
      return i18nCode;
    } else {
      return 'ru'; // Default to the provided language code if not found
    }
  }


  function translateContent(translationData) {
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');

    elementsToTranslate.forEach((element) => {
      const placeholder = element.getAttribute('data-i18n');
      const translatedValue = getTranslationByKey(translationData, placeholder);

      if (translatedValue) {
        element.innerHTML= translatedValue;
      }
    });
  }

  (async function () {
    try {
        const userLanguage = getLanguage();
        const translationData = await fetchTranslation(userLanguage);
        translateContent(translationData);
    } catch (error) {
        console.log("not from website");
    }
  })();