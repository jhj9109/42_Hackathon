import React, { useState } from 'react';

const TEXT_COLOR = "#02c4c7";

const TILE_WIDTH = "90px";

const RAW_HEADER_WIDTH = "87px";

const TILE_WIDTH_PERCENT = 11.5;

const ADJUSTMENT_MINUTES = 15;

const myStyle = {
  // width: TILE_WIDTH,
  // color: TEXT_COLOR,
}

const tableContainerStyle = {
  margin: "0 30px",
}

const tableStyle = {
  // Text
  color: TEXT_COLOR,
  width: "100%",// 양옆 꽉차도록
  borderCollapse: "collapse" as any,//보더간 경계는 하나
  border: "1px gray solid",//테이블테두리
  borderSpacing: "0px",//셀간 간격
  whiteSpace: "nowrap" as any,//텍스트크기로 인해 줄바꿈 생기는것 방지
}

const tableHeaderStyle = {
  // 날짜가 적히는 첫 라인. 높이는 글자 크기에 의존한다.
  border: "1px #ddd solid",//테이블헤드테두리
}

const tableBodyStyle = {
  height: "1.5rem",
  // border: "1px gray solid",//바디라인별테두리
}

const rowHeaderStyle = {
  width: `${100 - TILE_WIDTH_PERCENT * 7}%`,
  padding: "4px 24px",
  border: "1px #ddd solid",//바디라인별 헤드의 테두리
}
const tileStyle = {
  border: "1px #ddd solid",//바디라인별 타일별의 테두리
  width: `${TILE_WIDTH_PERCENT}%`,
};

const dayString: { [key: string]: string} = {
  0: "Mon",
  1: "Tue",
  2: "Wed",
  3: "Thu",
  4: "Fri",
  5: "Sat",
  6: "Sun",
}

const TILE_STATE = {
  ELAPSED: 1 << 0,
  SLOTS: 1 << 1,
  SELECTABLE: 1 << 2,
  SELECTED: 1 << 3,
}

const getDayString = (day: number) => dayString[day % 7];
const getHeaderStr = (rowIndex: number) =>
  rowIndex % 2 ? "" : `${rowIndex / 2}:00` + (rowIndex > 24 ? " pm" : " am" )
const getString = (date: Date) => `${getDayString(date.getDay())} ${date.toLocaleDateString(
  'ko-kr', {month: 'numeric', day: 'numeric' })
  .replace(". ", "/").replace(".", "")}`

export default function FT_Table() {
  const currDate = new Date()
  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <SlotTableHeaders currDate={currDate}/>
        <SlotTableBody currDate={currDate}/>
      </table>
    </div>
  );
}

function SlotTableHeaders({currDate}: {currDate: Date}) {
  const year = currDate.getFullYear();
  const month = currDate.getMonth();
  const date = currDate.getDate();
  
  return (
    <thead>
      <tr style={tableHeaderStyle}>
        <th style={myStyle}></th>
        {Array.from({ length: 7 }).map((_, index) => (
        <th key={index} style={myStyle}>
          {getString(new Date(year, month, date + index))}
        </th>
        ))}
      </tr>
    </thead>
  )
}
type HandleSelect = (rowIndex: number, colIndex: number) => void

const updateSelected = function <T>(prev: Set<T>, el: T) {
  const newSet = new Set(prev)
  if (!newSet.delete(el)) {
    newSet.add(el)
  }
  return newSet;
}
function SlotTableBody({currDate}: {currDate: Date}) {
  const [selected, setSelected] = useState(() => new Set<number>());
  const handleSelect = (rowIndex: number, colIndex: number) => 
    setSelected(prev => {
      console.log(prev, updateSelected(prev, rowIndex + colIndex * 48));
      return updateSelected(prev, rowIndex + colIndex * 48);
    })
  return (
    <tbody>
      {Array.from({ length: 48 }).map((_, rowIndex) => (
        <SlotTableRow key={rowIndex} rowIndex={rowIndex} currDate={currDate} selected={selected} handleSelect={handleSelect}/>
      ))}
    </tbody>
  )
}

function SlotTableRow({rowIndex, currDate, selected, handleSelect}: {rowIndex: number, currDate: Date, selected: Set<number>, handleSelect: HandleSelect}) {
  const firstCell = currDate.getHours() * 2 + Math.ceil((currDate.getMinutes() + ADJUSTMENT_MINUTES ) / 30);
  const setState = (rowIndex: number, colIndex: number): number =>  {
    const i = rowIndex + colIndex * 48;
    let state = 0;
    if (colIndex === 0 && rowIndex < firstCell) {
      state |= TILE_STATE.ELAPSED
      return state;
    }
    // 일단은 전부 셀렉터블
    state |= TILE_STATE.SELECTABLE
    // 셀렉트 여부
    if (selected.has(i)) {
      state |= TILE_STATE.SELECTED
    }
    // 슬록 여부는 아직.
    return state
  }
  return (
    <tr style={tableBodyStyle}>
      <RowHeader str={getHeaderStr(rowIndex)}/>
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
  )
}

function RowHeader({str}: {str: string}) {
  return (
    <td style={rowHeaderStyle}>{str}</td>
  )
}

function Tile({
  rowIndex, colIndex, handleSelect, state
  }:
  {
    rowIndex: number, colIndex: number, handleSelect: HandleSelect, state: number
  }) {

    // state & TILE_STATE.ELAPSED : 이미 시간이 지나서 css를 회색으로 부여 & 클릭 이벤트 없음
    // state & TILE_STATE.SLOTS : 초기값으로 아마 넘어올, 이전에 선택된 형태
    // state & TILE_STATE.SELECTABLE : SLOTS 여부에 상관없이, 그 상황에서 선택할 수 있는 곳.
    // state & TILE_STATE.SELECTED : 
  const background = state & TILE_STATE.ELAPSED ? "gray" : state & TILE_STATE.SELECTED ? "blue" : "white";
  // console.log(rowIndex, colIndex, state, state & TILE_STATE.ELAPSED)
  return (
    state & TILE_STATE.ELAPSED
    ? <td style={{...tileStyle, background}}></td>
    : <td style={{...tileStyle, background}} onClick={() => handleSelect(rowIndex, colIndex)}></td>
  )
}
