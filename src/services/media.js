import { post as _post } from './api';

export function uploadFile(data, token) {
  return _post('media', token, data, true);
}
