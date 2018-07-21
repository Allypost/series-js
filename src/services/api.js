import Util from '../helpers/Util';

const defaultFn = (param) => param;

function doFetch(type, model, { data = null, token = '', cbObj = {} }) {
  const {
    success = defaultFn,
    error = defaultFn,
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
    .then((res) => res.data)
    .then((data) => success(data))
    .catch((err) => error(err))
    .finally(() => always());
}

export function get(model, cbObj) {
  return doFetch('GET', model, { cbObj });
}

export function post(model, token, data, cbObj) {
  return doFetch('POST', model, { data, token, cbObj });
}
