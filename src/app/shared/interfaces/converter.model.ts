export interface Converter {
    dateConverter: string;
    timeConverter: string;
    value: number;
    fromCurrency: string;
    toCurrency: string;
    amount: number;
    rate: number;
}