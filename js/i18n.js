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
      return {};
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

  function translateContent(translationData) {
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');

    elementsToTranslate.forEach((element) => {
      const placeholder = element.getAttribute('data-i18n');
      const translatedValue = getTranslationByKey(translationData, placeholder);

      if (translatedValue) {
        element.textContent = translatedValue;
      }
    });
  }

  (async function () {
    const userLanguage = getLanguage();
    const translationData = await fetchTranslation(userLanguage);
    translateContent(translationData);
  })();