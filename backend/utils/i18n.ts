import i18n from "i18next";

if (!i18n.isInitialized) {
  i18n.init({
    lng: "en",
    fallbackLng: "en",
    resources: {},
  });
}

export default i18n;