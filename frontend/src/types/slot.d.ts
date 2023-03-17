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

type FunctionIsSelectable = (param: IsSelectableParams) => boolean;

interface SlotTableProps {
  currDate: Date;
  openSlots: Session[];
  isSelectable: (param: IsSelectableParams) => boolean
}

type HandleSelect = (rowIndex: number, colIndex: number) => void;

interface SlotTableBodyProps {
  currDate: Date;
  openSlots: Session[];
  isSelectable: FunctionIsSelectable;
  selected?: Set<number>;
  onSelect?: (rowIndex: number, colIndex: number) => void;
}

interface SlotTableRowProps {
  rowIndex: number;
  currDate: Date;
  selected: Set<number>;
  handleSelect: HandleSelect;
  openSlots: Session[];
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