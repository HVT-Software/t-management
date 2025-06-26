export interface NavigationInfo {
  name: string;
  shortName?: string;
  path: string;
  icon?: string;
  children?: NavigationInfo[];
}
