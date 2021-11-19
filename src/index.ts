import './style.less';
import {HotelService} from "./hotelService";
import {Converter, Currency} from "./converter";
import {generateTable} from "./tableGenerator";
const hotelService = new HotelService(new Converter(26.5, 29.9));

class InputControls {
  public datePickerEl = document.getElementById('date-picker') as HTMLInputElement;
  public currencySelectEl = document.getElementById('currency-select') as HTMLSelectElement;

  constructor() {
    this.drawTable(this.datePickerEl.value, this.currencySelectEl.value.toUpperCase() as Currency);
    this.listenToChanges();
  }

  drawTable(date: string, currency: Currency): void {
    hotelService.getHotelPricingForSpecificConditions(date, currency).then(data => {
      console.log(data);
      generateTable(data);
    });
  }

  listenToChanges(): void {
    this.datePickerEl.addEventListener('change', () => {
      console.log(this.datePickerEl.value)
      this.drawTable(this.datePickerEl.value, this.currencySelectEl.value.toUpperCase() as Currency);
    });
    this.currencySelectEl.addEventListener('change', () => {
      console.log(this.currencySelectEl.value)
      this.drawTable(this.datePickerEl.value, this.currencySelectEl.value.toUpperCase() as Currency)
    })
  }
}

new InputControls()
