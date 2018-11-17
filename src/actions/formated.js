const month = [ 'января', 'февраля', 'марта', 'фпреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
// const month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
//******************
// ****TYPE FORMAT**
// *****************

// USE - > formated('10,10,2017', 'YY-DD-MM')

// YY-DD-MM   - 2017-10-09
// DD,MM,YY   - 10,09,2017
// YY.MM.DD   - 2017.09.10
// YY m DD    - 2017 октября 10
// time       - 00:00


export function formated(date, type){
    let x = new Date(date);
    let D = {};
    let simbol = '';
    let day = '';
    let d;
    if(type.indexOf('time') + 1 > 0){
        d = {
            hours: x.getHours(),
            minutes: x.getMinutes(),
        };
        for (let n in d) {
            D[n] = (parseInt(d[n], 10) < 10 ) ? ('0'+d[n]) : (d[n]);
        }
        let time = D.hours + ':' + D.minutes;
        return time;
    }else{
        if(!type){
            return false
        }else if(type.indexOf('-') > 0){
            simbol = '-';
        }else if (type.indexOf('.') > 0){
            simbol = '.';
        }else if (type.indexOf(',') > 0){
            simbol = ',';
        }else if (type.indexOf(' ') > 0){
            simbol = ' ';
        }
        d = {
            day: x.getDate(),
            month: (type.indexOf('MM')+1 > 0 ? x.getMonth() : month[x.getMonth()]),
            year: x.getFullYear()
        };
        let arrData = type.split(simbol);
        for (let n in d) {
            D[n] = (parseInt(d[n], 10) < 10 ) ? ('0'+d[n]) : (d[n]);
        }
        arrData.map((el, i)=>{
            switch (el) {
                case 'YY':
                    day = day + D.year + (i<2 ? simbol : '');
                    break;
                case 'MM':
                    day = day + D.month + (i<2 ? simbol : '');
                    break;
                case 'DD':
                    day = day + D.day + (i<2 ? simbol : '');
                    break;
                case 'm':
                    day = day + D.month + (i<2 ? simbol : '');
                    break;
                default:
                    return false;
                    break;
            }
        });
        return day;
    }
}