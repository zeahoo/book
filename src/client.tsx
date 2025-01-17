import { hc } from "hono/client";
import { render, useEffect, useState } from "hono/jsx/dom";
import type { AppType } from ".";
import { Book } from "./book";

const client = hc<AppType>("/");

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    async function fetchBooks() {
      const res = await client.book.$get();
      const data = await res.json();
      setBooks(data);
    }
    fetchBooks();
  }, []);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const res = await client.book.$post({
      json: {
        title,
        author,
      },
    });
    const data = await res.json();
    // 重定向
    window.location.href = "/";
  }
  return (
    <>
      <h2>Add books</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="author" placeholder="Author" />
        <button type="submit">Add</button>
      </form>
      <h2>Books</h2>
      <div>
        {books.map((book) => (
          <div key={book.id}>
            {book.title} - {book.author}
          </div>
        ))}
      </div>
    </>
  );
}
const root = document.getElementById("root")!;
render(<App />, root);
