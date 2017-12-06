import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yaojiangjie-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss']
})
export class EmptyPageComponent implements OnInit {
@Input() data: any;
@Input() text: any;
  constructor() { }

  ngOnInit() {
  }

}
