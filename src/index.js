import './css/styles.css';
import { fetchCountries } from './functions/fetchCountries';
import { debounce } from 'lodash.debounce';
const _debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const inputHandler = event => {
  const { target } = event;
  const country = target.value.trim().toLowerCase();
  if (!country) {
    return;
  }
  fetchCountries(country);
};

const debouncedHandle = _debounce(inputHandler, DEBOUNCE_DELAY);
inputRef.addEventListener('input', debouncedHandle);
