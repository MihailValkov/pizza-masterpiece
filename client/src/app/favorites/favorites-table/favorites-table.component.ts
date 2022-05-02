import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
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
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FavoritesTableComponent implements OnInit, OnChanges {
  @Input() products!: IFavoriteProduct[];
  panelOpenState = true;
  ingredients = ['Pizza sauce', 'Mozzarella', 'Pepperoni'];
  displayedColumns: string[] = [
    'product',
    'rating',
    'size',
    'dough',
    'grams',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private store: Store<IUserDataState>) {}

  ngOnInit(): void {
    const products = this.products.map((p) => ({ ...p, isOn: false }));
    this.dataSource = new MatTableDataSource(products);
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
