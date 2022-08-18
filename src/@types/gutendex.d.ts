export interface Person {
    name: string,
    birth_year: number,
    death_year: number,
}
export interface IBook {
  id: number,
  title: string,
  authors: Array<IPerson>,
  translators: Array<IPerson>,
  subjects: Array<string>,
  bookshelves: Array<string>,
  languages: Array<string>,
  copyright: boolean,
  media_type: string,
  formats : {
    'image/jpeg': string,
  },
  download_count: number
}

export interface IGutendex {
  count: number,
  next: string,
  previous: string,
  results: Array<IBook>,
}
