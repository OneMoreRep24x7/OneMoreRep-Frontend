import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoading } from './store/common/common.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'OneMoreRep-Frontend';
  showLoading$ : Observable<boolean|undefined>; 

  constructor(private store : Store){}

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading)
  }
}
