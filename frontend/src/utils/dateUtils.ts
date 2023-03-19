// 보통 형식 => "2023-03-18T10:00:00"
export const getShortDate = (s: string) => s.slice(0, s.lastIndexOf(":")).replace("T", " ")
export const getIntervalDateString = (targetDate: Date, currDate: Date) => {
  let isElpased = false;
  let intervalTime = targetDate.getTime() - currDate.getTime();
  if (intervalTime <= 0) {
    isElpased = true;
    intervalTime *= -1;
  }
  const intervals = {
    days: Math.floor(intervalTime / (1000 * 60 * 60 * 24)),
    hours: Math.floor(intervalTime / (1000 * 60 * 60)),
    minutes: Math.floor(intervalTime / (1000 * 60)),
  }
  if (intervals.days !== 0) {
    return `${intervals.days}일 ${isElpased ? "전" : "후"}`
  } else if (intervals.hours !== 0 ) {
    return `${intervals.hours}시간 ${isElpased ? "전" : "후"}`
  } else if (intervals.minutes) {
    return `${intervals.minutes}분 ${isElpased ? "전" : "후"}`
  } else {
    return `now`;
  }
}