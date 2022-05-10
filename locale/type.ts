import { LocaleMessageDictionary, VueMessageType } from "vue-i18n";
import type L from "./en_US";

type _L = typeof L;
export interface Locale extends _L, LocaleMessageDictionary<VueMessageType> {}
