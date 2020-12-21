export const genresJap: string[] = ["公共施設", "交通機関", "レジャー施設", "神社仏閣", "スポーツ施設", "その他"];

export const genresEng: string[] = ["public", "transport", "leisure", "shrinetemple", "sport", "other"];

export interface genresType {
  engName: string;
  japName: string;
}

export const genres: genresType[] = [
  {
    engName: "public",
    japName: "公共施設",
  },
  {
    engName: "transport",
    japName: "交通機関",
  },
  {
    engName: "leisure",
    japName: "レジャー施設",
  },
  {
    engName: "shrinetemple",
    japName: "神社仏閣",
  },
  {
    engName: "sport",
    japName: "スポーツ施設",
  },
  {
    engName: "other",
    japName: "その他",
  },
];
