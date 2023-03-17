import React, { useState } from 'react';
import './SlotTable.css';
import { getHeaderStr, getString, setState, setTileClass, TILE_STATE, updateSelected } from './slotTableUtils';

export default function SlotTable(
  {
    currDate,
    openSlots,
    isSelectable,
    selected,
    onSelect,
}: SlotTableProps)
{
  console.log(openSlots);
  return (
    <div className='tableContainer'>
      <table className="slotTable">
        <SlotTableHeaders currDate={currDate} />
        <SlotTableBody
          currDate={currDate}
          openSlots={openSlots}
          isSelectable={isSelectable}
          selected={selected}
          onSelect={onSelect}
        />
      </table>
    </div>
  );
}

function SlotTableHeaders({ currDate }: SlotHeaderProps) {
  const year = currDate.getFullYear();
  const month = currDate.getMonth();
  const date = currDate.getDate();

  return (
    <thead>
      <tr>
        <th className='tableHeader'></th>
        {Array.from({ length: 7 }).map((_, index) => (
          <th key={index} className='tableHeader'>
            {getString(new Date(year, month, (Number(date) + index)))}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function SlotTableBody(
  {
    currDate,
    openSlots,
    isSelectable,
    selected,
    onSelect,
}: SlotTableBodyProps) {
  
  return (
    <tbody>
      {Array.from({ length: 48 }).map((_, rowIndex) => (
        <SlotTableRow
          key={rowIndex}
          rowIndex={rowIndex}
          currDate={currDate}
          selected={selected}
          handleSelect={onSelect}
          openSlots={openSlots}
          isSelectable={isSelectable}
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
  isSelectable,
}: SlotTableRowProps) {
  return (
    <tr className='tableBody'>
      <RowHeader str={getHeaderStr(rowIndex)} />
      {Array.from({ length: 7 }).map((_, colIndex) => (
        <Tile
          key={colIndex}
          rowIndex={rowIndex}
          colIndex={colIndex}
          state={setState(rowIndex, colIndex, currDate, openSlots, selected, isSelectable)}
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
}: TileProps) {
  // state & TILE_STATE.ELAPSED : 이미 시간이 지나서 css를 회색으로 부여 & 클릭 이벤트 없음
  // state & TILE_STATE.SLOTS : 초기값으로 아마 넘어올, 이전에 선택된 형태
  // state & TILE_STATE.SELECTABLE : SLOTS 여부에 상관없이, 그 상황에서 선택할 수 있는 곳.
  // state & TILE_STATE.SELECTED :
  const className = setTileClass(state);
  return state & TILE_STATE.SELECTABLE ? (
    <td
      className={className}
      onClick={() => handleSelect(rowIndex, colIndex)}
    ></td>
  ) : (
    <td className={className}></td>
  );
}
