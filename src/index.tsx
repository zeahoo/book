import { Hono } from "hono";
import bookRoute from "./book";
import { customLogger } from "./middleware/customLogger";
const app = new Hono();

app.notFound((c) => {
  return c.html(<h1>Not Found</h1>);
});

// app.onError((err, c) => {
//   return c.html(<h1>Error</h1>);
// });

app.use(customLogger);

const route = app
  .get("/", (c) => {
    return c.html(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://cdn.simplecss.org/simple.min.css"
          />
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js" />
          ) : (
            <script type="module" src="/src/client.tsx" />
          )}
        </head>
        <body>
          <div id="root" />
        </body>
      </html>
    );
  })

  .route("/book", bookRoute);

export type AppType = typeof route;
export default app;
