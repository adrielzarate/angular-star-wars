import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, pluck, tap } from 'rxjs/operators';
import { ICharacter } from 'src/app/models/i-character';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  public loading = true;
  public characters$: Observable<ICharacter[]>;

  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit() {
    this.characters$ = this.charactersService.getCharacters()
    .pipe(
      pluck('results'),
      tap(console.log),
      finalize(() => {
        this.loading = false;
      })
    )
  }

}
