import noUiSlider from 'nouislider';
import Choices from 'choices.js';

const priceSlider = document.querySelector('.js-ui-slider-price');
const sizeSlider = document.querySelector('.js-ui-slider-size');
const inputNumber = document.querySelectorAll('.js-ui-slider-field');
const sliderMin = document.querySelector('.js-ui-slider-min');
const sliderMax = document.querySelector('.js-ui-slider-max');


if(document.querySelector('#js-filter-select')) {

  const choicesFilterName = new Choices('#js-filter-select', {
    searchEnabled: true,
    itemSelectText: '',
    removeItemButton: true,
    position: 'bottom'
  });

  const select = () => {

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
  
  select();

  if (priceSlider) {
    document.addEventListener("DOMContentLoaded", () => {
      
      noUiSlider.create(priceSlider, {
        start: [0, 99999],
        connect: true,
        range: {
            'min': Number(priceSlider.getAttribute('data-min')),
            'max': Number(priceSlider.getAttribute('data-max'))
        }
      });
    
      // кастомные значения для pips
    
      const pipFormats = {'0': 'S', '1': 'M', '2': 'L', '3': 'XL', '4': 'XXL'};
    
      noUiSlider.create(sizeSlider, {
        start: [0, 4],
        connect: true,
        step: 1,
        range: {
          'min': [0, 1],
          '25%': [1, 1],
          '50%': [2, 1],
          '75%': [3, 1],
          'max': [4, 1]
        },
        behaviour: 'hover',
        pips: {
          mode: 'range',
          format: {
            to: function (a) {
            return pipFormats [a];
            }
            },
          density: 25
      }
      });
      
      //синхронизация ui-slider-price и инпутов
    
      const setValuesSlider = (values, handler) => {
        priceSlider.noUiSlider.on('update', (values, handler) => {
      
          let priceSliderValues = priceSlider.noUiSlider.get();
      
          for(let i = 0; i < priceSliderValues.length; i++) {
            inputNumber[i].value = Math.round(priceSliderValues[i]);
          }
      
        });
      
        for(let i = 0; i < inputNumber.length; i++) {
          inputNumber[i].addEventListener('change', () => {
            priceSlider.noUiSlider.set([inputNumber[0].value, inputNumber[1].value])
          })
        }
      }
    
      // установка мин и макс значений у ui-slider-price
      
      setValuesSlider()
      sliderMin.innerHTML = priceSlider.getAttribute('data-min');
      //sliderMax.innerHTML = priceSlider.getAttribute('data-max');
    
      // синхронизаций pips с ui-slide-size (неккоректно работает из-за двух ползунков)
      // const pips = document.querySelectorAll('.noUi-value');
    
      // for (let i = 0; i < pips.length; i++) {
    
      //   pips[i].addEventListener('click', () => {
      //     let value = Number(pips[i].getAttribute('data-value'));
      //     console.log(value)
      //     sizeSlider.noUiSlider.set(value);
      //   });
      // }
  
  
      // показ и скрытие фильтра
  
      const showFilterBtn = document.querySelector('.js-filter-show-btn')
      const showFilters = document.querySelector('.js-show-filters')
      
      showFilterBtn.addEventListener('click', () => {
        showFilterBtn.classList.toggle('is-active')
        showFilters.classList.toggle('is-open')
      })
  
      // очистка фильтра
      const filterResetBtn = document.querySelector('.js-filter-reset')
      filterResetBtn.addEventListener('click', () => {
  
        priceSlider.noUiSlider.set([0, 99999]);
        sizeSlider.noUiSlider.set([0, 4]);
  
        const checkboxArr = document.querySelectorAll('.filter__checkbox-input');
        for (let item of checkboxArr) {
          item.checked=false;
          choicesFilterName.removeActiveItems();
  
          const newItems = document.querySelectorAll('.js-autocomplete-item');
          for (let item of newItems) {
            item.remove();
          }
  
          const styleTags = document.querySelectorAll('.js-filter-style-input');
          for (let item of styleTags) {
            item.checked=false;
          }
        }
      })
    });
  }

}


