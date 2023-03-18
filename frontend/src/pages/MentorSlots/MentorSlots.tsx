import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postRequest } from '../../api/axios';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import SlotTable from '../../components/SlotTable/SlotTable';
import { isContinuousSlot, notSlot, sampleOpenSlots, setToArr, sortedSlotToTime, updateSelected } from '../../components/SlotTable/slotTableUtils';

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

interface Data {
  startTime: string;
  endTime: string;
  tags: Tag[];
}

const USER_SESSION_PATH = "user/session";

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
  // TODO: 어디선가 태그 정보 가져오기
  // const [tags, setTags] = useState(setInitialTags());
  const [tags, setTags] = useState(sampleExpandedTag); 
  const [submitAbled, setSubmitAbled] = useState(false);
  
  const onTagSelectedChange = (tag: Tag) => {
    setTags(prev =>
      prev.map(t =>
        t.tag.tagId === tag.tagId ? {...t, selected: !t.selected} : t))
  }

  const calSubmitAbled = (tags: ExpandedTag[], selected: Set<number>) =>
    selected.size !== 0 && tags.some((t) => t.selected);
  
  const slotCompareFn = (el: number, i: number, arr: number[]) =>
    i === 0 || arr[i - 1] + 1 === el
  
  const setData = (sortedSlot: number[], currDate: Date, filterdTags: Tag[]) =>
    ((t: string[], tags): Data =>
      ({startTime: t[0], endTime: t[1], tags}))(
        sortedSlotToTime(sortedSlot, currDate), filterdTags
      );
    
  const onSubmit = async () => {
    if (!(isSubmitAvaiable(tags, selected))) {
      alert("올바르지 못한 시도입니다.");
      return;
    }
    const sortedSlot = setToArr(selected).sort((a, b) => a -b);
    const filteredTags = tags.filter(t => t.selected).map(t => t.tag);
    if (!isContinuousSlot(sortedSlot, slotCompareFn)) {
      alert("연속된 슬롯만 가능합니다.");
      return;
    }
    const data = setData(sortedSlot, currDate, filteredTags);
    console.log("===============요청 보낼 데이터===============");
    console.log(data);
    // TODO: axios 요청만들기
    // try {
    //   const response = await postRequest(USER_SESSION_PATH, data);
    //   // 성공이라면
    //   console.log(response);
    //   alert("멘토링 슬롯 등록에 성공하였습니다.");
    //   navigator("/");
    // } catch (error) {
    //   console.error(error);
    //   alert("멘토링 슬롯 등록에 실패하였습니다.");
    // }
    console.log("==========================================");

  }

  useEffect(() => {
    // TODO: axios 요청 
    setTimeout(() => setOpenSlots(sampleOpenSlots))
  })

  useEffect(() => {
    setSubmitAbled(calSubmitAbled(tags, selected));
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
