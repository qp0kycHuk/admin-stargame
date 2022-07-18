import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
import localeRu from 'air-datepicker/locale/ru';
import { isTouchDevice } from './functions/isTouchDevice';



const init = (root, options = {}) => {
  window.AirDatepicker = AirDatepicker;

  const pickers = Array.from(root.querySelectorAll('[data-datepicker]'))
  const minStart = new Date()
  const minEnd = new Date()
  minEnd.setDate(minEnd.getDate() + 2)

  const pickerOptions = {
    locale: localeRu,
    minDate: minStart,
    dateFormat: 'dd MMMM yyyy',
    isMobile: isTouchDevice(),
    autoClose: true,
    ...options
  }

  window.airDatePickerOptions = {
    locale: localeRu
  }

  pickers.forEach(picker => {
    new AirDatepicker(picker, {
      ...pickerOptions,
      position: picker.getAttribute('data-position') || 'bottom center',
    })

  });

  const covers = Array.from(root.querySelectorAll('[data-datepicker-cover]'))
  covers.forEach((cover) => {
    const minEl = cover.querySelector('[data-datepicker-min]')
    const maxEl = cover.querySelector('[data-datepicker-max]')
    let dpMin, dpMax;


    dpMin = new AirDatepicker(minEl, {
      ...pickerOptions,
      position: minEl.getAttribute('data-position') || 'bottom center',
      onSelect({ date }) {
        if (date) {
          const minDate = date
          minDate.setDate(minDate.getDate() + 2)
          dpMax.update({ minDate })
        } else {
          dpMax.update({ minDate: minEnd })

        }

      }
    })

    dpMax = new AirDatepicker(maxEl, {
      ...pickerOptions,
      position: maxEl.getAttribute('data-position') || 'bottom center',
      minDate: minEnd,
      onSelect({ date }) {
        if (date) {
          const maxDate = date
          maxDate.setDate(maxDate.getDate() - 2)
          dpMin.update({ maxDate })
        } else {
          dpMin.update({ maxDate: false })
        }
      }
    })
  })

}

export default { init }