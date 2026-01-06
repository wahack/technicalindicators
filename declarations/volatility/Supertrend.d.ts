import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CandleData } from '../StockData';
export declare class SupertrendInput extends IndicatorInput {
    high: number[];
    low: number[];
    close: number[];
    period: number;
    multiplier: number;
    changeATR: boolean;
}
export declare class SupertrendOutput extends IndicatorInput {
    supertrend: number;
    upper: number;
    lower: number;
    trend: number;
    buySignal: boolean;
    sellSignal: boolean;
}
export declare class Supertrend extends Indicator {
    result: SupertrendOutput[];
    generator: IterableIterator<SupertrendOutput | undefined>;
    constructor(input: SupertrendInput);
    static calculate: typeof supertrend;
    nextValue(price: CandleData): SupertrendOutput | undefined;
}
export declare function supertrend(input: SupertrendInput): SupertrendOutput[];
