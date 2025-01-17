import { Hono } from "hono";
import book from "./book";
import { customLogger } from "./middleware/customLogger";
const app = new Hono();

app.notFound((c) => {
  return c.html(<h1>Not Found</h1>);
});

// app.onError((err, c) => {
//   return c.html(<h1>Error</h1>);
// });

app.use(customLogger);

app
  .get("/", (c) => {
    const userAgent = c.req.header("User-Agent");
    const { q, limit, offset } = c.req.query();
    return c.json({
      message: `Hello Hono! from ${userAgent}`,
    });
  })
  .route("/book", book);

export default app;
