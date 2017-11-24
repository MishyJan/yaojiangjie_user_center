


export class DatetimeHelper {
    static localDatetime(utcDatetime: string): string {
        const localDatetimeString = moment.utc(utcDatetime).local().format('YYYY-MM-DD HH:mm:ss');
        return localDatetimeString;
    }
}
