import Util from '../helpers/Util';

const defaultFn = (param) => param;

async function doFetch(type, model, { data = null, token = '', cbObj = {} }) {
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
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    Object.assign(opts, { body: JSON.stringify(data) });
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

export async function post(model, token, data, cbObj) {
  return doFetch('POST', model, { data, token, cbObj });
}
