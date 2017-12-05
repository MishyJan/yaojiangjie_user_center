import { Component, OnInit } from '@angular/core';

import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'yaojiangjie-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: [appModuleSlowAnimation()]

})
export class FeedbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
