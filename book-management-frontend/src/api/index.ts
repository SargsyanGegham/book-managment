import { Book } from '../store/types';
import axiosInstance from './axiosInstance';

export const fetchBooks = async (params?: Book | object) => {
  try {
    const response = await axiosInstance.get('/books', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (book: { title: string; author: string; isbn: string }) => {
  try {
    const response = await axiosInstance.post('/books', book);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const updateBook = async (id: number, book: { title: string; author: string; isbn: string }) => {
  try {
    const response = await axiosInstance.put(`/books/${id}`, book);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
