import { Component, OnInit } from '@angular/core';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'yaojiangjie-looked-exhibit',
  templateUrl: './looked-exhibit.component.html',
  styleUrls: ['./looked-exhibit.component.scss'],
  animations: [appModuleSlowAnimation()]
})
export class LookedExhibitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
