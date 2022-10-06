import { onError } from './promiseHandling';
import { onSuccess } from './promiseHandling';

export function fetchCountries(name) {
  const ulr = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`;
  fetch(ulr)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(onSuccess)
    .catch(onError);
}
