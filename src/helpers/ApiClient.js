import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = ((path[0] !== '/') ? '/' + path : path);
  if (__SERVER__) {
    return config.apiHost + adjustedPath;
  }
  return ('/api' + adjustedPath);
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, headers, files, fields, token } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (headers) {
          request.set(headers);
        }

        if (token) {
          request.set('Authorization', `Basic ${token}`);
        }

        if (fields) {
          Object.entries(fields).forEach(([key, value]) => {
            request.field(key, value);
          });
        }

        if (files && files.length > 0) {
          files.forEach(file => request.attach(Object.entries(file)[0], Object.values(file)[0]));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
      });
    });
  }
  empty() {}
}
