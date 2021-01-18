import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { auditTime, bufferTime, debounceTime, sampleTime, throttleTime, tap, take } from 'rxjs/operators';

const delayTime = 2000;

@Component({
  selector: 'app-delay-execute-function',
  templateUrl: './delay-execute-function.component.html',
  styleUrls: ['./delay-execute-function.component.scss']
})
export class DelayExecuteFunctionComponent implements AfterViewInit {
  
  actions = []

  constructor() { }

  @ViewChild('inputImmediate') inputImmediate: ElementRef;
  @ViewChild('btnImmediate') btnImmediate: ElementRef;
  
  @ViewChild('inputDebounce') inputDebounce: ElementRef;
  @ViewChild('btnDebounce') btnDebounce: ElementRef;

  @ViewChild('inputThrottle') inputThrottle: ElementRef;
  @ViewChild('btnThrottle') btnThrottle: ElementRef;

  @ViewChild('inputAudit') inputAudit: ElementRef;
  @ViewChild('btnAudit') btnAudit: ElementRef;

  @ViewChild('inputSample') inputSample: ElementRef;
  @ViewChild('btnSample') btnSample: ElementRef;

  @ViewChild('inputBuffer') inputBuffer: ElementRef;
  @ViewChild('btnBuffer') btnBuffer: ElementRef;

  ngAfterViewInit(): void {

    fromEvent(this.inputImmediate.nativeElement, 'keyup')
    .subscribe(($event)=>{
      this.pushFromInput('immediate', $event)
    })
    fromEvent(this.btnImmediate.nativeElement, 'click')
    .subscribe(()=>{
      this.pushFromBtn('immediate')
    })

    fromEvent(this.inputDebounce.nativeElement, 'keyup')
    .pipe(debounceTime(delayTime))
    .subscribe(($event)=>{
      this.pushFromInput('debounce', $event)
    })
    fromEvent(this.btnDebounce.nativeElement, 'click')
    .pipe(debounceTime(delayTime))
    .subscribe(()=>{
      this.pushFromBtn('debounce')
    })

    fromEvent(this.inputThrottle.nativeElement, 'keyup')
    .pipe(throttleTime(delayTime))
    .subscribe(($event)=>{
      this.pushFromInput('throttle', $event)
    })
    fromEvent(this.btnThrottle.nativeElement, 'click')
    .pipe(throttleTime(delayTime))
    .subscribe(()=>{
      this.pushFromBtn('throttle')
    })

    fromEvent(this.inputAudit.nativeElement, 'keyup')
    .pipe(auditTime(delayTime))
    .subscribe(($event)=>{
      this.pushFromInput('audit', $event)
    })
    fromEvent(this.btnAudit.nativeElement, 'click')
    .pipe(auditTime(delayTime))
    .subscribe(()=>{
      this.pushFromBtn('audit')
    })

    fromEvent(this.inputSample.nativeElement, 'keyup')
    .pipe(sampleTime(delayTime))
    .subscribe(($event)=>{
      this.pushFromInput('Sample', $event)
    })
    fromEvent(this.btnSample.nativeElement, 'click')
    .pipe(sampleTime(delayTime))
    .subscribe(()=>{
      this.pushFromBtn('sample')
    })

    fromEvent(this.inputBuffer.nativeElement, 'keyup')
    .pipe(bufferTime(delayTime))
    .subscribe(($event)=>{
      console.log('[Buffer input]', $event)
    })
    fromEvent(this.btnBuffer.nativeElement, 'click')
    .pipe(bufferTime(delayTime))
    .subscribe(($event)=>{
      console.log('[Buffer btn]', $event)
    })

  }

  pushFromBtn(type){
    this.actions.unshift({type, date: new Date(), value: "btn"})
  }

  pushFromInput(type, $event){
    this.actions.unshift({type, date: new Date(), value: $event?.target?.value})
  }



}
