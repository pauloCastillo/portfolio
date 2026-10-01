import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type HeadersType = {
  title: string;
  subtitle?: string;
  breadcrumb?: Array<string>;
  icons?: IconDefinition[];
  searchbar?: boolean;
};

export type Signal = {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  alert: boolean;
};