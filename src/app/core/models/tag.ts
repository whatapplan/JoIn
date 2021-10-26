export interface Tag {
  emoji: string;
  name: string;
}
export interface TagCategory {
  name: string;
  // tags: string[];
  tags: Tag[];
}
