import { Status, ObjectId } from '@deps';
import { OakContext } from '@types';

import BookModel from '@models/book.model.ts';

/**
 * INFO BEFORE YOU READ THE CODE:
 * 
 * ObjectId = MongoDB ObjectId (_id)
 */

// OakContext<"/"> has to match with the route
export const getBooks = async (ctx: OakContext<"/">) => {

    /** Don't have to wrap the function with Try and Catch
     * unless your function return redirect.
     * 
     * ctx.response.redirect();
     */

    const { response: res } = ctx;

    const books = await (await BookModel.find()).toArray();

    // Set HTTP Status Code
    res.status = Status.OK;

    // Return the body
    res.body = {
        data: books,
        error: null
    }

}

// OakContext<"/"> has to match with the route
export const addANewBook = async (ctx: OakContext<"/">) => {

    const { request: req, response: res } = ctx;

    const { value, type } = req.body();

    ctx.assert(type === "json", Status.BadRequest, "Invalid Request Body");

    const { author, title } = await value;

    // Some Req.Body validation here...

    const newBook = await BookModel.create({ author, title });

    res.status = Status.Created;
    res.body = {
        data: newBook,
        error: null
    }

}

// OakContext<"/:bookId"> has to match with the route
export const deleteANewBook = async (ctx: OakContext<"/:bookId">) => {

    const { params: { bookId }, response: res } = ctx;

    const objectIdOfBookId = new ObjectId(bookId);

    // In order to get, update, or delete the book by _id, we have to convert the bookId (string) to ObjectId
    const existedBook = await BookModel.findOne({ _id: objectIdOfBookId });
    ctx.assert(existedBook, Status.NotFound, "Book not found");

    // It returns how many rows were deleted
    const deletedBook = await BookModel.deleteOne({ _id: objectIdOfBookId });

    res.status = Status.OK;
    res.body = {
        data: {
            rows: deletedBook
        },
        error: null
    }

}

// OakContext<"/:bookId"> has to match with the route
export const getABook = async (ctx: OakContext<"/:bookId">) => {

    const { params: { bookId }, response: res } = ctx;

    // Create the ObjectId from the bookId
    const objectIdOfBookId = new ObjectId(bookId);

    const book = await BookModel.findOne({ _id: objectIdOfBookId });

    res.status = Status.OK;
    res.body = {
        data: book
    }

}