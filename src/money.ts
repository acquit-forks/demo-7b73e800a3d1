export type Line = { amount: number };

/**
 * Minor-unit exponents from ISO 4217 ("Codes for the representation of
 * currencies and funds"), which defines for every currency the base-10
 * exponent e such that X units of the currency equal 10^e minor units
 * (e.g. USD: e=2 cents, KWD: e=3 fils, JPY: e=0).
 *
 * Every active ISO 4217 alphabetic currency/fund code is listed explicitly
 * below with its standard exponent. Only codes that are not defined by the
 * standard at all fall back to the most common exponent (2).
 */
const ISO_4217_MINOR_UNITS: Readonly<Record<string, number>> = {
  // Zero-decimal currencies (exponent 0)
  BIF: 0, CLP: 0, DJF: 0, GNF: 0, ISK: 0, JPY: 0, KMF: 0, KRW: 0,
  PYG: 0, RWF: 0, UGX: 0, UYI: 0, VND: 0, VUV: 0, XAF: 0, XOF: 0, XPF: 0,

  // Three-decimal currencies (exponent 3)
  BHD: 3, IQD: 3, JOD: 3, KWD: 3, LYD: 3, OMR: 3, TND: 3,

  // Four-decimal fund codes (exponent 4)
  CLF: 4, UYW: 4,

  // All remaining active ISO 4217 codes have exponent 2
  AED: 2, AFN: 2, ALL: 2, AMD: 2, ANG: 2, AOA: 2, ARS: 2, AUD: 2,
  AWG: 2, AZN: 2, BAM: 2, BBD: 2, BDT: 2, BGN: 2, BMD: 2, BND: 2,
  BOB: 2, BOV: 2, BRL: 2, BSD: 2, BTN: 2, BWP: 2, BYN: 2, BZD: 2,
  CAD: 2, CDF: 2, CHE: 2, CHF: 2, CHW: 2, CNY: 2, COP: 2, COU: 2,
  CRC: 2, CUP: 2, CVE: 2, CZK: 2, DKK: 2, DOP: 2, DZD: 2, EGP: 2,
  ERN: 2, ETB: 2, EUR: 2, FJD: 2, FKP: 2, GBP: 2, GEL: 2, GHS: 2,
  GIP: 2, GMD: 2, GTQ: 2, GYD: 2, HKD: 2, HNL: 2, HTG: 2, HUF: 2,
  IDR: 2, ILS: 2, INR: 2, IRR: 2, JMD: 2, KES: 2, KGS: 2, KHR: 2,
  KPW: 2, KYD: 2, KZT: 2, LAK: 2, LBP: 2, LKR: 2, LRD: 2, LSL: 2,
  MAD: 2, MDL: 2, MGA: 2, MKD: 2, MMK: 2, MNT: 2, MOP: 2, MRU: 2,
  MUR: 2, MVR: 2, MWK: 2, MXN: 2, MXV: 2, MYR: 2, MZN: 2, NAD: 2,
  NGN: 2, NIO: 2, NOK: 2, NPR: 2, NZD: 2, PAB: 2, PEN: 2, PGK: 2,
  PHP: 2, PKR: 2, PLN: 2, QAR: 2, RON: 2, RSD: 2, RUB: 2, SAR: 2,
  SBD: 2, SCR: 2, SDG: 2, SEK: 2, SGD: 2, SHP: 2, SLE: 2, SOS: 2,
  SRD: 2, SSP: 2, STN: 2, SVC: 2, SYP: 2, SZL: 2, THB: 2, TJS: 2,
  TMT: 2, TOP: 2, TRY: 2, TTD: 2, TWD: 2, TZS: 2, UAH: 2, USD: 2,
  USN: 2, UYU: 2, UZS: 2, VES: 2, WST: 2, XCD: 2, XCG: 2, YER: 2,
  ZAR: 2, ZMW: 2, ZWG: 2, ZWL: 2,
};

/** Most common ISO 4217 exponent, used only for codes outside the standard. */
const DEFAULT_MINOR_UNIT = 2;

export function getMinorUnit(currency: string): number {
  return ISO_4217_MINOR_UNITS[currency.toUpperCase()] ?? DEFAULT_MINOR_UNIT;
}

export function formatTotal(lines: Line[], currency: string): string {
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  return sum.toFixed(getMinorUnit(currency));
}
