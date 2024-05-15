import { AfterViewInit, Component, ViewChild, output} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Converter } from '../../../../shared/interfaces/converter.model';

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

  listConverter: Converter[];
  displayedColumns: string[] = [
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

    this.listConverter = [
      {
        dateConverter: new Date().toLocaleDateString("pt-BR"),
        timeConverter: new Date().toLocaleTimeString("pt-BR"),
        value: 100,
        fromCurrency: 'BRL',
        toCurrency: 'USD',
        amount: 20.167793,
        rate: 0.200678
      },
      {
        dateConverter: new Date().toLocaleDateString("pt-BR"),
        timeConverter: new Date().toLocaleTimeString("pt-BR"),
        value: 200,
        fromCurrency: 'BRL',
        toCurrency: 'USD',
        amount: 20.067793,
        rate: 0.200678
      },
      {
        dateConverter: new Date().toLocaleDateString("pt-BR"),
        timeConverter: new Date().toLocaleTimeString("pt-BR"),
        value: 300,
        fromCurrency: 'BRL',
        toCurrency: 'USD',
        amount: 20.067793,
        rate: 0.200678
      },
      {
        dateConverter: new Date().toLocaleDateString("pt-BR"),
        timeConverter: new Date().toLocaleTimeString("pt-BR"),
        value: 400,
        fromCurrency: 'BRL',
        toCurrency: 'USD',
        amount: 20.067793,
        rate: 0.200678
      },
      {
        dateConverter: new Date().toLocaleDateString("pt-BR"),
        timeConverter: new Date().toLocaleTimeString("pt-BR"),
        value: 100,
        fromCurrency: 'BRL',
        toCurrency: 'USD',
        amount: 20.067793,
        rate: 0.200678
      },
      {
        dateConverter: new Date().toLocaleDateString("pt-BR"),
        timeConverter: new Date().toLocaleTimeString("pt-BR"),
        value: 100,
        fromCurrency: 'BRL',
        toCurrency: 'USD',
        amount: 20.067793,
        rate: 0.200678
      },
      {
        dateConverter: new Date().toLocaleDateString("pt-BR"),
        timeConverter: new Date().toLocaleTimeString("pt-BR"),
        value: 700,
        fromCurrency: 'BRL',
        toCurrency: 'USD',
        amount: 20.067793,
        rate: 0.200678
      },
    ]

    this.dataSource = new MatTableDataSource(this.listConverter);
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
