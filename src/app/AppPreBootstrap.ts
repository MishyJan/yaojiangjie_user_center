import { AppConsts } from './AppConsts';
import { async } from '@angular/core/testing';

export class AppPreBootstrap {
    static run(): void {
        AppPreBootstrap.getApplicationConfig();
    }

    private static getApplicationConfig(): void {
        const self = this;
        if (!localStorage.getItem('language')) {
            localStorage.setItem('language', 'zh_cn');
            localStorage.setItem('title', '要讲解');
        }
        AppPreBootstrap.ajax({
            url: 'assets/appconfig.json',
            type: 'get',
            data: '',
            dataType: 'json',
            success: function (res, xml) {
                res = JSON.parse(res);
                AppConsts.appBaseUrl = res.appBaseUrl;
                AppConsts.appLanguage = res.appLanguage;
                AppConsts.appTitle = res.appTitle;
                const lang = localStorage.getItem('language');
                if (lang === 'zh_cn') {
                    AppConsts.appLanguage = 'zh_cn';
                } else if (lang === 'en') {
                    AppConsts.appLanguage = 'en';
                }
            },
            fail: function () {
            }
        });
    }

    private static ajax(options) {
        options = options || {};
        options.type = (options.type || 'GET').toUpperCase();
        options.dataType = options.dataType || 'json';
        const params = AppPreBootstrap.formatParams(options.data);

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        };

        if (options.type === 'GET') {
            xhr.open('GET', options.url + '?' + params, false);
            xhr.send(null);
        } else if (options.type === 'POST') {
            xhr.open('POST', options.url, false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
        }
    }
    private static formatParams(data) {
        const arr = [];
        for (const name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        arr.push(('v=' + Math.random()).replace('.', ''));
        return arr.join('&');
    }
}
