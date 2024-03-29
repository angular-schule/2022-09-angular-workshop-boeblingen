import { Component, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, takeUntil, shareReplay } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-multicast',
  templateUrl: './multicast.component.html',
})
export class MulticastComponent implements OnDestroy {

  listeners: string[] = [];
  logStream$ = new ReplaySubject<string>();
  private destroy$ = new Subject<void>();

  measureValues$: Observable<number>; // später: Subject<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) {
    /**************!!**************/

    // 1. unchanged stream
    // this.measureValues$ = this.mvs.getValues();

    // 2. multicast mit share() --> Subject
    this.measureValues$ = this.mvs.getValues().pipe(
      // share()
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    )

    // Zuhause Ausprobieren! =)
    // Subject
    // BehaviorSubject
    // ReplaySubject
    // this.measureValues$ = new Subject<number>();
    // this.mvs.getValues().subscribe(this.measureValues$); // leak!!!

    /**************!!**************/

  }

  addListener() {
    this.listeners.push(this.es.generateRandomString());
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString();
    this.measureValues$.pipe(takeUntil(this.destroy$)).subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
