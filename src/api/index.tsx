import axios from "axios";
import { IGutendex, IBook } from '../@types/gutendex';

const gutendex = axios.create({
  baseURL: 'http://gutendex.com/books',
} as any);

export const getGutendex = async (): Promise<IGutendex> => {
  const { data } = await gutendex.get('/');
  return data;
}

// export const getList = async (query: string) : Promise<IYoutube[]> => {
//   const {data} = await youtube.get('/', {
//     params: {
//       q: query
//     }
//   });
//   return data?.items;
// }