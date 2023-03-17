import React, { useState } from 'react';
import './SlotTable.css';

// const TEXT_COLOR = '#02c4c7';
const ADJUSTMENT_MINUTES = 15;

const dayString: { [key: string]: string } = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
};

const TILE_STATE = {
  ELAPSED: 1 << 0,
  SLOTS: 1 << 1,
  SELECTABLE: 1 << 2,
  SELECTED: 1 << 3,
};

interface Tag {
  tagId: number;
  tagName: string;
}
interface Session {
  sessionId : number;
  startTime: string;
  endTime: string;
  tags: Tag[];
}
interface IsSelectableParams {
  rowIndex: number;
  colIndex: number;
  openSlots: Session[];
  currDate: Date;
}
interface IsClampParams {
  rowIndex: number;
  colIndex: number;
  currDate: Date;
  startTime: string;
  endTime: string;
}

interface SlotTableProps {
  currDate: Date;
  openSlots: Session[];
  isSeletable: (param: IsSelectableParams) => boolean
}


type HandleSelect = (rowIndex: number, colIndex: number) => void;
const updateSelected = function <T>(prev: Set<T>, el: T) {
  const newSet = new Set(prev);
  if (!newSet.delete(el)) {
    newSet.add(el);
  }
  return newSet;
};

const getDayString = (day: number) => dayString[day % 7];
const getHeaderStr = (rowIndex: number) =>
  rowIndex % 2 ? '' : `${rowIndex / 2}:00` + (rowIndex > 24 ? ' pm' : ' am');
const getString = (date: Date) =>
  `${getDayString(date.getDay())} ${date
    .toLocaleDateString('ko-kr', { month: 'numeric', day: 'numeric' })
    .replace('. ', '/')
    .replace('.', '')}`;


    const utcOffset = 9 * 60 * 60 * 1000; // UTC+9
    const getKstDate = (date: Date) => new Date(date.getTime() + utcOffset)
    
    const isClamp = ({rowIndex, colIndex, currDate, startTime, endTime}: IsClampParams) => {
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
    

const isSlot = ({rowIndex, colIndex, openSlots, currDate}: IsSelectableParams) =>
  openSlots.some(session => isClamp({rowIndex, colIndex, currDate, startTime: session.startTime, endTime:session.endTime}))

export default function SlotTable({currDate, openSlots, isSeletable}: SlotTableProps) {
  // 지난 시간.
  // 열린 슬롯.
  // 셀렉터블.
  console.log(openSlots);
  return (
    <div className='tableContainer'>
      <table className="slotTable">
        <SlotTableHeaders currDate={currDate} />
        <SlotTableBody currDate={currDate} openSlots={openSlots}/>
      </table>
    </div>
  );
}

function SlotTableHeaders({ currDate }: { currDate: Date }) {
  const year = currDate.getFullYear();
  const month = currDate.getMonth();
  const date = currDate.getDate();

  return (
    <thead>
      <tr>
        <th className='tableHeader'></th>
        {Array.from({ length: 7 }).map((_, index) => (
          <th key={index} className='tableHeader'>
            {getString(new Date(year, month, date + index))}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function SlotTableBody({ currDate, openSlots }: { currDate: Date, openSlots: Session[] }) {
  const [selected, setSelected] = useState(() => new Set<number>());
  const handleSelect = (rowIndex: number, colIndex: number) =>
    setSelected((prev) => {
      console.log(prev, updateSelected(prev, rowIndex + colIndex * 48));
      return updateSelected(prev, rowIndex + colIndex * 48);
    });
  return (
    <tbody>
      {Array.from({ length: 48 }).map((_, rowIndex) => (
        <SlotTableRow
          key={rowIndex}
          rowIndex={rowIndex}
          currDate={currDate}
          selected={selected}
          handleSelect={handleSelect}
          openSlots={openSlots}
        />
      ))}
    </tbody>
  );
}

function SlotTableRow({
  rowIndex,
  currDate,
  selected,
  handleSelect,
  openSlots,
}: {
  rowIndex: number;
  currDate: Date;
  selected: Set<number>;
  handleSelect: HandleSelect;
  openSlots: Session[];
}) {
  const firstCell =
    currDate.getHours() * 2 +
    Math.ceil((currDate.getMinutes() + ADJUSTMENT_MINUTES) / 30);
  const setState = (rowIndex: number, colIndex: number): number => {
    const i = rowIndex + colIndex * 48;
    let state = 0;
    if (colIndex === 0 && rowIndex < firstCell) {
      state |= TILE_STATE.ELAPSED;
      return state;
    }
    // 일단은 전부 셀렉터블
    state |= TILE_STATE.SELECTABLE;
    // 셀렉트 여부
    if (selected.has(i)) {
      state |= TILE_STATE.SELECTED;
    }
    // 슬록 여부
    if (isSlot({rowIndex, colIndex, openSlots, currDate})) {
      state |= TILE_STATE.SLOTS;
    }
    return state;
  };
  return (
    <tr className='tableBody'>
      <RowHeader str={getHeaderStr(rowIndex)} />
      {Array.from({ length: 7 }).map((_, colIndex) => (
        <Tile
          key={colIndex}
          rowIndex={rowIndex}
          colIndex={colIndex}
          state={setState(rowIndex, colIndex)}
          handleSelect={handleSelect}
        />
      ))}
    </tr>
  );
}

function RowHeader({ str }: { str: string }) {
  return <td className='rowHeader'>{str}</td>;
}

function Tile({
  rowIndex,
  colIndex,
  handleSelect,
  state,
}: {
  rowIndex: number;
  colIndex: number;
  handleSelect: HandleSelect;
  state: number;
}) {
  // state & TILE_STATE.ELAPSED : 이미 시간이 지나서 css를 회색으로 부여 & 클릭 이벤트 없음
  // state & TILE_STATE.SLOTS : 초기값으로 아마 넘어올, 이전에 선택된 형태
  // state & TILE_STATE.SELECTABLE : SLOTS 여부에 상관없이, 그 상황에서 선택할 수 있는 곳.
  // state & TILE_STATE.SELECTED :
  const className = 'tile ' + (state & TILE_STATE.ELAPSED
    ? 'elapsed'
    : state & TILE_STATE.SELECTED
    ? 'selected'
    : '');
  return state & TILE_STATE.ELAPSED ? (
    <td className={className}></td>
  ) : (
    <td
      className={className}
      onClick={() => handleSelect(rowIndex, colIndex)}
    ></td>
  );
}
