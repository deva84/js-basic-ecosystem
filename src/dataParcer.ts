import {Currency} from "./converter";

export type Hotel = 'Random Hotel' | 'Mid-range Palms' | 'Cheap Bay';

export interface IRatesForHotel {
  name: Hotel;
  price: number | string | null;
  currency: Currency;
}

export type RatesByClass = {
  economy?: IRatesForHotel[],
  standard?: IRatesForHotel[],
  premium?: IRatesForHotel[],
}

export type HotelPricing = {
  [date: string]: RatesByClass
}

interface IRandomHotelItem {
  value: number;
  currency: string;
}

interface IMidrangePalmsItem {
  date: string;
  price: number;
  currency: string;
}

type CheapBayItem = {
  [key: string]: string;
};

type HotelClass = 'economy' | 'standard' | 'luxury';

export type RandomHotelData = {
  date: string;
  prices: {
    [key in HotelClass]: IRandomHotelItem
  }
}

export type MidrangePalmsData = {
  [key in HotelClass]: IMidrangePalmsItem[]
};

export type CheapBayData = Record<any, CheapBayItem>

export function getDataConverted(
  randomHotelData: RandomHotelData[],
  midrangePalmsData: MidrangePalmsData,
  cheapBayData: CheapBayData
): HotelPricing {

  let mergedData: HotelPricing = {};
  const convertedRandomHotelData = convertRandomHotelData(randomHotelData);
  const convertedMidrangePalmsData = convertMidrangePalmsData(midrangePalmsData);
  const convertedCheapBayData = convertCheapBayData(cheapBayData);
  const convertedData = [
    convertedRandomHotelData,
    convertedMidrangePalmsData,
    convertedCheapBayData
  ];

  convertedData.forEach(dataObject => {
    Object.keys(dataObject).forEach(date => {
      if (!mergedData.hasOwnProperty(date)) {
        mergedData[date] = dataObject[date];
      } else {
        Object.keys(mergedData[date]).forEach((hotelClass: keyof RatesByClass) => {
          if (dataObject[date][hotelClass]) {
            mergedData[date][hotelClass].push(dataObject[date][hotelClass][0])
          }
        });
      }
    });
  });

  return mergedData;
}

function convertRandomHotelData(data: RandomHotelData[]): HotelPricing {
  const name: Hotel = 'Random Hotel';
  let convertedData: HotelPricing = {};
  data.forEach(dataObject => {
    let ratesByClass: RatesByClass = {};
    Object.keys(dataObject.prices).forEach((hotelClass: HotelClass) => {
      let className = hotelClass === 'luxury' ? ('premium' as keyof RatesByClass) : hotelClass;
      ratesByClass[className] = [];
      ratesByClass[className].push({
        name: name,
        currency: dataObject.prices[hotelClass].currency as Currency,
        price: dataObject.prices[hotelClass].value
      });

    });
    convertedData[dataObject.date] = ratesByClass;
  });

  return convertedData;
}

function convertMidrangePalmsData(data: MidrangePalmsData): HotelPricing {
  const name: Hotel = 'Mid-range Palms';
  let convertedData: HotelPricing = {};
  let dates: string[] = [];
  Object.keys(data).forEach((hotelClass: HotelClass) => {
    data[hotelClass].forEach(item => {
      if (!dates.includes(item.date)) {
        dates.push(item.date);
      }
    });
  });

  dates.forEach(date => {
    let ratesByClass: RatesByClass = {};
    Object.keys(data).forEach((hotelClass: HotelClass) => {
      if (data[hotelClass].some(item => item.date === date)) {
        let foundItem = data[hotelClass].find(item => item.date === date);
        let className = hotelClass === 'luxury' ? ('premium' as keyof RatesByClass) : hotelClass;
        ratesByClass[className] = [];
        ratesByClass[className].push({
          name: name,
          currency: foundItem.currency as Currency,
          price: foundItem.price
        });
      }
    });
    convertedData[date] = ratesByClass;
  });

  return convertedData;
}

function convertCheapBayData(data: CheapBayData): HotelPricing {
  const name: Hotel = 'Cheap Bay';
  let convertedData: HotelPricing = {};

  Object.keys(data).forEach(date => {
    let dateArray = date.split('/');
    let formattedDate = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
    let ratesByClass: RatesByClass = {};

    Object.keys(data[date]).forEach((hotelClass: HotelClass) => {
      ratesByClass[hotelClass as keyof RatesByClass] = [];
      ratesByClass[hotelClass as keyof RatesByClass].push({
        name: name,
        currency: data[date][hotelClass].substring(data[date][hotelClass].length - 3) as Currency,
        price: parseFloat(data[date][hotelClass])
      });
    });
    convertedData[formattedDate] = ratesByClass;
  });

  return convertedData;
}
