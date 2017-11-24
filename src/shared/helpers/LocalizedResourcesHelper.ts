﻿import * as _ from 'lodash';
import * as rtlDetect from 'rtl-detect';

export class LocalizedResourcesHelper {

    static loadResources(callback: () => void): void {
        $.when(LocalizedResourcesHelper.loadLocalizedStlyes(), LocalizedResourcesHelper.loadLocalizedScripts()).done(() => {
            callback();
        });
    }

    private static loadLocalizedStlyes(): JQueryPromise<any> {
        const isRtl = rtlDetect.isRtlLang(abp.localization.currentLanguage.name);
        let cssPostfix = '';

        if (isRtl) {
            cssPostfix = '-rtl';
            $('html').attr('dir', 'rtl');
        }
        return;
        // return $.Deferred().resolve();
    }

    private static loadLocalizedScripts(): JQueryPromise<any> {
        if (!abp.session.userId) {
            // return $.Deferred().resolve();
        }

        const currentCulture = abp.localization.currentLanguage.name;

        // const bootstrapSelect = '/assets/localization/bootstrap-select/defaults-{0}.js';
        // const jqueryTimeago = '/assets/localization/jquery-timeago/jquery.timeago.{0}.js';

        return $.when(
            // jQuery.getScript(abp.utils.formatString(bootstrapSelect, LocalizedResourcesHelper.findBootstrapSelectLocalization(currentCulture))),
            // jQuery.getScript(abp.utils.formatString(jqueryTimeago, currentCulture))
        );
    }

    private static findBootstrapSelectLocalization(currentCulture: string): string {
        const supportedCultures = ['ar_AR',
            'bg_BG',
            'cs_CZ',
            'da_DK',
            'de_DE',
            'en_US',
            'es_CL',
            'eu',
            'fa_IR',
            'fi_FI',
            'fr_FR',
            'hu_HU',
            'id_ID',
            'it_IT',
            'ko_KR',
            'nb_NO',
            'nl_NL',
            'pl_PL',
            'pt_BR',
            'pt_PT',
            'ro_RO',
            'ru_RU',
            'sk_SK',
            'sl_SL',
            'sv_SE',
            'tr_TR',
            'ua_UA',
            'zh_CN',
            'zh_TW'];

        const foundCultures = _.filter(supportedCultures, sc => sc.indexOf(currentCulture) === 0);
        if (foundCultures && foundCultures.length > 0) {
            return foundCultures[0];
        }

        return 'en_US';
    }
}