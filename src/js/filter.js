import noUiSlider from 'nouislider';
import Choices from 'choices.js';
import {
  scrollHeightAnim
} from './scrollHeightAnim.js';

import PerfectScrollbar from 'perfect-scrollbar';

const priceSlider = document.querySelector('.js-ui-slider-price');
const sizeSlider = document.querySelector('.js-ui-slider-size');
const priceFields = document.querySelectorAll('.js-slider-price-value');
const sizeFields = document.querySelectorAll('.js-slider-size-value');
const sliderMin = document.querySelector('.js-ui-slider-min');
const sliderMax = document.querySelector('.js-ui-slider-max');

// инициализация селекта

if (document.querySelector('#js-filter-select')) {

  const choicesFilterName = new Choices('#js-filter-select', {
    searchEnabled: true,
    itemSelectText: '',
    removeItemButton: true,
    position: 'bottom'
  });

  if (priceSlider) {
    document.addEventListener("DOMContentLoaded", () => {

      // инициализация range price slider

      const minPriceSliderValue = Number(priceSlider.getAttribute('data-min'));
      const maxPriceSliderValue = Number(priceSlider.getAttribute('data-max'));

      noUiSlider.create(priceSlider, {
        start: [minPriceSliderValue, maxPriceSliderValue],
        connect: true,
        range: {
          'min': minPriceSliderValue,
          'max': maxPriceSliderValue
        }
      });

      // кастомные значения для pips из атрибутов

      const sizeSteps = sizeSlider.getAttribute('data-steps');

      const setCustomPips = (attr) => {
        const sizeStepsArr = attr.split(', ');
        const sizeLength = sizeStepsArr.length - 1;

        let stepsKeys = [];
        let customPips = {};

        for (let i = 0; i < sizeLength + 1; i++) {
          stepsKeys.push(i);
          customPips[stepsKeys[i]] = sizeStepsArr[i]
        }

        return [customPips, sizeLength]
      }

      const customPipsValues = setCustomPips(sizeSteps)

      // инициализация range size slider

      noUiSlider.create(sizeSlider, {
        start: [0, customPipsValues[1]],
        connect: true,
        step: 1,
        range: {
          'min': 0,
          'max': customPipsValues[1]
        },
        behaviour: 'hover',
        pips: {
          mode: 'steps',
          format: {
            to: function (a) {
              return customPipsValues[0][a];
            }
          },
        }
      });


      //синхронизация ui-slider-price и инпутов

      const setValuesSlider = (slider, inputs) => {
        slider.noUiSlider.on('update', () => {
          let sliderValues = slider.noUiSlider.get();
          for (let i = 0; i < sliderValues.length; i++) {
            inputs[i].value = Math.round(sliderValues[i]);
          }
        });
      }

      for (let i = 0; i < priceFields.length; i++) {
        priceFields[i].addEventListener('change', () => {
          priceSlider.noUiSlider.set([priceFields[0].value, priceFields[1].value])
        })
      }

      setValuesSlider(priceSlider, priceFields)
      setValuesSlider(sizeSlider, sizeFields)

      // установка мин и макс значений у ui-slider-price

      sliderMin.innerHTML = priceSlider.getAttribute('data-min');

      // autocomplete

      const autocomplete = () => {

        document.querySelector('#js-filter-select').addEventListener('change', () => {
          const values = choicesFilterName.getValue(true);
          const autocomplete = document.querySelector('.js-autocomplete')
          const autocomleteItem = document.createElement('span');
          autocomleteItem.classList.add("js-autocomplete-item");
          if (showFilters.classList.contains('is-open')) {
            showFilters.style.maxHeight = showFilters.scrollHeight + 100 + 'px';
          } else {
            elem.style.maxHeight = 0;
          }
          //scrollHeightAnim(showFilters) // обновление max-height при добавлении стикеров с именами

          for (let i = 0; i < values.length; i++) {
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

      autocomplete();

      // очистка фильтра
      const filterResetBtn = document.querySelector('.js-filter-reset')
      filterResetBtn.addEventListener('click', () => {

        priceSlider.noUiSlider.set([minPriceSliderValue, maxPriceSliderValue]);
        sizeSlider.noUiSlider.set([0, customPipsValues[1]]);

        const checkboxArr = document.querySelectorAll('.filter__checkbox-input');
        for (let item of checkboxArr) {
          item.checked = false;
          choicesFilterName.removeActiveItems();

          const newItems = document.querySelectorAll('.js-autocomplete-item');
          for (let item of newItems) {
            item.remove();
          }

          const styleTags = document.querySelectorAll('.js-filter-style-input');
          for (let item of styleTags) {
            item.checked = false;
          }
        }
      })

      // показ и скрытие фильтра

      const showFilterBtn = document.querySelector('.js-filter-show-btn')
      const showFilters = document.querySelector('.js-show-filters')
      const accordionHeaders = document.querySelectorAll('.js-accordion-header');

      showFilterBtn.addEventListener('click', () => {
        showFilterBtn.classList.toggle('is-active');
        showFilters.classList.toggle('is-open');
        scrollHeightAnim(showFilters);

        if (document.body.clientWidth < 768) {
          for (let item of accordionHeaders) { //скрытые подфильтра
            item.classList.remove('is-open');
            item.nextElementSibling.classList.remove('is-open');
            scrollHeightAnim(item.nextElementSibling);
          }
        }
      })
      
      // скрытие фильтра в мобильной версии

      const filterHeader = document.querySelector('.js-filter-header');
      const filterMain = document.querySelector('.js-filter-main');
      const filterMore = document.querySelector('.js-filter-more');
      filterHeader.addEventListener('click', () => {
        filterHeader.classList.toggle('is-open');
        filterMain.classList.toggle('is-open');
        filterMore.classList.toggle('is-open');

        showFilters.classList.remove('is-open'); //скрытые подфильтра
        showFilters.style.maxHeight = '0px'; //скрытые подфильтра
        showFilterBtn.classList.remove('is-active'); //скрытые подфильтра

        scrollHeightAnim(filterMain)
        if (document.body.clientWidth < 768) {
          for (let item of accordionHeaders) { //скрытые подфильтра
            item.classList.remove('is-open');
            item.nextElementSibling.classList.remove('is-open');
            setTimeout(scrollHeightAnim(item.nextElementSibling), 1000)
          }
        }
      });

      // Аккордион в мобильной версии

      for (let item of accordionHeaders) {
        item.addEventListener('click', () => {
          item.classList.toggle('is-open');
          item.nextElementSibling.classList.toggle('is-open');
          scrollHeightAnim(item.nextElementSibling);
          //scrollHeightAnim(showFilters);
          scrollHeightAnim(filterMain);
          if (showFilters.classList.contains('is-open')) {
            showFilters.style.maxHeight = showFilters.scrollHeight + 100 + 'px';
          } else {
            elem.style.maxHeight = 0;
          }
        });
      }

      // custom scrollbar


        const selectScrollBar = document.querySelector('.choices__list--dropdown');
        const selectscrollList = selectScrollBar.querySelector('.choices__list');
        const railY = document.querySelector('.ps__rail-y');
        if(selectScrollBar) {
          const mySelectScrollBar = new PerfectScrollbar(selectScrollBar, {
            wheelSpeed: 1, 
            wheelPropagation: false, 
            scrollYMarginOffset: 40
          })



          document.querySelector('#js-filter-select').addEventListener('change',
          function() {mySelectScrollBar.update();
            if (document.body.clientWidth < 768) {
              for (let item of accordionHeaders) { //скрытые подфильтра
                scrollHeightAnim(item.nextElementSibling);
              }
            }
            if (selectscrollList.scrollHeight < selectScrollBar.scrollHeight) {
              console.log(selectscrollList.scrollHeight)
              selectScrollBar.classList.add('is-hidden');
            } else {
              selectScrollBar.classList.remove('is-hidden');
            }
          });

          document.querySelector('#js-filter-select').addEventListener('choice',
          function() {mySelectScrollBar.update();});

          document.querySelector('#js-filter-select').addEventListener('search',
          function() {mySelectScrollBar.update();});
        }
    });
  }

}