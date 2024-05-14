import { Component } from '@angular/core';
import { HistoryTableComponent } from './components/history-table/history-table.component';

@Component({
  selector: 'app-converter-history',
  standalone: true,
  imports: [HistoryTableComponent],
  templateUrl: './converter-history.component.html',
  styleUrl: './converter-history.component.scss'
})
export class ConverterHistoryComponent {

}
