const defaultFn = (param) => param;

const getToken = () => {
  const { token_location: tokenLocation } = window.localStorage;
  const store = window[tokenLocation];

  if (!store) {
    return '';
  }

  return store.getItem('token');
};

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
      Authorization: token || getToken(),
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
