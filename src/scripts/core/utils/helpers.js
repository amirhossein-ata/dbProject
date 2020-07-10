import jmoment from "moment-jalaali";
const jalaaliMonths = {
  1: "فروردین",
  2: "اردیبهشت",
  3: "خرداد",
  4: "تیر",
  5: "مرداد",
  6: "شهریور",
  7: "مهر",
  8: "آبان",
  9: "آذر",
  10: "دی",
  11: "بهمن",
  12: "اسفند",
};
export function miladiTojalaaliDataParser(date, dateBased = false) {
  const jdate = jmoment(date, "YYYY/MM/DD hh:mm:ss");
  const month = jalaaliMonths[jdate.jMonth() + 1];
  const day = jdate.jDate();
  const hour = jdate.hour();
  const minutes = jdate.minute();
  if (dateBased) {
    return `${day} ${month}`;
  }
  return `${day} ${month} ${hour === 0 ? `${hour}0` : hour}:${
    minutes === 0 ? `${minutes}0` : minutes
  }`;
}
export function numberPersianParser(number) {
  let result = "";
  let stringNumber = number;
  const en_to_fa_map = {
    "0": "۰",
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
  };
  if (number !== undefined) {
    if (!isNaN(number)) {
      stringNumber = String(number);
    }
    for (let index = 0; index < stringNumber.length; index++) {
      const char = stringNumber[index];
      result = en_to_fa_map[char] ? result + en_to_fa_map[char] : result + char;
    }
  }
  return result;
}
export function dateParser(date) {
  const day = jmoment(date);
  if (!day.isValid()) {
    return date;
  }
  const now = jmoment();
  const diff_seconds = now.diff(day, "seconds");
  const diff_minute = now.diff(day, "minutes");
  const diff_hour = now.diff(day, "hours");
  const diff_day = now.diff(day, "days");
  console.log(diff_day, diff_hour, diff_minute, diff_minute);
  if (diff_seconds < 0) {
    return date;
  }
  if (diff_day >= 365) {
    return `${numberPersianParser(parseInt(diff_day / 365, 10))} سال قبل`;
  }
  if (diff_day >= 30) {
    return `${numberPersianParser(parseInt(diff_day / 30, 10))} ماه قبل`;
  }
  if (diff_day >= 7) {
    return `${numberPersianParser(parseInt(diff_day / 7, 10))} هفته قبل`;
  }
  if (diff_day >= 1) {
    return `${numberPersianParser(diff_day)} روز قبل`;
  }
  if (diff_hour >= 1) {
    return `${numberPersianParser(diff_hour)} ساعت قبل`;
  }
  if (diff_minute >= 1) {
    return `${numberPersianParser(diff_minute)} دقیقه قبل`;
  }
  return `${numberPersianParser(diff_seconds)} ثانیه قبل`;
}
