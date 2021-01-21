import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AsyncSubject, BehaviorSubject, fromEvent, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {

  @ViewChild('inputEl') inputImmediate: ElementRef;
  @ViewChild('btnEl') btnImmediate: ElementRef;

  s$ = new Subject();
  bS$ = new BehaviorSubject(null);
  rS$ = new ReplaySubject(1);
  aS$ = new AsyncSubject();

  exist = true

  constructor() { }

  ngAfterViewInit(): void {

    fromEvent(this.inputImmediate.nativeElement, 'keyup')
    .subscribe(($event:any)=>{
      this.s$.next($event?.target?.value)
      this.bS$.next($event?.target?.value)
      this.rS$.next($event?.target?.value)
      this.aS$.next($event?.target?.value)
    })
    fromEvent(this.btnImmediate.nativeElement, 'click')
    .subscribe(()=>{
      this.s$.next('btn')
      this.bS$.next('btn')
      this.rS$.next('btn')
      this.aS$.next('btn')
    })

    this.s$.subscribe((v)=>{
      console.log('s$', v)
    })

    this.bS$.subscribe((v)=>{
      console.log('bS$', v)
    })

    this.rS$.subscribe((v)=>{
      console.log('rS$', v)
    })

    this.aS$.subscribe((v)=>{
      console.log('aS$', v)
    })


  }


}
