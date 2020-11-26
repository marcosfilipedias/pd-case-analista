export class DateParse{

    public myDateParser(dateStr : string) : string {
        let date = dateStr.substring(0, 10);
        let time = dateStr.substring(11, 19);
        let millisecond = dateStr.substring(20)
        let validDate = date + 'T' + time + '.' + millisecond;
        console.log(validDate)
        return validDate
    }
}