import { Component, inject } from '@angular/core';
import { FormComponent } from './components/form/form.component';
import { MatCardModule } from '@angular/material/card';
import { Converter } from '../../shared/interfaces/converter.model';
import { CurrencyConverterService } from '../../shared/services/currency-converter.service';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FormComponent, MatCardModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent {
  result: string = 'Aguardando resultado da conversão ...';

  currencyConverterService = inject(CurrencyConverterService);

  onConvert(converter: Converter): void {
    this.currencyConverterService.getConversion(converter)
      .subscribe((answer) => {
        this.result = answer;
      })
  }
}
