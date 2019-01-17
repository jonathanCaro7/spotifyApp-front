import { Component, ViewChild, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ToastrService } from 'ngx-toastr';
import { Album } from 'src/app/models/Album';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('pagination') private pagination;
  album_name: string;
  private current_page = 1;
  albums: Album[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.album_name = this.route.snapshot.queryParams['album'];

    this.route.queryParamMap.subscribe((paramsAsMap: any) => {
      this.current_page = paramsAsMap.params.page || 1;
      if (paramsAsMap.params.album || paramsAsMap.params.page) {
        this.searchAlbum();
      }
    });
  }

  submitForm() {
    console.log('submit');
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { album: this.album_name },
      queryParamsHandling: 'merge'
    });

    this.searchAlbum();
  }

  private searchAlbum() {
    console.log('search');
    this.searchService.search(this.album_name, this.current_page).subscribe(
      (res: any) => {
        console.log(res);
        this.albums = res.items;

        this.pagination.setPages(
          res.items.length,
          res.total,
          Math.floor((res.offset / res.limit) + 1),
          res.limit,
          5
        );
      },
      (err: string) => this.toast.error(err)
    );
  }
}
