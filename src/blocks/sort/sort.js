import Choices from 'choices.js';

if (document.querySelector('#choices-sort')) {
  const choicesSort = new Choices('#choices-sort', {
    searchEnabled: false,
    itemSelectText: ''
  });
}