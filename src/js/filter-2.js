import noUiSlider from 'nouislider';
import Choices from 'choices.js';
import {scrollHeightAnim} from './scrollHeightAnim.js';
import {setHeight} from './scrollHeightAnim.js';

const priceSlider = document.querySelector('.js-ui-slider-price');
const sizeSlider = document.querySelector('.js-ui-slider-size');
const priceFields = document.querySelectorAll('.js-slider-price-value');
const sizeFields = document.querySelectorAll('.js-slider-size-value');
const sliderMin = document.querySelector('.js-ui-slider-min');
const sliderMax = document.querySelector('.js-ui-slider-max');

// инициализация селекта

if(document.querySelector('#js-filter-select')) {

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

        for(let i = 0; i < sizeLength + 1; i++) {
          stepsKeys.push(i);
          customPips[stepsKeys[i]] = sizeStepsArr[i]
        }

        return [customPips,sizeLength]
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
            return customPipsValues[0] [a];
            }
            },
      }
      });

      
      //синхронизация ui-slider-price и инпутов
      
      const setValuesSlider = (slider, inputs) => {
        slider.noUiSlider.on('update', () => {
          let sliderValues = slider.noUiSlider.get();
          for(let i = 0; i < sliderValues.length; i++) {
            inputs[i].value = Math.round(sliderValues[i]);
          }
        });
      }

      for(let i = 0; i < priceFields.length; i++) {
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

      // показ / скрытие меню

  
      const showFilterBtn = document.querySelector('.js-filter-show-btn')
      const showFilters = document.querySelector('.js-show-filters')
      const accordionHeaders = document.querySelectorAll('.js-accordion-header');
      const filterHeader = document.querySelector('.js-filter-header');
      const filterMain = document.querySelector('.js-filter-main');
      const filterMore = document.querySelector('.js-filter-more');

      // Аккордион в мобильной версии

        const setHeightArr = () => {
          for (let header of accordionHeaders) {
            header.nextElementSibling.style.height = "0px";

            header.addEventListener("click", () => {
              if (header.nextElementSibling.style.height === "0px") {
                header.nextElementSibling.style.height = `${ header.nextElementSibling.scrollHeight }px`
              } else {
                header.nextElementSibling.style.height = `${ header.nextElementSibling.scrollHeight }px`;
                  window.getComputedStyle(header.nextElementSibling, null).getPropertyValue("height");
                  header.nextElementSibling.style.height = "0";
                  header.nextElementSibling.style.overflow = "hidden"
                  header.nextElementSibling.children[0].style.overflow = "hidden"
              }
          
              header.nextElementSibling.addEventListener("transitionend", () => {
                if (header.nextElementSibling.style.height !== "0px") {
                    header.nextElementSibling.style.height = "auto"
                    header.nextElementSibling.style.overflow = "visible"
                    header.nextElementSibling.children[0].style.overflow = "visible"
                }
            });
          });
          }
        }
        
        
      const mobileMenu = () => {
        if (document.body.clientWidth < 768) {
          setHeightArr();
          showFilterBtn.addEventListener('click', () => {
            for (let item of accordionHeaders) {
              item.nextElementSibling.style.height = "0px";
              item.nextElementSibling.style.overflow = "hidden";
              item.nextElementSibling.children[0].style.overflow = "hidden";
            }
          });
      
          filterHeader.addEventListener('click', () => {
            showFilters.style.height = "0px";
            filterMore.style.height = "0px";
            showFilterBtn.style.height = "0px";
            for (let item of accordionHeaders) {
              item.nextElementSibling.style.height = "0px";
              item.nextElementSibling.style.overflow = "hidden";
              item.nextElementSibling.children[0].style.overflow = "hidden";
            }
          });
      
          setHeight(filterHeader, filterMain);
          setHeight(filterHeader, filterMore);
          setHeight(filterHeader, showFilterBtn);
          setHeight(showFilterBtn, showFilters);
        }
      }

      window.addEventListener('resize', mobileMenu);

      showFilterBtn.addEventListener('click', () => {
        showFilterBtn.classList.toggle('is-open');
        showFilters.classList.toggle('is-open');
      });
    });
  }

}


