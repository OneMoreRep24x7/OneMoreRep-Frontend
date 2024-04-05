import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number;
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  totalPages = 0;
  pages: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.calculateTotalPages();
  }

  ngOnChanges(): void {
    this.calculateTotalPages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  pageClicked(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
