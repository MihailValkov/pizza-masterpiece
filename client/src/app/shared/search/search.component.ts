import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements AfterViewInit {
  @Input() searchCriterions: { prop: string; value: string }[] = [];
  @Output() onSearch = new EventEmitter<{
    searchValue: string;
    selectValue: string;
  }>();

  @ViewChild('searchElement') searchElement!: ElementRef<HTMLInputElement>;
  @ViewChild(MatSelect) selectElement!: MatSelect;

  constructor() {}

  get searchCriterionsLength() {
    return this.searchCriterions.length;
  }

  ngAfterViewInit(): void {
    const searchEvent = fromEvent(
      this.searchElement.nativeElement,
      'input'
    ).pipe(
      map((event) => (event.target as HTMLInputElement).value),
      debounceTime(300),
      distinctUntilChanged()
    );

    merge(searchEvent, this.selectElement.valueChange).subscribe(() => {
      this.onSearch.next({
        searchValue: this.searchElement.nativeElement.value,
        selectValue: this.selectElement.value,
      });
    });
  }
}
