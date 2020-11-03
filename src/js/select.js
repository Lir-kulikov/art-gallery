import Choices from 'choices.js';

if (document.querySelector('#choices-sort')) {
  const choicesSort = new Choices('#choices-sort', {
    searchEnabled: false,
    itemSelectText: ''
  });
}

export const select = () => {

  // autocomplete

  document.querySelector('#js-filter-select').addEventListener('change', () => {
    const values = choicesFilterName.getValue(true);
    const autocomplete = document.querySelector('.js-autocomplete')
    const autocomleteItem = document.createElement('span');
    autocomleteItem.classList.add("js-autocomplete-item");

    for (let i = 0; i < values.length; i++) {
      console.log(autocomplete)
      autocomleteItem.innerHTML = values[i]
      autocomplete.append(autocomleteItem)
    }


    const newItems = document.querySelectorAll('.js-autocomplete-item')
    for (let item of newItems) {
      item.addEventListener('click', () => {
        let itemValue = item.innerHTML;
        choicesFilterName.removeActiveItemsByValue(itemValue);
        item.remove();
      })
    }
  })
}