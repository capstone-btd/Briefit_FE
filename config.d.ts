// config.d.ts
import { PluginUtils } from "tailwindcss/types/config";

declare global {
  type ResolvableTo<T, U> = T | ((utils: PluginUtils) => U);
}

export {};
