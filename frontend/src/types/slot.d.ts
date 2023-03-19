
interface ExpandedTag {
  tag: Tag;
  selected: boolean;
}

interface IsSelectableParams {
  rowIndex: number;
  colIndex: number;
  openSlots: Session[] | null;
  currDate: Date;
}
interface IsClampParams {
  rowIndex: number;
  colIndex: number;
  currDate: Date;
  startTime: string;
  endTime: string;
}

type FunctionIsSelectable = (param: IsSelectableParams) => boolean;

interface SlotTableProps {
  currDate: Date;
  openSlots: Session[] | nulll;
  isSelectable: (param: IsSelectableParams) => boolean
  selected: Set<number>;
  onSelect: (rowIndex: number, colIndex: number) => void;
}

type HandleSelect = (rowIndex: number, colIndex: number) => void;

interface SlotTableBodyProps {
  currDate: Date;
  openSlots: Session[] | null;
  isSelectable: FunctionIsSelectable;
  selected: Set<number>;
  onSelect: (rowIndex: number, colIndex: number) => void;
}

interface SlotTableRowProps {
  rowIndex: number;
  currDate: Date;
  selected: Set<number>;
  handleSelect: HandleSelect;
  openSlots: Session[] | null;
  isSelectable: FunctionIsSelectable;
}

interface TileProps {
  rowIndex: number;
  colIndex: number;
  handleSelect: HandleSelect;
  state: number;
}

interface SlotHeaderProps {
  currDate: Date;
}

type HandleSelect = (rowIndex: number, colIndex: number) => void;