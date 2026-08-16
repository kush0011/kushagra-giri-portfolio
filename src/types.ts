export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  link?: string;
  codeLink?: string;
  featured?: boolean;
}

export interface PhotoSlide {
  id: number;
  src: string;
  alt: string;
  title: string;
  caption: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
