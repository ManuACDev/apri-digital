import { Media } from "./media";
import { Section } from "./section";

export interface Entity {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  imageSrc: Media;
  images: Media[];
  videoUrl?: Media;
  sections: Section[];
}
