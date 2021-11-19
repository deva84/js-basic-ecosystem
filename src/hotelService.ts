import * as randomHotelData from './data/random-hotel.json';
import * as midrangePalmsData from './data/midrange-palms.json';
import * as cheapBayData from './data/cheap-bay.json';
import {
  CheapBayData,
  getDataConverted,
  Hotel,
  HotelPricing, IRatesForHotel,
  MidrangePalmsData,
  RandomHotelData, RatesByClass
} from "./dataParcer";
import {Converter, Currency} from "./converter";


export class HotelService {
  readonly data1: RandomHotelData[] = randomHotelData;
  readonly data2: MidrangePalmsData = midrangePalmsData;
  readonly data3: CheapBayData = cheapBayData;

  constructor(private converter: Converter) {
  }

  async getAllDatesHotelPricing(): Promise<HotelPricing> {
    const response = await Promise.resolve(getDataConverted(this.data1, this.data2, this.data3))
      .then((result: HotelPricing) => result);

    return response;
  }

  async getHotelPricingForSpecificConditions(date: string, currencyForConversion: Currency): Promise<RatesByClass> {
    const allData = await this.getAllDatesHotelPricing();
    const dataObject = Object.keys(allData).includes(date) ? allData[date] : null;

    const hotels = ['Random Hotel', 'Mid-range Palms', 'Cheap Bay'] as Hotel[];
    if (dataObject) {
      const _dataObject = {...dataObject};
      Object.values(_dataObject).forEach(hotelClass => hotelClass.forEach(item => {
        item.price = this.converter.convert(Number(item.price), item.currency, currencyForConversion).toFixed(2);
        item.currency = currencyForConversion;
        if (hotelClass.length < 3) {
          const presentHotels = Object.values(hotelClass).map(item => item.name);
          const absentHotels = hotels.filter(title => !presentHotels.includes(title));
          absentHotels.forEach(name => hotelClass.push({name: name, currency: currencyForConversion, price: null}))
        }
      }));

      return _dataObject;

    } else {
      const hotelPrice: IRatesForHotel[] = [];
      hotels.forEach(title => {
        hotelPrice.push({name: title, currency: currencyForConversion, price: null});
      });

      return {economy: hotelPrice, premium: hotelPrice, standard: hotelPrice};
    }
  }
}
