const http = require('http');
const https = require('https');
const schemas = require('./schemas');
const URL = require('url').URL; // https://stackoverflow.com/questions/52566578/url-is-not-defined-in-node-js/52566656

// This basically serves our own schemas or proxies calls to https://kubernetesjsonschema.dev/
// We have to do this cos github.com/instrumenta/kubernetes-json-schema is 4.2GB!

const defaultSchemaSite = 'https://kubernetesjsonschema.dev';

const sendError = res => err => {
  console.warn(err);
  res.writeHead(500);
  res.end(JSON.stringify(err));
};

const cache = {};

const retryOnError = (reqPath, res, opts = {}, fail) => err => {
  if (opts.attempts || 0 > 10) {
    fail(err)
    return
  }

  if (err.code == "ETIMEDOUT") {
    const wait = ((opts.attempts || 0) + 1) * 1000;
    console.warn(`Request timed out attempting again in ${Math.round(wait / 1000)} seconds ${reqPath}`)
    setTimeout(() => requestSchema(reqPath, res, { ...opts, attempts: (opts.attempts || 0) + 1 }), wait)
    return
  }

  fail(err)
  return
}

const requestSchema = (reqPath, res, opts = {}) => {
  const url = new URL((opts.schemaLocation ?? defaultSchemaSite) + reqPath);
  const client = https.request(
    {
      host: url.host,
      path: url.pathname,
      port: url.port,
      protocol: url.protocol,
      headers: {
        ...(opts.githubToken
          ? {Authorization: `token ${opts.githubToken}`}
          : {})
      }
    },
    msg => {
      res.writeHead(msg.statusCode, msg.headers);
      let data = '';
      msg.on('data', curData => {
        data += curData;
      });
      msg.on('end', () => {
        addToCache(data, msg);
        res.end(data);
      });
    }
  );
  client.on('error', retryOnError(reqPath, res, opts, sendError(res)));
  client.end();
  const addToCache = (data, msg) => {
    const roundedStatusCode = Math.round(msg.statusCode / 100) * 100;
    if (roundedStatusCode != 200) {
      console.warn(msg.statusCode + '\t' + url.toString());
      // cache[reqPath] = { code: roundedStatusCode };
      return;
    }
    if (msg.headers['content-type'] != 'application/json') {
      console.warn('Cant cache ' + msg.headers['content-type']);
      return;
    }
    let json;
    try {
      json = data.toString('utf8');
      const obj = JSON.parse(json);
      cache[reqPath] = {code: roundedStatusCode, data: obj};
    } catch (err) {
      console.warn('Error caching', json, err);
    }
  };
};

const schemaCache = next => (reqPath, res, opts = {}) => {
  const cached = cache[reqPath];
  if (cached && cached.code !== 200) {
    res.writeHead(cached.code);
    res.end(cached.data);
    return;
  }
  if (cached) {
    res.writeHead(cached.code, 'application/json');
    res.end(JSON.stringify(cached.data));
    return;
  }
  next(reqPath, res, opts);
};

const codeSchema = next => (reqPath, res, opts = {}) => {
  const rx = /^\/?[^\/]+/;
  const key = reqPath.toLowerCase();
  const schema = schemas[key] || schemas[key.replace(rx, '')];
  if (!schema) {
    next(reqPath, res, opts);
    return;
  }
  res.writeHead(200, 'application/json');
  res.end(JSON.stringify(schema));
};

const getSchema = codeSchema(schemaCache(requestSchema));

function start(port, schemaLocation, githubToken) {
  return new Promise((started, rej) => {
    let server;
    const promise = new Promise((res, rej) => {
      server = http.createServer(function (req, res) {
        try {
          getSchema(req.url, res, {
            schemaLocation,
            githubToken
          });
        } catch (err) {
          rej(err);
        }
      });
      server.listen(port);
      started(
        () =>
          new Promise(res => {
            promise.finally(res);
            server.close();
            setTimeout(res, 1000);
          })
      );
    });
  });
}

module.exports = {
  start
};
