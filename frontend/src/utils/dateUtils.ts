// 보통 형식 => "2023-03-18T10:00:00"
export const getShortDate = (s: string) => s.slice(0, s.lastIndexOf(":")).replace("T", " ")
export const getIntervalDateString = (targetDate: Date, currDate: Date) => {
  const intervals = {
    days: Math.floor((targetDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24)),
    hours: Math.floor((targetDate.getTime() - currDate.getTime()) / (1000 * 60 * 60)),
    minutes: Math.floor((targetDate.getTime() - currDate.getTime()) / (1000 * 60)),
  }
  if (intervals.days !== 0) {
    return `${intervals.days}일 후`
  } else if (intervals.hours !== 0 ) {
    return `${intervals.hours}시간 후`
  } else if (intervals.minutes) {
    return `${intervals.minutes}분 후`
  } else {
    return `now`;
  }
}