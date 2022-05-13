import {
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { IUserDataState } from 'src/app/core/+store';
import { removeProductFromFavorites } from 'src/app/core/+store/favorites/actions';
import { IFavoriteProduct } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-favorites-table',
  templateUrl: './favorites-table.component.html',
  styleUrls: [
    './favorites-table.component.css',
    '../../shared/styles/table.css',
  ],
})
export class FavoritesTableComponent implements OnInit {
  @Input() products!: IFavoriteProduct[];
  displayedColumns: string[] = [
    'name',
    'rating',
    'size',
    'dough',
    'weight',
    'action',
  ];

  dataSource!: MatTableDataSource<IFavoriteProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<IUserDataState>) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i) => o[i], obj);
  }

  removeFromFavorites(index: number) {
    this.store.dispatch(removeProductFromFavorites({ index }));
    this.dataSource.data = this.dataSource.data.filter((_, i) => i !== index);
  }
}
