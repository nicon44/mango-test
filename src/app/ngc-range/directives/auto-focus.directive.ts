import { Directive , AfterViewInit ,ElementRef } from '@angular/core';

@Directive({
  selector: '[lib-auto-focus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(){
    this.el.nativeElement.focus();
  }

}
