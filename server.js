const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    
    res.setHeader(
      "Content-Security-Policy-Report-Only",
      "script-src 'nonce-abc123' 'unsafe-eval'"
    );

    // Same results when enforcing the CSP rather than just reporting, and even with a totally bogus header value.
    // res.setHeader(
    //   "Content-Security-Policy",
    //   "foo"
    // );

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
