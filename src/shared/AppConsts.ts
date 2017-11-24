import { Booking } from './service-proxies/service-proxies';
import { state } from '@angular/core';

export class AppConsts {

    static readonly tenancyNamePlaceHolderInUrl = '{TENANCY_NAME}';

    static remoteServiceBaseUrl: string;
    static remoteServiceBaseUrlFormat: string;
    static appBaseUrl: string;
    static appLanguage: string;
    static appBusinessBaseUrl: string;
    static bookingPictureFormat: string;
    static appBaseUrlFormat: string;
    static BookingPicture: string;
    static readonly externalLoginUrl = '/auth/login';

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        commonLocalizationSourceName: 'Yaojiangjie',
        defaultLocalizationSourceName: 'UserCenter'
    };

    static readonly authorization = {
        encrptedAuthTokenName: 'enc_auth_token'
    };

    static readonly grid = {
        defaultPageSize: 1,
        pageSizes: [5, 10, 20, 50, 100],
        maxPageSize: 1000,
    }

    static readonly accessRecord = {
        bookings: 'access_bookings'
    };
}

export class MediaPath {
    static defaultProfilePictureUrl = '/assets/common/images/default-profile-picture.png';
}
