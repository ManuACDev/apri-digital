import { Media } from "./media";
import { Section } from "./section";

export interface Entity {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  images: Media[];
  videoUrl?: string;
  sections: Section[];
}
