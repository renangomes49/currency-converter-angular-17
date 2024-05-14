import { Routes } from '@angular/router';
import { CurrencyConverterComponent } from './pages/currency-converter/currency-converter.component';
import { CurrencyListComponent } from './pages/currency-list/currency-list.component';

export const routes: Routes = [
    {
        path: 'currency-converter', component: CurrencyConverterComponent
    },
    {
        path: 'currencys', component: CurrencyListComponent
    }
];
