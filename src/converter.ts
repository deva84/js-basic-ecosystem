export type Currency = 'EUR' | 'UAH' | 'USD';

type CurrencyPrices = {
  'EUR': number,
  'UAH': number,
  'USD': number
}

type CurrencyMap = {
  'EUR': CurrencyPrices,
  'UAH': CurrencyPrices,
  'USD': CurrencyPrices
}

interface ICurrencyConverter {
  convert(value: number, from: Currency, to: Currency): number;

  toEUR(value: number, currency: Currency): number;

  toUAH(value: number, currency: Currency): number;

  toUSD(value: number, currency: Currency): number;
}


export class Converter implements ICurrencyConverter {
  readonly usdToUah: number;
  readonly eurToUah: number;
  readonly cmap: CurrencyMap;

  constructor(usdToUah: number, eurToUah: number) {
    this.usdToUah = usdToUah;
    this.eurToUah = eurToUah;
    this.cmap = this.createCurrencyMap(this.usdToUah, this.eurToUah)
  }

  private createCurrencyMap(usdToUah: number, eurToUah: number): CurrencyMap {
    return {
      EUR: {EUR: 1, UAH: eurToUah, USD: eurToUah / usdToUah},
      UAH: {EUR: 1 / eurToUah, UAH: 1, USD: 1 / usdToUah},
      USD: {EUR: usdToUah / eurToUah, UAH: usdToUah, USD: 1}
    }
  }

  convert(value: number, from: Currency, to: Currency): number {
    return value * this.cmap[from][to];
  }

  toEUR(value: number, currency: Currency): number {
    return value * this.cmap[currency]['EUR'];
  }

  toUAH(value: number, currency: Currency): number {
    return value * this.cmap[currency]['UAH'];
  }

  toUSD(value: number, currency: Currency): number {
    return value * this.cmap[currency]['USD'];
  }
}
