import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrencyConversionRate } from '../interfaces/currency-conversion-rate.model';
import { Converter } from '../interfaces/converter.model';
import { environment } from '../environments/environment';
import { SupportedCurrencies } from '../interfaces/ supported-currencies.model';
import { Currency } from '../interfaces/currency.model';


@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  
  private currencies: Currency[] = [];
  private currenciesSubject = new BehaviorSubject<Currency[]>([]);
  private currencies$: Observable<Currency[]> = this.currenciesSubject.asObservable();

  private httpClient = inject(HttpClient);
  private baseApiUrl = environment.baseApiUrl;
  private apiKey = environment.key;
  private apiUrl = `${this.baseApiUrl}${this.apiKey}`;

  private resultSubject = new BehaviorSubject<string>('');
  private result$: Observable<string> = this.resultSubject.asObservable();


  getSupportedCodes(): Observable<Currency[]> {
    if(this.currencies.length === 0){
      this.httpClient.get<SupportedCurrencies>(`${this.apiUrl}/codes`)
      .subscribe((supportedCurrencies) => {
        this.convertToCurrency(supportedCurrencies);
      })
    }
    
    return this.currencies$;
  }

  getConversion(converter: Converter): Observable<string> {
    this.httpClient.get<CurrencyConversionRate>(`${this.apiUrl}/latest/${converter.fromCurrency}`)
      .subscribe((currencyConversionRate) => {
        this.convert(currencyConversionRate, converter);
      })
    return this.result$;
  }

  private convert(currencyConversionRate: CurrencyConversionRate, converter: Converter): void {
    const exchangeRate = currencyConversionRate.conversion_rates[converter.toCurrency];
    const totalExchangeRate = (converter.amount * Number(exchangeRate));
    const result = `${converter.amount} em ${converter.fromCurrency} equivale a ${totalExchangeRate.toFixed(4)} em ${converter.toCurrency}`
    
    this.resultSubject.next(result); 
  }
  
  private convertToCurrency(supportedCurrencies: SupportedCurrencies): void {
    this.currencies = [];
    supportedCurrencies.supported_codes.forEach((code) => {
      this.currencies.push({
        'code': code[0],
        'description': code[1],
      })
    })

    this.currenciesSubject.next(this.currencies);
  }
}
