import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { CurrencyConversionRate } from '../interfaces/currency-conversion-rate.model';
import { Converter } from '../interfaces/converter.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  httpClient = inject(HttpClient);
  private baseApiUrl = environment.baseApiUrl;
  private apiKey = environment.key;
  private apiUrl = `${this.baseApiUrl}${this.apiKey}`;

  private resultSubject = new BehaviorSubject<string>('');
  private result$: Observable<string> = this.resultSubject.asObservable();

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
  
}
