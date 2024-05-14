import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Currency } from '../../../../shared/interfaces/currency.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {

  currencys: Currency[];
  displayedColumns: string[] = ['id', 'code', 'description'];
  dataSource: MatTableDataSource<Currency>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {

    this.currencys = [
      {id: 1, code: 'Code 1', description: 'Description 1'},
      {id: 2, code: 'Code 2', description: 'Description 2'},
      {id: 3, code: 'Code 3', description: 'Description 3'},
      {id: 4, code: 'Code 4', description: 'Description 4'},
      {id: 5, code: 'Code 5', description: 'Description 5'},
      {id: 6, code: 'Code 6', description: 'Description 6'},
      {id: 7, code: 'Code 7', description: 'Description 7'},
      {id: 8, code: 'Code 7', description: 'Description 8'},
      {id: 9, code: 'Code 1', description: 'Description 9'},
      {id: 10, code: 'A Code 10', description: 'Description 10'},
      {id: 11, code: 'A Code 11', description: 'Description 11'},
      {id: 12, code: 'A Code 12', description: 'Description 12'},
      {id: 13, code: 'A Code 13', description: 'Description 13'},
      {id: 14, code: 'A Code 14', description: 'Description 14'},
      {id: 15, code: 'A Code 15', description: 'Description 15'},
      {id: 16, code: 'A Code 16', description: 'Description 16'},
      {id: 17, code: 'Code 17', description: 'Description 17'},
      {id: 18, code: 'Code 18', description: 'Description 18'},
      {id: 19, code: 'Code 19', description: 'Description 19'},
      {id: 20, code: 'Code 20', description: 'Description 20'},
      {id: 21, code: 'Code 21', description: 'Description 21'},
      {id: 22, code: 'Code 22', description: 'Description 22'},
    ],

    this.dataSource = new MatTableDataSource(this.currencys);
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

}
