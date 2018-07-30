import Util from '../helpers/Util';

const defaultFn = (param) => param;

async function doFetch(type, model, {
  data = null, rawData = false, token = '', cbObj = {},
}) {
  const {
    success = defaultFn,
    error = () => { },
    always = defaultFn,
  } = cbObj;

  const opts = {
    method: type,
    headers: {
      Accept: 'application/json',
      Authorization: token || Util.getUserToken(),
    },
  };

  if (!rawData) {
    opts.headers['Content-Type'] = 'application/json';
  }

  if (data) {
    if (rawData) {
      Object.assign(opts, { body: data });
    } else {
      Object.assign(opts, { body: JSON.stringify(data) });
    }
  }

  return fetch(`https://api.infinum.academy/api/${model}`, opts)
    .then((res) => res.json())
    .catch(() => ({}))
    .then((res) => res.data || res.errors || res)
    .then((data) => success(data))
    .catch((err) => {
      const resolved = error(err);
      if (!resolved) {
        throw new Error(err);
      }
    })
    .finally(() => always());
}

export async function get(model, cbObj) {
  return doFetch('GET', model, { cbObj });
}

export async function post(model, token, data, rawData = false) {
  return doFetch('POST', model, { data, rawData, token });
}

export async function del(model, token, cbObj) {
  return doFetch('DELETE', model, { token, cbObj });
}
