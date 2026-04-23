import { createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "./next-i18next.config";

const namespace = "common";

export default async function initTranslations(
  lang?: string,
  i18nInstance?: i18n,
  resources?: any
) {
  i18nInstance = i18nInstance || createInstance();
  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string) =>
          import(`./public/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: lang || i18nConfig.defaultLocale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespace,
    fallbackNS: namespace,
    ns: namespace,
    preload: resources ? [] : [lang || i18nConfig.defaultLocale],
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
