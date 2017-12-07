// 设置进入页面的启动加载页面，替换Abp框架的Loading动画
// tslint:disable-next-line:class-name
export class appLoadingBusy {
    static effectTitle = '要讲解';
    static effectText = '知晓世界 领略美好';
    static setBusy(): void {
        let bodyEle = $('body');
        let content = $('<div></div>').addClass('content');
        let effectTextEle = $('<p></p>').addClass('effect-text-wrap').text(appLoadingBusy.effectText);
        let effectTitleEle = $('<h1></h1>').addClass('effect-title-wrap').text(appLoadingBusy.effectTitle);
        let loadingAniWrap = $('<div></div>').addClass('loading-wrap');
        let loadingSpinner = $('<div class="spinner"><i></i></div>');
        let imgLogo = $('<img width="100%">').addClass('logo').attr('src', '/assets/common/images/admin/logo.png');
        imgLogo.attr('width', '96px');
        let appLoadingBusyWrap = $('<div></div>').addClass('app-loading-busy-wrap');

        bodyEle.append(appLoadingBusyWrap);
        appLoadingBusyWrap.append(content);
        content.append(imgLogo);
        content.append(effectTitleEle);
        content.append(effectTextEle);
        appLoadingBusyWrap.append(loadingAniWrap);
        loadingAniWrap.append(loadingSpinner);
    }

    static clearBusy(): void {
        $('.app-loading-busy-wrap').remove();
    }
}
