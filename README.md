
# TechnicalIndicators

A javascript technical indicators library written in TypeScript.


## What's New

- **Supertrend Indicator**: New trend-following indicator added
- **Modern Build System**: Upgraded to TypeScript 5.6, Node.js 22 compatible
- **Simplified Build**: Removed Rollup and Babel, using TypeScript directly
- **Server-Side Focus**: Optimized for Node.js server-side usage

# Installation

## Node.js

**Requires Node.js 18+ (tested with Node.js 22)**

``` bash
npm install @wahack/technicalindicators
```

``` javascript
const { SMA, supertrend } = require('@wahack/technicalindicators');
// or
const SMA = require('@wahack/technicalindicators').SMA;
```

## TypeScript Support

Full TypeScript definitions are included:

``` typescript
import { SMA, Supertrend, SupertrendInput, SupertrendOutput } from '@wahack/technicalindicators';

const result = supertrend({
  high: [100, 102, 101, 103],
  low: [99, 101, 100, 102],
  close: [101, 101.5, 102, 102.5],
  period: 10,
  multiplier: 3
});
```

# Playground

[Playground with code completion](http://anandanand84.github.io/technicalindicators/ "Playground")

# Available Indicators

1. [Accumulation Distribution Line (ADL)](https://tonicdev.com/anandaravindan/adl "ADL").
1. [Average Directional Index (ADX)](https://github.com/anandanand84/technicalindicators/blob/master/test/directionalmovement/ADX.js "ADX").
1. [Average True Range (ATR)](https://tonicdev.com/anandaravindan/atr "ATR").
1. [Awesome Oscillator (AO)](https://github.com/anandanand84/technicalindicators/blob/master/test/oscillators/AwesomeOscillator.js "AO").
1. [Bollinger Bands (BB)](https://tonicdev.com/anandaravindan/bb "BB").
1. [Commodity Channel Index (CCI)](https://github.com/anandanand84/technicalindicators/blob/master/test/oscillators/CCI.js "CCI").
1. [Force Index (FI)](https://github.com/anandanand84/technicalindicators/blob/master/test/volume/ForceIndex.js "FI").
1. [Know Sure Thing (KST)](https://tonicdev.com/anandaravindan/kst "KST").
1. [Moneyflow Index (MFI)](https://github.com/anandanand84/technicalindicators/blob/master/test/volume/MFI.js "MFI").
1. [Moving Average Convergence Divergence (MACD)](https://tonicdev.com/anandaravindan/macd "MACD").
1. [On Balance Volume (OBV)](https://tonicdev.com/anandaravindan/obv "OBV").
1. [Parabolic Stop and Reverse (PSAR)](https://github.com/anandanand84/technicalindicators/blob/master/test/momentum/PSAR.js "PSAR").
1. [Rate of Change (ROC)](https://tonicdev.com/anandaravindan/roc "ROC").
1. [Relative Strength Index (RSI)](https://tonicdev.com/anandaravindan/rsi "RSI").
1. [Simple Moving Average (SMA)](https://tonicdev.com/anandaravindan/sma "SMA").
1. [Stochastic Oscillator (KD)](https://tonicdev.com/anandaravindan/stochastic "KD").
1. [Stochastic RSI (StochRSI)](https://tonicdev.com/anandaravindan/stochasticrsi "StochRSI").
1. [Triple Exponentially Smoothed Average (TRIX)](https://tonicdev.com/anandaravindan/trix "TRIX").
1. [Typical Price](https://github.com/anandanand84/technicalindicators/blob/master/test/chart_types/TypicalPrice.js "Typical Price").
1. [Volume Weighted Average Price (VWAP)](https://github.com/anandanand84/technicalindicators/blob/master/test/volume/VWAP.js "VWAP").
1. [Volume Profile (VP)](https://github.com/anandanand84/technicalindicators/blob/master/test/volume/VolumeProfile.js "VP").
1. [Exponential Moving Average (EMA)](https://tonicdev.com/anandaravindan/ema "EMA").
1. [Weighted Moving Average (WMA)](https://tonicdev.com/anandaravindan/wma "WMA").
1. [Wilder’s Smoothing (Smoothed Moving Average, WEMA)](https://tonicdev.com/anandaravindan/wema "WEMA").
1. [WilliamsR (W%R)](https://tonicdev.com/anandaravindan/williamsr "W%R").
1. [Ichimoku Cloud](https://github.com/anandanand84/technicalindicators/blob/master/test/ichimoku/IchimokuCloud.js "Ichimoku Cloud").
1. [Keltner Channels](https://github.com/anandanand84/technicalindicators/blob/master/test/volatility/KeltnerChannels.js "Keltner Channels").
1. [Chandelier Exit](https://github.com/anandanand84/technicalindicators/blob/master/test/volatility/ChandelierExit.js "Chandelier Exit").
1. [Supertrend](https://github.com/wahack/technicalindicators/blob/master/src/volatility/Supertrend.ts "Supertrend") - A trend-following indicator that uses ATR to determine trend direction.

# Other Utils

1. [Average Gain](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/AverageGain.js "")
1. [Average Loss](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/AverageLoss.js "")
1. [Cross Up](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/CrossUp.js "")
1. [Cross Down](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/CrossDown.js "")
1. [Cross Over](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/CrossOver.js "")
1. [Highest](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/Highest.js "")
1. [Lowest](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/Lowest.js "")
1. [Standard Deviation](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/SD.js "")
1. [Sum](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/Sum.js "")


# Chart Types

1. [Renko (renko)](https://github.com/anandanand84/technicalindicators/blob/master/test/chart_types/Renko.js)
1. [Heikin-Ashi (HA)](https://github.com/anandanand84/technicalindicators/blob/master/test/chart_types/HeikinAshi.js)


# CandleStick Pattern

1. [Abandoned Baby弃婴形态](https://runkit.com/anandaravindan/abandoned-baby).
2. [Bearish Engulfing Pattern 看跌吞没](https://runkit.com/aarthiaradhana/bearishengulfingpattern).
3. [Bullish Engulfiing Pattern 看涨吞没](https://runkit.com/aarthiaradhana/bullishengulfingpattern).
4. [Dark Cloud Cover 乌云盖顶](https://runkit.com/aarthiaradhana/darkcloudcover).
5. [Downside Tasuki Gap 下行田村缺口](https://runkit.com/aarthiaradhana/downsidetasukigap).
6. [Doji 十字星](https://runkit.com/aarthiaradhana/doji).
7. [DragonFly Doji 蜻蜓十字星](https://runkit.com/aarthiaradhana/dragonflydoji).
8. [GraveStone Doji 墓碑十字星](https://runkit.com/aarthiaradhana/gravestonedoji).
9. [BullishHarami 看涨孕线](https://runkit.com/aarthiaradhana/bullishharami).
10. [Bearish Harami Cross 看跌孕线十字](https://runkit.com/aarthiaradhana/bearishharamicross).
11. [Bullish Harami Cross 看涨孕线十字](https://runkit.com/aarthiaradhana/bullishharamicross).
12. [Bullish Marubozu 看涨实心](https://runkit.com/aarthiaradhana/bullishmarubozu).
13. [Bearish Marubozu 看跌实心](https://runkit.com/aarthiaradhana/bearishmarubozu).
14. [Evening Doji Star 黄昏十字星](https://runkit.com/aarthiaradhana/eveningdojistar).
15. [Evening Star 黄昏星](https://runkit.com/aarthiaradhana/eveningstar).
16. [Bearish Harami 看跌孕线](https://runkit.com/aarthiaradhana/bearishharami).
17. [Piercing Line 刺透线](https://runkit.com/aarthiaradhana/piercingline).
18. [Bullish Spinning Top 看涨纺锤头](https://runkit.com/aarthiaradhana/bullishspinningtop).
19. [Bearish Spinning Top 看跌纺锤头](https://runkit.com/aarthiaradhana/bearishspinningtop).
20. [Morning Doji Star 早晨十字星](https://runkit.com/aarthiaradhana/morningdojistar).
21. [Morning Star 早晨之星](https://runkit.com/aarthiaradhana/morningstar).
22. [Three Black Crows 三只乌鸦](https://runkit.com/aarthiaradhana/threeblackcrows).
23. [Three White Soldiers 三只白兵](https://runkit.com/aarthiaradhana/threewhitesoldiers).
24. [Bullish Hammer 看涨锤子线](https://runkit.com/nerdacus/technicalindicator-bullishhammer).
25. [Bearish Hammer 看跌锤子线](https://runkit.com/nerdacus/technicalindicator-bearishhammer).
26. [Bullish Inverted Hammer 看涨倒锤子线](https://runkit.com/nerdacus/technicalindicator-bullishinvertedhammer).
27. [Bearish Inverted Hammer 看跌倒锤子线](https://runkit.com/nerdacus/technicalindicator-bearishinvertedhammer).
28. [Hammer Pattern 锤子形态](https://runkit.com/nerdacus/technicalindicator-hammerpattern).
29. [Hammer Pattern (Unconfirmed) 锤子形态（未确认）](https://runkit.com/nerdacus/technicalindicator-hammerpatternunconfirmed).
30. [Hanging Man 上吊线](https://runkit.com/nerdacus/technicalindicator-hangingman).
31. [Hanging Man (Unconfirmed) 上吊线（未确认）](https://runkit.com/nerdacus/technicalindicator-hangingmanunconfirmed).
32. [Shooting Star 流星线](https://runkit.com/nerdacus/technicalindicator-shootingstar).
33. [Shooting Star (Unconfirmed) 流星线（未确认）](https://runkit.com/nerdacus/technicalindicator-shootingstarunconfirmed).
34. [Tweezer Top 顶部钳形线](https://runkit.com/nerdacus/technicalindicator-tweezertop).
35. [Tweezer Bottom 底部钳形线](https://runkit.com/nerdacus/technicalindicator-tweezerbottom).

or

Search for all bullish or bearish using


``` javascript
var twoDayBullishInput = {
  open: [23.25,15.36],
  high: [25.10,30.87],
  close: [21.44,27.89],
  low: [20.82,14.93],
}

var bullish = require('technicalindicators').bullish;

bullish(twoDayBullishInput) //true
```


# API

There are three ways you can use to get the indicator results.

## calculate

Every indicator has a static method `calculate` which can be used to calculate the indicator without creating an object.

``` javascript
const sma = require('technicalindicators').sma;
var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
var period = 10;
sma({period : period, values : prices})
```

or

``` javascript
const SMA = require('technicalindicators').SMA;
var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
var period = 10;
SMA.calculate({period : period, values : prices})
```

## nextValue

`nextValue` method is used to get the next indicator value.

``` javascript
var sma = new SMA({period : period, values : []});
var results = [];
prices.forEach(price => {
  var result = sma.nextValue(price);
  if(result)
    results.push(result)
});
```

## getResult

This a merge of calculate and nextValue. The usual use case would be

1. Initialize indicator with available price value

1. Get results for initialized values

1. Use nextValue to get next indicator values for further tick.

    ``` javascript
    var sma = new SMA({period : period, values : prices});
    sma.getResult(); // [5.5, 6.6, 7.7, 8.9]
    sma.nextValue(16); // 10.1
    ```

    Note: Calling nextValue will not update getResult() value.

### Precision

This uses regular javascript numbers, so there can be rounding errors which are negligible for a technical indicators, you can set precision by using the below config. By default there is no precision set.

  ``` javascript
  const technicalIndicators = require('technicalindicators');
  technicalIndicators.setConfig('precision', 10);
  ```


# Contribute

Create issues about anything you want to report, change of API's, or request for adding new indicators. You can also create pull request with new indicators.

## Environment dependencies

- **Node.js**: 18+ (tested with Node.js 22)
- **TypeScript**: 5.6+ (for development)

The `canvas` package is optional and only needed for running tests that generate candlestick images. If you don't need to run those tests, you can skip installing canvas dependencies.

## Setup

``` bash
git clone git@github.com:wahack/technicalindicators.git
cd technicalindicators
npm install
npm run build
```

## Running tests and getting coverage

``` bash
npm test
npm run cover
```

## Adding new indicators

1. Add tests for the indicator and make them pass.
   (It would be better if a sample of the stockcharts excel is used for the test case.)
1. Add the indicator to `src/index.ts`
1. Run build script: `npm run build`
1. Add it to `README.md`, with the link to the runkit url containing the sample.
1. Add indicator to keywords in `package.json`
1. Send a Pull Request.


## Example: Using Supertrend

``` javascript
const { supertrend } = require('@wahack/technicalindicators');

const input = {
  high: [100, 102, 101, 103, 105, 104, 106],
  low: [99, 101, 100, 102, 104, 103, 105],
  close: [101, 101.5, 102, 102.5, 104.5, 103.5, 105.5],
  period: 10,
  multiplier: 3,
  changeATR: true
};

const result = supertrend(input);
// Returns array of SupertrendOutput objects with:
// - supertrend: number
// - upper: number
// - lower: number
// - trend: number (1 for up, -1 for down)
// - buySignal: boolean
// - sellSignal: boolean
```

