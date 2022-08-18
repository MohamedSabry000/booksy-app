import axios from "axios";
import { IGutendex, IBook } from '../@types/gutendex';

const gutendex = axios.create({
  baseURL: 'https://gutendex.com/books',
} as any);

export const getGutendex = async (): Promise<IGutendex> => {
  const { data } = await gutendex.get('/');
  return data;
}

export const getBook = async (id: string): Promise<IBook> => {
  const { data } = await gutendex.get(`/${id}`);
  return data;
}

export const getBooksPage = async (page: number): Promise<IGutendex> => {
  const { data } = await gutendex.get('/', {
    params: {
      page,
    },
  });
  return data;
}
