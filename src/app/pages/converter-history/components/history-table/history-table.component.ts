import { AfterViewInit, Component, ViewChild, inject, output} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Converter } from '../../../../shared/interfaces/converter.model';
import { CurrencyConverterService } from '../../../../shared/services/currency-converter.service';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss'
})
export class HistoryTableComponent implements AfterViewInit {

  currencyConverterService = inject(CurrencyConverterService);

  displayedColumns: string[] = [
    'id',
    'dateConverter', 
    'timeConverter', 
    'value', 
    'fromCurrency', 
    'toCurrency', 
    'amount', 
    'rate', 
    'actions'
  ];
  dataSource: MatTableDataSource<Converter>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  delete = output<Converter>();

  constructor() {
    const listConverter: Converter[] = this.currencyConverterService.getAllConverter();
    this.dataSource = new MatTableDataSource(listConverter);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(converter: Converter){
    this.delete.emit(converter);
  }

}
