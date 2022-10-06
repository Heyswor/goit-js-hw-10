import { Notify } from 'notiflix/build/notiflix-notify-aio';
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');
const inputRef = document.querySelector('#search-box');

const handleInput = event => {
  if (!event.target.value) {
    countryListRef.innerHTML = '';
    countryInfoRef.innerHTML = '';
    return;
  }
};
inputRef.addEventListener('input', handleInput);

export function onError(error) {
  Notify.failure('Oops, there is no country with that name');
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}

export function onSuccess(data) {
  const countryName = createCountryName(data);
  const countryAbout = createAboutCountry(data);
  if (data.length > 10) {
    countryListRef.innerHTML = '';
    countryInfoRef.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (data.length <= 10) {
    countryListRef.classList.remove('text-span');
    countryListRef.innerHTML = countryName;
    countryInfoRef.innerHTML = '';
  }
  if (data.length === 1) {
    countryListRef.classList.add('text-span');
    countryInfoRef.innerHTML = countryAbout;
  }
}

function createCountryName(countryNames) {
  return countryNames
    .map(({ name, flags }) => {
      return `<li> <img src="${flags.svg}" alt="${name.common}" width="30"> <p>${name.official}</p> </li>`;
    })
    .join('');
}

function createAboutCountry(countryNames) {
  return countryNames
    .map(({ capital, population, languages }) => {
      const lang = [];
      Object.values(languages).forEach(element => {
        lang.push(element);
      });
      const transformLang = lang.join(', ');
      return `<ul><li><span class="text-span">Capital:</span> ${capital[0]}</li> <li><span class="text-span">Population:</span> ${population}</li> <li><span class="text-span">Languages:</span> ${transformLang}</li></ul>`;
    })
    .join('');
}
