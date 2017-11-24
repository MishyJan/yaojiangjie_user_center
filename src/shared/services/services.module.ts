import { AccessRecordService } from 'shared/services/access-record.service';
import { BreadcrumbService } from 'shared/services/bread-crumb.service';
import { CookiesService } from 'shared/services/cookies.service';
import { LoginService } from 'shared/services/login.service';
import { NgModule } from '@angular/core';
import { TenantService } from 'shared/services/tenant.service';
import { TitleService } from 'shared/services/title.service';
import { WeChatShareTimelineService } from 'shared/services/wechat-share-timeline.service';

@NgModule({
    providers: [
        AccessRecordService,
        TenantService,
        LoginService,
        CookiesService,
        BreadcrumbService,
        TitleService,
        WeChatShareTimelineService
    ]
})
export class ServicesModule { }
