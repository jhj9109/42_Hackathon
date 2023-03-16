import React, { useState } from 'react';
import './SlotTable.css';

const TEXT_COLOR = '#02c4c7';

const TILE_WIDTH = '90px';

const RAW_HEADER_WIDTH = '87px';

const TILE_WIDTH_PERCENT = 11.5;

const ADJUSTMENT_MINUTES = 15;

const myStyle = {
  // width: TILE_WIDTH,
  // color: TEXT_COLOR,
};

const tableContainerStyle = {
  width: "100%",
};

const tableStyle = {
  // Text
  color: TEXT_COLOR,
  width: '100%', // 양옆 꽉차도록
  borderCollapse: 'collapse' as any, // 보더간 경계는 하나
  border: '0.0625rem gray solid', // 테이블테두리
  borderSpacing: '0px', // 셀간 간격
  // nowrap으로 인해 칸의 크기가 변형 되어서 삭제 => 차라리 줄 바꿈이 나음
};

const tableHeaderStyle = {
  // 날짜가 적히는 첫 라인. 높이는 글자 크기에 의존한다.
  border: '0.0625rem #ddd solid', // 테이블헤드테두리
  textAlign: "center" as any,
  verticalAlign: "middle",
};

const tableBodyStyle = {
  height: '3vh',
  // border: "1px gray solid",// 바디라인별테두리
};

const rowHeaderStyle = {
  whiteSpace: "nowrap" as any,
  textAlign: "center" as any,
  verticalAlign: "middle",
  width: `${100 - TILE_WIDTH_PERCENT * 7}%`,
  padding: '0.0625rem 0.5rem',
  border: '0.0625rem #ddd solid', // 바디라인별 헤드의 테두리
};
const tileStyle = {
  border: '0.0625rem #ddd solid', // 바디라인별 타일별의 테두리
  width: `${TILE_WIDTH_PERCENT}%`,
};

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

const getDayString = (day: number) => dayString[day % 7];
const getHeaderStr = (rowIndex: number) =>
  rowIndex % 2 ? '' : `${rowIndex / 2}:00` + (rowIndex > 24 ? ' pm' : ' am');
const getString = (date: Date) =>
  `${getDayString(date.getDay())} ${date
    .toLocaleDateString('ko-kr', { month: 'numeric', day: 'numeric' })
    .replace('. ', '/')
    .replace('.', '')}`;

export default function SlotTable() {
  const currDate = new Date();
  return (
    <div className='tableContainer'>
      <table className="slotTable">
        <SlotTableHeaders currDate={currDate} />
        <SlotTableBody currDate={currDate} />
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
type HandleSelect = (rowIndex: number, colIndex: number) => void;

const updateSelected = function <T>(prev: Set<T>, el: T) {
  const newSet = new Set(prev);
  if (!newSet.delete(el)) {
    newSet.add(el);
  }
  return newSet;
};
function SlotTableBody({ currDate }: { currDate: Date }) {
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
}: {
  rowIndex: number;
  currDate: Date;
  selected: Set<number>;
  handleSelect: HandleSelect;
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
    // 슬록 여부는 아직.
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
