
// const TEXT_COLOR = '#02c4c7';
export const ADJUSTMENT_MINUTES = 15;

export const dayString: { [key: string]: string } = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
};

export const TILE_STATE = {
  ELAPSED: 1 << 0,
  SLOTS: 1 << 1,
  SELECTABLE: 1 << 2,
  SELECTED: 1 << 3,
};

export const updateSelected = function <T>(prev: Set<T>, el: T) {
  const newSet = new Set(prev);
  if (!newSet.delete(el)) {
    newSet.add(el);
  }
  return newSet;
};

export const getDayString = (day: number) => dayString[day % 7];
export const getHeaderStr = (rowIndex: number) =>
  rowIndex % 2 ? '' : `${rowIndex / 2}:00` + (rowIndex > 24 ? ' pm' : ' am');
export const getString = (date: Date) =>
  `${getDayString(date.getDay())} ${date
    .toLocaleDateString('ko-kr', { month: 'numeric', day: 'numeric' })
    .replace('. ', '/')
    .replace('.', '')}`;

export const utcOffset = 9 * 60 * 60 * 1000; // UTC+9
export const getKstDate = (date: Date) => new Date(date.getTime() + utcOffset)

export const isClamp = ({rowIndex, colIndex, currDate, startTime, endTime}: IsClampParams) => {
  // 2023-03-17T05:30:17.828Z

  const target = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      currDate.getDate() + colIndex,
      Math.floor(rowIndex / 2),
      (rowIndex % 2) * 30
    );
  const start = new Date(startTime)
  const end = new Date(endTime)
  
  const [sTime, tTime, eTime] = [
    start.getTime() / (60 * 1000),
    target.getTime() / (60 * 1000),
    end.getTime() / (60 * 1000)
  ]
  
  return (sTime <= tTime && tTime <= eTime);
}
    

export const isSlot = ({rowIndex, colIndex, openSlots, currDate}: IsSelectableParams) =>
  openSlots.some(session => isClamp({rowIndex, colIndex, currDate, startTime: session.startTime, endTime:session.endTime}))

export const notSlot = ({rowIndex, colIndex, openSlots, currDate}: IsSelectableParams) =>
  !isSlot({rowIndex, colIndex, openSlots, currDate});

export const isElapsed = (rowIndex: number, colIndex: number, currDate: Date) =>
  colIndex === 0 && rowIndex < (currDate.getHours() * 2 + Math.ceil((Number(currDate.getMinutes()) + ADJUSTMENT_MINUTES) / 30));
export const setState = (
  rowIndex: number, colIndex: number, currDate: Date, openSlots: Session[], selected: Set<number>, isSelectable: FunctionIsSelectable): number => {
  const i = rowIndex + colIndex * 48;
  let state = 0;
  if (isElapsed(rowIndex, colIndex, currDate)) {
    state |= TILE_STATE.ELAPSED;
    return state;
  } else {
    // 일단은 전부 셀렉터블
    if (isSelectable({rowIndex, colIndex, openSlots, currDate})) {
      state |= TILE_STATE.SELECTABLE;
    }
    // 셀렉트 여부
    if (selected.has(i)) {
      state |= TILE_STATE.SELECTED;
    }
    // 슬록 여부
    if (isSlot({rowIndex, colIndex, openSlots, currDate})) {
      state |= TILE_STATE.SLOTS;
    }
  }
  return state;
};

export const setTileClass = (state: number) => {
  let className = 'tile';
  if (state & TILE_STATE.ELAPSED) {
    className += ' elapsed';
    return className;
  }
  if (state & TILE_STATE.SELECTED) {
    className += ' selected';
  }
  if (state & TILE_STATE.SLOTS) {
    className += ' slot'
  }
  return className;
}

export const sampleOpenSlots: Session[] = [
  {
    sessionId: 1,
    startTime: "2023/03/18/09:00",
    endTime: "2023/03/18/12:00",
    tags: [{tagId: 1, tagName: "libft"}]},
  {
    sessionId: 2,
    startTime: "2023/03/18/15:00",
    endTime: "2023/03/18/18:00",
    tags: [{tagId: 2, tagName: "gnl"}]},
]
