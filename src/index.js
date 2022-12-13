import './css/styles.css';
import fetchCountries from './templates/fetch-api.js';
import getRefs from './templates/getRefs.js';
import { renderList, renderCard } from './templates/render';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', debounce(getFromInput, DEBOUNCE_DELAY));

function clearInput() {
  refs.info.innerHTML = '';
  refs.list.innerHTML = '';
}

function getFromInput(event) {
  clearInput();
  const textInput = event.target.value.trim();
  if (!textInput) {
    return;
  }
  fetchCountries(textInput).then(onSuccesInput).catch(onErrorInput);
}

function onSuccesInput(responseData) {
  if (responseData.length > 10) {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (responseData.length >= 2 && responseData.length >= 10) {
    return listMarkup(responseData);
  } else if (responseData.length === 1) {
    return cardMarkup(responseData);
  }
}
function onErrorInput() {
  Notiflix.Notify.info('Oops, there is no country with that name');
}

function addEmptyList(arr, markup) {
  clearInput();
  arr.insertAdjacentHTML('beforeend', markup);
}
function listMarkup(responseData) {
  addEmptyList(refs.list, renderList(responseData));
}
function cardMarkup(responseData) {
  addEmptyList(refs.info, renderCard(responseData));
}
