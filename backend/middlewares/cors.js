const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
  'https://localhost:3001',
  'https://sashaproject.nomoredomains.monster',
  'http://sashaproject.nomoredomains.monster',
  'https://api.sashaproject.nomoredomains.monster',
  'http://api.sashaproject.nomoredomains.monster',
  'https://www.api.sashaproject.nomoredomains.monster',
  'http://www.api.sashaproject.nomoredomains.monster',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

function handleCors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.set({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    });
  }

  if (method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Methods': DEFAULT_ALLOWED_METHODS,
      'Access-Control-Allow-Headers': requestHeaders,
    });
    res.end();
    return;
  }

  next();
}

module.exports = handleCors;
