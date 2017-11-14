import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppConsts } from '../../../AppConsts';
import { LangService } from '../../../..//service/change-lang.service';

@Component({
  selector: 'yaojiangjie-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.scss']
})
export class SwitchLangComponent implements OnInit {

    langText: string;
    langFlag: boolean = true;
    @Output() updateData: EventEmitter<any> = new EventEmitter();
  constructor(
    private _langService: LangService
  ) { }

  ngOnInit() {
    let lang = localStorage.getItem("language");
    let title = localStorage.getItem("title");

    if (lang === "zh_cn") {
        this.langFlag = false;
        this.langText = "En";
    } else {
        this.langText = "中文";
        this.langFlag = true;
    }
    AppConsts.appLanguage = lang;
    AppConsts.appTitle = title;
  }

  toggleLanguage(): void {
    this.langFlag = !this.langFlag;
    if (!this.langFlag) {
        localStorage.setItem("language", "zh_cn");
        localStorage.setItem("title", "思维菩萨");
    } else {
        localStorage.setItem("language", "en");
        localStorage.setItem("title", "Thinking Buddha");
    }
    let lang = localStorage.getItem("language");
    let title = localStorage.getItem("title");
    this.langText = lang === "zh_cn" ? "En" : "中文";
    AppConsts.appLanguage = lang;
    AppConsts.appTitle = title;

    this.updateData.emit();
    this._langService.change.emit();
}

}
