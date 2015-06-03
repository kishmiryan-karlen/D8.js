;
(function(global) {
    'use strict';

    var supportedFlags = 'dDjlNSWFmMntLoYyaABgGhHisueIOPTZcrU'.split('');

    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var days = {
        'Mon': {
            fullName: 'Monday',
            isoNumber: 1
        },

        'Tue': {
            fullName: 'Tuesday',
            isoNumber: 2
        },

        'Wed': {
            fullName: 'Wednesday',
            isoNumber: 3
        },

        'Thu': {
            fullName: 'Thursday',
            isoNumber: 4
        },

        'Fri': {
            fullName: 'Friday',
            isoNumber: 5
        },

        'Sat': {
            fullName: 'Saturday',
            isoNumber: 6
        },

        'Sun': {
            fullName: 'Sunday',
            isoNumber: 7,
            number: 0
        }
    };

    global.D8 = function D8() {
        var currentDate = new Date();

        if (typeof arguments[0] === 'string') {
            var parts = arguments[0].split(':');
        }

        function getDayOfYear() {
            var start = new Date(currentDate.getFullYear(), 0, 0),
                diff = currentDate - start,
                oneDay = 1000 * 60 * 60 * 24,
                day = Math.floor(diff / oneDay);

            return day - 1;
        }

        function getWeekOfYear() {
            var date = new Date(+currentDate);
            date.setHours(0, 0, 0);
            date.setDate(date.getDate() + 4 - (date.getDay() || 7));
            return Math.ceil((((date - new Date(date.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
        }

        function getNumberOfDaysOfMonth() {
            var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            return date.getDate();
        }

        function isLeapYear() {
            var year = currentDate.getFullYear();
            return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        }

        function getAmPm() {
            return currentDate.getHours() > 12 ? 'pm' : 'am';
        }
 
        function getPartValue(part) {
            switch (part) {
                case 'd':
                    var day = currentDate.getDay();
                    return day < 10 ? '0' + day : day;
                case 'D':
                    return currentDate.toString().substr(0, 3);
                case 'j':
                    return currentDate.getDate();
                case 'l':
                    var shortName = currentDate.toString().substr(0, 3);
                    return days[shortName].fullName;
                case 'N':
                    var shortName = currentDate.toString().substr(0, 3);
                    return days[shortName].isoNumber;
                case 'S':
                    return 's';
                case 'W':
                    return currentDate.getDay();
                case 'Z':
                    return getDayOfYear();
                case 'W':
                    return getWeekOfYear();
                case 'F':
                    return months[currentDate.getMonth() - 1];
                case 'm':
                    var monthNumber = currentDate.getMonth();
                    return monthNumber < 10 ? '0' + monthNumber : monthNumber;
                case 'M':
                    return months[currentDate.getMonth() - 1].substr(0, 3);
                case 'n':
                    return currentDate.getMonth();
                case 't':
                    return getNumberOfDaysOfMonth();
                case 'L':
                    return +isLeapYear();
                case 'o':
                    return 'o';
                case 'Y':
                    return currentDate.getFullYear();
                case 'y':
                    return currentDate.getFullYear().toString().substr(-2);
                case 'a':
                    return getAmPm();
                case 'A':
                    return getAmPm().toUpperCase();
                case 'B':
                    return 'B';
                case 'g':
                    return currentDate.getHours() % 12;
                case 'G':
                    return currentDate.getHours();
                case 'h':
                    var hours = currentDate.getHours() % 12;
                    return hours < 10 ? '0' + hours : hours;
                case 'H':
                    var hours = currentDate.getHours();
                    return hours < 10 ? '0' + hours : hours;
                case 'i':
                    var minutes = currentDate.getMinutes();
                    return minutes < 10 ? '0' + minutes : minutes;
                case 's':
                    var seconds = currentDate.getSeconds();
                    return seconds < 10 ? '0' + seconds : seconds;
                case 'u':
                    return 'u';
                case 'e':
                    var leftParenIndex = currentDate.toString().indexOf('('),
                        rightParenIndex = currentDate.toString().indexOf(')');

                    return currentDate.toString().substring(leftParenIndex + 1, rightParenIndex);
            }
        }

        return {
            get: function() {
                return currentDate;
            },

            format: function(formatStr) {
                if (typeof formatStr !== 'string') {
                    throw new Error('Invalid format');
                }

                var formatted = [],
                    formatArr = formatStr.split('');

                for (var i = 0, l = formatArr.length; i < l; i++) {
                    if (formatArr[i] === '/') {
                        formatted.push(formatArr[i + 1]);
                        i++;
                        continue;
                    }

                    if (supportedFlags.indexOf(formatArr[i]) > -1) {
                        formatted.push(getPartValue(formatArr[i]));
                    } else {
                        formatted.push(formatArr[i]);
                    }
                }

                return formatted.join('');
            }
        }
    };

})(window);