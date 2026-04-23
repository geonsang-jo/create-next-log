import siteConfig from "../../next-log.config";

export type SiteConfig = typeof siteConfig;

export function getConfig(): SiteConfig {
  return siteConfig;
}
