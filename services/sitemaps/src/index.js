const micro = require('micro');

const { retrieve, generate, googleNews } = require('./routes');

const server = micro(async (req, res) => {
  if (req.url === '/sitemap-google-news.xml') return googleNews(req, res);
  if (/^\/sitemap(?:.*).xml$/.test(req.url)) return retrieve(res, req.url);
  if (/^\/generate$/.test(req.url)) return generate(req, res);
  throw micro.createError(404, 'Not found');
});

server.listen(80);