import { AccessRecordInput, AccessRecordServiceProxy, ShareRecordInput } from 'shared/service-proxies/service-proxies';
import { AccessSourceType, WeChatAccessSourceType } from './../AppEnums';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppConsts } from './../AppConsts';
import { CookiesService } from './cookies.service';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { WeChatShareResultDto } from 'app/shared/utils/wechat.dto';
import { async } from '@angular/core/testing';

const UA = require('ua-device');

@Injectable()
export class AccessRecordService {
    outputUa;
    firstTimeOfDay = true;
    source;
    weChatSource;
    accessTime;
    href;
    constructor(
        private _cookiesService: CookiesService,
        private _recordService: AccessRecordServiceProxy,
    ) { }

    init(source: string, weChatSource: string, href: string) {
        this.source = source;
        this.weChatSource = weChatSource;
        this.href = href;
        this.accessTime = moment();
        this.outputUa = new UA(window.navigator.userAgent);
        // 是否首次
        const scanResultString = this._cookiesService.getCookieValue(AppConsts.accessRecord.scanResult);
        if (scanResultString) {
            this.firstTimeOfDay = scanResultString.split(',').indexOf(href) < 0;
        }
    }

    setScanRecordDailyCookies(scanResult: string) {
        const cookiesExpireDate = moment().endOf('day').toDate();
        const scanResultString = this._cookiesService.getCookieValue(AppConsts.accessRecord.scanResult);
        let scanResults = [];
        if (scanResultString) {
            scanResults = scanResultString.split(',');
        }
        if (scanResults.indexOf(scanResult) >= 0) {
            return;
        } else {
            scanResults.push(scanResult);
            this._cookiesService.setCookieValue(AppConsts.accessRecord.scanResult, scanResults.join(','), cookiesExpireDate,
                abp.appPath)
        }
    }

    recordAccess(finallyCallback: () => void) {
        const input = new AccessRecordInput();
        input.firstTimeOfDay = this.firstTimeOfDay;
        input.accessUrl = this.href;
        input.osName = this.outputUa.os.name; // 操作系统
        input.deviceBrand = this.outputUa.device.manufacturer; // 设备品牌
        input.source = AccessSourceType.getType(this.source); // 访问渠道
        input.weChatSource = WeChatAccessSourceType.getType(this.source); // 微信内来源
        input.isWap = (this.outputUa.device.type === 'mobile'); // 是否移动端
        input.standingTime = moment().diff(this.accessTime); // 计算停留时间
        const data = JSON.stringify(input.toJSON());
        this._recordService
            .recordBookingAccessAsync(input)
            .subscribe(result => {
                finallyCallback();
            });
    }

    recordBookingShare(resultDto: WeChatShareResultDto, finallyCallback: () => void) {
        const input = new ShareRecordInput();

        input.shareUrl = this.href;
        input.target = AccessSourceType.getType(resultDto.target); // 分享渠道 ;
        const data = JSON.stringify(input.toJSON());
        this._recordService
            .recordBookingShareAsync(input)
            .subscribe(result => {
                finallyCallback();
            });
    }
}
