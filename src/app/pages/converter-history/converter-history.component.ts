import { Component, inject } from '@angular/core';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import { Converter } from '../../shared/interfaces/converter.model';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-converter-history',
  standalone: true,
  imports: [HistoryTableComponent],
  templateUrl: './converter-history.component.html',
  styleUrl: './converter-history.component.scss'
})
export class ConverterHistoryComponent {

  confirmationDialogService = inject(ConfirmationDialogService);

  onDelete(converter: Converter) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        // TODO
      })
  }
}
