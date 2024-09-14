import { Section } from "./section";

export interface Entity {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  images: string[];
  videoUrl?: string;
  sections: Section[];
}
