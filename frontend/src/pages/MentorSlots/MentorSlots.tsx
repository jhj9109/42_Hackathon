import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import SlotTable from '../../components/SlotTable/SlotTable';
import { isSlot, notSlot, sampleOpenSlots, updateSelected } from '../../components/SlotTable/slotTableUtils';

const ButtonContainer = styled.div`
  width: 100%;
  height: 6vh;
`;

const MenteeMentorSlotsStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`;

const Title = styled(Container)`
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border: 600;
`;

const Calrendar = styled.div`
  background-color: aliceblue;
  height: 75%;
  width: 100%;
  max-height: 55vh;
  overflow: auto;
`;

const MentoringContentContainer = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Tag = styled.div`
  width: 100%;
  text-align: start;
  font-size: 1.2rem;
  overflow-y: auto;
`;

const TagCheckBox = styled.div`
  display: inline-block;
  margin-right: 1rem;
  overflow-wrap: normal;
`

interface ExpandedTag {
  tag: Tag;
  selected: boolean;
}

// const convertExpandedTag = (tags: Tag[]): ExpandedTag[] => tags.map(tag => ({tag, selected: false}));
// const setInitialTags = () => convertExpandedTag(useRecoilValue(userInfoAtom2).tags)

const sampleExpandedTag: ExpandedTag[] = [
  { tag: {tagId: 1, tagName: "Libft"}, selected: true },
  { tag: {tagId: 2, tagName: "Gnl"}, selected: true },
  { tag: {tagId: 3, tagName: "33333333"}, selected: false },
  { tag: {tagId: 4, tagName: "44444444"}, selected: false },
  { tag: {tagId: 5, tagName: "55555555"}, selected: false },
  { tag: {tagId: 6, tagName: "666666666"}, selected: false },
  { tag: {tagId: 7, tagName: "77777777"}, selected: false },
  { tag: {tagId: 8, tagName: "88888888"}, selected: false },
  { tag: {tagId: 9, tagName: "99999999"}, selected: false },
  { tag: {tagId: 10, tagName: "101010101010101010"}, selected: false },
  { tag: {tagId: 11, tagName: "1111111111111111111"}, selected: false },
  { tag: {tagId: 13, tagName: "131313131313131313"}, selected: false },
  { tag: {tagId: 14, tagName: "14141414141414141"}, selected: false },
]

const isSubmitAvaiable = (tags: ExpandedTag[], selected: Set<number>) =>
  tags.some((t) => t.selected) && selected.size !== 0

const TagList = ({ tags, onChange }: {tags: ExpandedTag[], onChange: any}) => {
  return (
    <Tag>
      {tags.map(({tag, selected}) => (
        <TagCheckBox key={`${tag.tagId}-${Number(selected)}`}>
          <input
            type="checkbox"
            id={tag.tagName}
            name={tag.tagName}
            checked={selected}
            onChange={(e) => onChange(tag)}
          />
          <label htmlFor={tag.tagName}>{tag.tagName}</label>
        </TagCheckBox>
      ))}
    </Tag>
  )
}

const MenteeMentorSlots = () => {
  const navigator = useNavigate();
  const currDate = new Date();
  const [openSlots, setOpenSlots] = useState<Session[]>([])
  const [selected, setSelected] = useState(() => new Set<number>());
  const handleSelect = (rowIndex: number, colIndex: number) =>
    setSelected((prev) => updateSelected(prev, rowIndex + colIndex * 48))
  // const [tags, setTags] = useState(setInitialTags());
  const [tags, setTags] = useState(sampleExpandedTag); // TODO: for test
  const [submitAbled, setSubmitAbled] = useState(false);
  
  const onTagSelectedChange = (tag: Tag) => {
    setTags(prev =>
      prev.map(t =>
        t.tag.tagId === tag.tagId ? {...t, selected: !t.selected} : t))
  }

  const setToArr = function<T>(s: Set<T>) {
    const arr: T[] = [];
    const iter = s.values();
    for (let i = 0; i < s.size; i++) {
      arr.push(iter.next().value);
    }
    return arr;
  }
  const isContinuousSlot = (sortedSlot: number[]) => 
    sortedSlot.every((el, i, arr) => i === 0 || arr[i - 1] + 1 === el)
  
  
  const onSubmit = () => {
    if (!(isSubmitAvaiable(tags, selected))) {
      alert("올바르지 못한 시도입니다.");
      return;
    }
    const sorted = setToArr(selected).sort((a, b) => a -b);
    if (!isContinuousSlot(sorted)) {
      alert("연속된 슬롯만 가능합니다.");
      return;
    }
    const filterd = tags.filter(t => t.selected).map(t => t.tag);
    console.log("===============요청 보낼 데이터===============");
    console.log(sorted)
    console.log(filterd)
    console.log("=======================================")
  }
  useEffect(() => {
    setTimeout(() => setOpenSlots(sampleOpenSlots))
  })

  useEffect(() => {
    setSubmitAbled(tags.some((t) => t.selected) && selected.size !== 0);
  }, [tags, selected])
  
  return (
    <MenteeMentorSlotsStyle>
      <Title>멘토링 시간 선택</Title>
      <Calrendar>
        {!openSlots ? <div>로딩중</div>
          : <SlotTable
              currDate={currDate}
              openSlots={openSlots}
              isSelectable={notSlot}
              selected={selected}
              onSelect={handleSelect}
            />}
      </Calrendar>
      <MentoringContentContainer>
        <TagList tags={tags} onChange={onTagSelectedChange}/>
      </MentoringContentContainer>
      <ButtonContainer>
        <Button size="large" disabled={!submitAbled} onClick={() => onSubmit()}>
          멘토링 시간 선택 완료
        </Button>
      </ButtonContainer>
    </MenteeMentorSlotsStyle>
  );
};

export default MenteeMentorSlots;
