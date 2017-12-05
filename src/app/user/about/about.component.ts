import { Component, OnInit } from '@angular/core';

import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'yaojiangjie-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [appModuleSlowAnimation()]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
