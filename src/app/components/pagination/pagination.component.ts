import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  totalItems: number;
  pageSize: number;
  maxPageItems: number;
  pageItems: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  currentPage: number;
  pages: number[];

  constructor(private router: Router, private route: ActivatedRoute) { }

  private setPages(pageItems, totalItems, currentPage, pageSize, maxPageItems) {
    this.totalPages = Math.ceil(totalItems / pageSize);
    this.pageItems = pageItems,
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.maxPageItems = maxPageItems;

    if (currentPage < 1) { currentPage = 1; } else if (currentPage > this.totalPages) { currentPage = this.totalPages; }

    if (this.totalPages <= maxPageItems) {
      this.startPage = 1;
      this.endPage   = this.totalPages;
    } else {
      if (currentPage < maxPageItems) {
        this.startPage = 1;
        this.endPage   = maxPageItems;
      } else if (currentPage + maxPageItems <= this.totalPages) {
        this.startPage = currentPage;
        this.endPage   = currentPage + maxPageItems - 1;

        this.startPage = (Math.floor((currentPage - maxPageItems) / maxPageItems) + 1) * maxPageItems;
        this.endPage   = this.startPage + maxPageItems - 1;

        if (currentPage === this.endPage) {
        this.startPage = currentPage;
          this.endPage   = this.startPage + maxPageItems - 1;
        }

      } else {
        this.startPage = this.totalPages - 4;
        this.endPage   = this.totalPages;
      }
    }

    this.pages = Array(this.endPage - (this.startPage - 1)).fill(this.startPage).map((item, index) => item + index);
  }
}
