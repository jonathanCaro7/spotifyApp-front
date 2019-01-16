import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ToastrService } from 'ngx-toastr';
import { Album } from 'src/app/models/Album';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private albums: Album[];
  constructor(
    private searchService: SearchService,
    private toast: ToastrService) { }

  searchAlbum(album: string) {
    this.searchService.search(album).subscribe(
      (res: Album[]) => console.log(res),
      (err: string) => this.toast.error(err)
    );
  }
}
