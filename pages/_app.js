import { appWithTranslation } from "next-i18next";
import "../styles/globals.css";
import Router from "next/router";
import React, {
  useEffect,
} from "react";
import * as Cookies from '../src/cookies'
import { useRouter } from "next/router";
import { defaultLanguage } from "../src/languages";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
})
Router.events.on('routeChangeStart', (url, { shallow }) => {
  if (shallow === true) return
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
   const router = useRouter();
   function rerouteLocale(wantedLocale) {
     if (router.locale) {
       if (router.locale !== wantedLocale) {
         router.replace(router.asPath, router.asPath, { locale: wantedLocale });
       }
     } else {
       if (router.defaultLocale && router.defaultLocale !== wantedLocale) {
         router.replace(router.asPath, router.asPath, { locale: wantedLocale });
       }
     }
   }
  useEffect(() => {
    const storedLocale = Cookies.getLanguage()
    if (!storedLocale) Cookies.setLanguage(defaultLanguage);
  },[])
  useEffect(() => {
    const storedLocale = Cookies.getLanguage();

    if (storedLocale) {
      rerouteLocale(storedLocale);
    } else if (
      router.locale &&
      (router.locale === "it" || router.locale === "en")
    ) {
      Cookies.setLanguage(router.locale);
    }

  }, [])
  
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
