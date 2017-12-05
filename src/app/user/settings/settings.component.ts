import { Component, OnInit } from '@angular/core';

import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'yaojiangjie-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [appModuleSlowAnimation()]

})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
