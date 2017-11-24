import { MediaCompressFormat } from 'shared/AppConsts';

export class PictureUrlHelper {
    static getCompressUrl(url: string, compressProt: string): string {
        return url === '' ? url : url + '?' + compressProt;
    }

    static getBookingPicCompressUrl(url: string): string {
        return url === '' ? url : url + '?' + MediaCompressFormat.bookingPictureFormat;
    }

    static getTimelinePicCompressUrl(url: string): string {
        return url === '' ? url : url + '?' + MediaCompressFormat.timelinePictureFormat;
    }

    static getOutletPicCompressUrl(url: string): string {
        return url === '' ? url : url + '?' + MediaCompressFormat.outletPictureFormat;
    }
}