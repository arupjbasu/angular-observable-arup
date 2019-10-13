import { Component } from '@angular/core';

import { Observable, Observer, Subscription, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  observable: Observable<string>;
  observer: Observer<string>;
  subscription: Subscription;
  ngOnInit() {
  this.observable = new Observable((observer: Observer<string>) => {
    this.observer = observer;
  });

  this.observable
      .subscribe(this.handleData, this.handleError , this.handleComplete);

    this.observer.next('12');
    this.observer.next('15');
    this.observer.complete();
    this.observer.next('16');
}

handleData(data) {
    console.log('Here are the usable data', data);
    // Insert Business logic here
  }

  handleComplete() {
    console.log('Complete');
  }

  handleError(error) {
    console.log('error:', error)
    return Observable.throw(error);
  }
}
