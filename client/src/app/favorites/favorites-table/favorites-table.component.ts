import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  styleUrls: ['./favorites-table.component.css'],
})
export class FavoritesTableComponent implements OnInit, OnChanges {
  @Input() products!: IFavoriteProduct[];
  displayedColumns: string[] = [
    'product',
    'rating',
    'size',
    'dough',
    'grams',
    'action',
  ];
  dataSource!: MatTableDataSource<IFavoriteProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private store: Store<IUserDataState>) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes['products'].currentValue);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  removeFromFavorites(index: number) {
    this.store.dispatch(removeProductFromFavorites({ index }));
  }
}
