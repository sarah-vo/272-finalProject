import {Directive, ElementRef, EventEmitter, HostListener, Output} from "@angular/core";
import {MatSelect} from "@angular/material/select";

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) { }

  cdkOverlay = document.getElementsByClassName(`cdk-overlay-container`);

  @Output() clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement,this.cdkOverlay);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
