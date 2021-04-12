import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { STATES, FIXED_SIZE } from '../data/states';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.css']
})
export class VirtualScrollComponent {

  fixedSizeData = FIXED_SIZE;
  
  states$ = Observable.create(observer => {
      observer.next(STATES);
      observer.complete();
  })

  sortBy(prop: 'name' | 'capital') {
    const sortedVals = STATES.map(s => ({ ...s })).sort((a, b) => {
      const aProp = a[prop], bProp = b[prop];
      if (aProp < bProp) {
        return -1;
      } else if (aProp > bProp) {
        return 1;
      }
      return 0;
    });

    this.states$ = Observable.create(observer => {
        observer.next(sortedVals);
        observer.complete();
    });
  }

}