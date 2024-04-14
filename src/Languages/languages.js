const languages = {
    en: require('./en.json'),
    lt: require('./lt.json')
  };
  
  function getText(key, lang) {
    const language = languages[lang] || languages['en']; // Fallback to English
    const keys = key.split('.');
    let value = language;
    keys.forEach(k => {
      value = value[k];
      if (!value) return undefined;
    });
    return value;
  }
  
  module.exports = { getText };