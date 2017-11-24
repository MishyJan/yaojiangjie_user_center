import * as _ from 'lodash';

import { BookingTimelineDto, PerBookingOrderServiceProxy } from 'shared/service-proxies/service-proxies';
import { Component, Injector, OnInit } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { MediaCompressFormat, MediaPath } from 'shared/AppConsts';
import { Moment } from 'moment';
import { Router } from '@angular/router';
import { ProfileServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'xiaoyuyue-time-line',
    templateUrl: './time-line.component.html',
    styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent extends AppComponentBase implements OnInit {
    allPerBookingOrderData: any[] = [];
    totalCount: number;
    perBookingOrderData: BookingTimelineDto[] = [];
    skipCount = 0;
    maxResultCount = 10;
    startDataTime: Moment;
    slogan = '啥都没有，赶紧去预约吧';

    infiniteScrollDistance = 1;
    infiniteScrollThrottle = 300;
    isLoaded = false;
    isLoading = false;
    shownLoginName = '';
    profilePicture = MediaPath.defaultProfilePictureUrl;

    constructor
        (
        injector: Injector,
        private _router: Router,
        private _profileServiceProxy: ProfileServiceProxy,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
        ) {
        super(injector);
    }

    ngOnInit() {
        this.loadData();
        this.getProfilePicture();
        this.getCurrentLoginInformations();
    }

    ngAfterViewInit() {
        this.resetHeaderStyle();
    }

    ngOnDestroy() {
        this.beforeHeaderStyle();
    }

    loadData(): void {
        this._perBookingOrderServiceProxy
            .getBookingTimeline(this.startDataTime, this.maxResultCount, this.skipCount)
            .subscribe(result => {
                this.totalCount = result.totalCount;
                this.perBookingOrderData = _.map(result.items, this.converTimelineData);
                this.allPerBookingOrderData.push(this.perBookingOrderData);
            })
    }

    resetHeaderStyle(): void {
        $('#fixedHeader').find('.top-title').addClass('opacity-bg');
    }

    beforeHeaderStyle(): void {
        $('#fixedHeader').find('.top-title').removeClass('opacity-bg');

    }
    showBookingDetail(bookingId: number) {
        this._router.navigate(['/user/booking/info', bookingId]);
    }

    converTimelineData(item: BookingTimelineDto): BookingTimelineDto {
        return item;
    }

    getCurrentLoginInformations(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
    }

    getProfilePicture(): void {
        this._profileServiceProxy.getProfilePicture().subscribe(result => {
            if (result && result.profilePicture) {
                this.profilePicture = result.profilePicture;
                // this.safeProfilePicture = this.sanitizer.bypassSecurityTrustStyle(this.profilePicture);
            }
        });
    }

    public onScrollDown(): void {
        if (this.skipCount > (this.totalCount - this.maxResultCount)) {
            this.isLoaded = true;
            return;
        }
        this.skipCount += this.maxResultCount;
        this.loadData();
    }
}
