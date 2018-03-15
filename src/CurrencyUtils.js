import { curry, pipe, reverse, split, join, stringReverse, filter } from './utils';
import CurrencyFormats from './CurrencyFormats';

const _getCurrencyFormat = (currency = '') => ({
  ...(
    CurrencyFormats[currency.toLowerCase()] ||
    CurrencyFormats.default
  )
});

const _getDecimalPlacesFor = currency => _getCurrencyFormat(currency).decimals;
const _toFixed = (decimals, number) => number.toFixed(decimals);
const _currencyToFixed = curry((currency, value) => _toFixed(_getDecimalPlacesFor(currency), Number(value)));

const _currencyToFixedWithSymbol = curry((currency, amount) => {
  const {
    format,
    symbol,
    decimalSeparator,
    groupingSeparator
  } = _getCurrencyFormat(currency);

  const removeDecimal = pipe(split(''), filter(x => x !== decimalSeparator), reverse, join(''));

  const replaced = stringReverse(format).split('').reduce((acc, value) => {
    const {
      formattedValueWithSymbol,
      valueToInspect,
      formattedValueWithPlaceholderSymbol
    } = acc;
    const [ valueToConcat = '' ] = valueToInspect;

    const isNumberPosition = value === '#';
    const isSymbolPosition = value === '@';
    const isSeparator = [ groupingSeparator, decimalSeparator ].includes(value);

    const nextValue = (() => {
      if (isSeparator && valueToConcat) {
        return value;
      }

      if (isNumberPosition) {
        return valueToConcat;
      }

      if (isSymbolPosition) {
        return stringReverse(symbol);
      }

      return '';
    })();

    return {
      formattedValueWithSymbol: `${formattedValueWithSymbol}${nextValue}`,
      formattedValueWithPlaceholderSymbol: `${formattedValueWithPlaceholderSymbol}${
        isSymbolPosition
        ? '@'
        : nextValue
      }`,
      valueToInspect: (
        isNumberPosition
        ? valueToInspect.slice(1)
        : valueToInspect
      )
    };
  }, {
    formattedValueWithSymbol: '',
    formattedValueWithPlaceholderSymbol: '',
    valueToInspect: removeDecimal(_currencyToFixed(currency, amount))
  });

  return {
    formattedValueWithSymbol: stringReverse(replaced.formattedValueWithSymbol),
    formattedValueWithoutSymbol: stringReverse(replaced.formattedValueWithPlaceholderSymbol).replace('@', ''),
    formattedValueWithPlaceholderSymbol: stringReverse(replaced.formattedValueWithPlaceholderSymbol)
  };
});

const _formatWithSymbol = curry((currency, amount) => (
  _currencyToFixedWithSymbol(currency, amount)
    .formattedValueWithSymbol
));
const _formatWithPlaceholderSymbol = curry((currency, amount) => (
  _currencyToFixedWithSymbol(currency, amount)
    .formattedValueWithPlaceholderSymbol
));
const _formatWithoutSymbol = curry((currency, amount) => (
  _currencyToFixedWithSymbol(currency, amount)
    .formattedValueWithoutSymbol
));

const CurrencyUtils = {
  getDecimalPlacesFor: _getDecimalPlacesFor,
  getFormatFor: _getCurrencyFormat,
  toFixed: _currencyToFixed,
  formatWithSymbol: _formatWithSymbol,
  formatWithPlaceholderSymbol: _formatWithPlaceholderSymbol,
  formatWithoutSymbol: _formatWithoutSymbol,
};

const Currency = currency => ({
  getDecimalPlaces: () => _getDecimalPlacesFor(currency),
  getFormat: () => _getCurrencyFormat(currency),
  toFixed: _currencyToFixed(currency),
  formatWithSymbol: _formatWithSymbol(currency),
  formatWithPlaceholderSymbol: _formatWithPlaceholderSymbol(currency),
  formatWithoutSymbol: _formatWithoutSymbol(currency)
});

export { CurrencyUtils, Currency };
