import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { tick } from '@angular/core/testing';
import { AdjustNavbarService } from 'src/app/shared/services/adjust-navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild("home_display") display!: ElementRef
  @ViewChild("footer") footer!: ElementRef
  constructor(
    private adjustNavbar: AdjustNavbarService,
    private renderer2: Renderer2
  ) { }
  trigger: string = "uncollapsed";
  barState: boolean = false;
  resBefore = "0px";
  timeoutRef: any;
  ngOnInit() {
    this.adjustNavbar.adjust$.subscribe((res:any) => {
      if (this.timeoutRef) { clearTimeout(this.timeoutRef); }
      const display = this.display.nativeElement;
      document.documentElement.style.setProperty("--margin", (String(res) + "px"));
      document.documentElement.style.setProperty("--margin-before", (String(this.resBefore) + "px"));
      this.renderer2.addClass(display,"collapse")
      this.resBefore=String(res);
      this.timeoutRef = setTimeout(() => {
        this.renderer2.removeClass(display,"collapse")
      }, 500);

     /* 
      this.barState = !this.barState;
      if (this.barState == true) {
        this.renderer2.removeClass(display, this.trigger)

        this.trigger = "collapsed";
        this.renderer2.addClass(display, this.trigger)

      } else {
        this.trigger = "uncollapsed"
        this.renderer2.removeClass(display, "collapsed")

        this.renderer2.addClass(display, "uncollapsed")
      }
      /*setTimeout(() => {
        this.renderer2.removeClass(display, this.trigger)
      }, 1);
      this.renderer2.addClass(display, this.trigger)*/


    })
  }
}
