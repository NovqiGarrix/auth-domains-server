import { novo } from '@deps';

export interface IBookModel {

    _id: string;

    author: string;

    title: string;

    createdAt: string;

    updatedAt: string;

}

const BookModel = novo.model<IBookModel>("books");
export default BookModel;