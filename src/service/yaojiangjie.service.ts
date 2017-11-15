import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AppConsts } from '../app/AppConsts';

@Injectable()
export class YaojiangjieService {
    exhibitionInfo: any;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    constructor(
        private _http: Http
    ) {

    }

    getDetailInfo(path, callback) {
        AppConsts.appLanguage == undefined ? AppConsts.appLanguage = localStorage.getItem("language") : AppConsts.appLanguage;
        const url = `/assets/data/${AppConsts.appLanguage}/${path.part}/${path.page}.json`;

        this.ajax({
            url: url,
            type: "get",
            data: "",
            dataType: "json",
            success: function (res, xml) {
                if (callback) {
                    callback(JSON.parse(res));
                }
            },
            fail: function () {
            }
        })
    }

    getExhibitionInfo(callback) {
        AppConsts.appLanguage == undefined ? AppConsts.appLanguage = localStorage.getItem("language") : AppConsts.appLanguage;
        const url = `/assets/data/${AppConsts.appLanguage}/exhibition_info.json`;

        this.ajax({
            url: url,
            type: "get",
            data: "",
            dataType: "json",
            success: function (res, xml) {
                if (callback) {
                    callback(JSON.parse(res));
                }
            },
            fail: function () {
            }
        })
    }

    private ajax(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        let params = this.formatParams(options.data);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
    private formatParams(data) {
        let arr = [];
        for (let name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }
}