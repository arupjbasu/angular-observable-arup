import { Component } from '@angular/core';

import { Observable, Observer, Subscription, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';

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

  constructor(private http: Http) { }

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

    this.http.get('https://jsonplaceholder.typicode.com/posts')
    .pipe(map(this.extractData))
    .subscribe(this.handleData, this.handleError, this.handleComplete);

    this.subscription = fromEvent(document, 'mousemove')
    .subscribe(this.handleData, this.handleError, this.handleComplete);
}
extractData(response) {
  console.log('Raw response:', response);
  console.log('Formatted response:', response.json());
  const body = response.json();
  return body || { };
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
