﻿import { state } from '@angular/core';

export class AppConsts {

    static readonly tenancyNamePlaceHolderInUrl = '{TENANCY_NAME}';

    static remoteServiceBaseUrl: string;
    static remoteServiceBaseUrlFormat: string;
    static appBaseUrl: string;
    static appLanguage: string;
    static appBusinessBaseUrl: string;
    static appBaseUrlFormat: string;
    static WxJssdkUrl: string = window.location.href;
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
        defaultPageSize: 10,
        pageSizes: [5, 10, 20, 50, 100],
        maxPageSize: 1000,
    };

    static readonly accessRecord = {
        scanResult: 'scanResult',
    };
}

export class DefaultProfilePath {
    static defaultProfilePictureUrl = '/assets/common/images/default-profile-picture.png';
}

export class ColourCode {
    static readonly colors = ['#338EFF', '#02BF25', '#F79839'];
}