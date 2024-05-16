import { Injectable } from '@angular/core';
import { Converter } from '../interfaces/converter.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  private _listConverter: Converter[] = [] 

  constructor() { }

  addConverter(itemName: string, converter: Converter): void {

    const listConverterStorage = localStorage.getItem(itemName);

    if (!listConverterStorage){
      this._listConverter.push(converter);
      localStorage.setItem(itemName,JSON.stringify(this._listConverter));
      this._listConverter = [];
      return;
    }

    if(listConverterStorage !== null){
      this._listConverter = JSON.parse(listConverterStorage);
      this._listConverter.push(converter);
      localStorage.setItem(itemName,JSON.stringify(this._listConverter));
      this._listConverter = [];
    }
  }

  getAllConverter(): Converter[] {
    const listConverterStorage = localStorage.getItem('list-converter');
    if(listConverterStorage !== null){
      const listConverter: Converter[] = JSON.parse(listConverterStorage);
      return listConverter;
    }
    return [];
  }

}
