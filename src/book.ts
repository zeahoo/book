import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

interface Book {
  id: number;
  title: string;
  author: string;
}

let books: Book[] = [];

const book = new Hono()
  .get(
    "/",
    async (c, next) => {
      console.log("GET /book before");
      await next();
      console.log("GET /book after");
    },
    (c) => {
      console.log("GET /book");
      return c.json(books);
    }
  )
  .get("/:id", (c) => {
    const { id } = c.req.param();
    const book = books.find((book) => book.id === Number(id));
    if (!book) {
      return c.json({ message: "Book not found" }, 404);
    }
    return c.json(book);
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z
          .string({
            required_error: "Title is required",
          })
          .nonempty(),
        author: z
          .string({
            required_error: "Author is required",
            invalid_type_error: "Author must be a string",
          })
          .nonempty(),
      })
    ),
    async (c) => {
      const { title, author } = await c.req.json();
      const id = books.length + 1;
      books.push({ id, title, author });
      return c.json({ id, title, author }, 201);
    }
  )
  .put("/:id", async (c) => {
    const { id } = c.req.param();
    const { title, author } = await c.req.json();
    const book = books.find((book) => book.id === Number(id));
    if (!book) {
      return c.json({ message: "Book not found" }, 404);
    }
    book.title = title;
    book.author = author;
    return c.json(book, 200);
  })
  .delete("/:id", (c) => {
    const id = c.req.param("id");
    books = books.filter((book) => book.id !== Number(id));
    return c.json({ message: "Book deleted" });
  });

export default book;
