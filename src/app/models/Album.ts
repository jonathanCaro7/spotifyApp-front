import { Artist } from './Artist';
import { Image } from './Image';

export class Album {
    id: string;
    href: string;
    album_type: string;
    artists: Artist[];
    images: Image[];
    name: string;
    release_date: string;
    total_tracks: number;
    uri: string;
    type: string;
}

