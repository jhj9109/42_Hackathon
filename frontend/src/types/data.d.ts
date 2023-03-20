interface Tag {
  tagId: number;
  tagName: string;
}

interface User {
  userId: number; // id로 오고 있지만 수정 예정
  intraId: string;
  email: string;
  imageUri: string;
  roleType: string;
  totalExp: number;
}

interface Session {
  sessionId: number;
  mentoUser: User | null;
  noSessionQuestionDtos: Question[];
  startTime: string;
  endTime: string;
  tags: Tag[];
}

interface Comment {
  content: string;
}

// comments: null
// content: "내용"
// endTime: "2023-03-20T21:00:00"
// questionId: 1
// session: null
// startTime: "2023-03-20T19:00:00"
// status: "매칭 중"
// tags: []
// title: "타이틀"

interface Question {
  comments: Comment[] | null;
  content: string;
  endTime: string;
  menteeUser: User;
  session: Session | null;
  questionId: number;
  startTime: string;
  status: string;
  tags: Tag[];
  title: string;
}

// comments: null
// content: "내용"
// endTime: "2023-03-20T21:00:00"
// questionId: 4
// session: {sessionId: 3, mentoUser: {…}, startTime: '2023-03-20T19:00:00', endTime: '2023-03-20T19:15:00', tags: Array(1)}
              // mentoUser
              // email: "hyeonjan@student.42seoul.kr"
              // id: 1
              // imageUri: "https://cdn.intra.42.fr/users/0e75906fded18d89beb90c5f861da003/hyeonjan.jpg"
              // intraId: "hyeonjan"
              // roleType: "USER"
              // totalExp: 0
// startTime: "2023-03-20T19:00:00"
// status: "매칭 완료"
// tags: [{tagId: 3, tagName: 'minishell'}]
// title: "타이틀"
interface Matched {
  comments : Comment[] | null;
  content : string;
  menteeUser: User;
  questionId : number;
  session : Session;
  startTime : string;
  status : string;
  tags : Tag[];
  title : string;
}


// {
// [{
// sessionId : Integer
// mentoUser : User
// startTime : Date
// endTime : Date
// noSessionQuestionDtos : NoSessionQeustionDtos[]
// tags :
//   [{
//   tagId : Integer
//   tagName : String
//   }]
// } , { … }]
// }
interface NoSessionQeustionDto {
  comments: Comment[] | null;
  content: string;
  endTime: string;
  menteeUser: User;
  questionId: number;
  startTime: string;
  status: string;
  tags: Tag[];
  title: string;
}

interface MentoringLogs {
  sessionId: number;
  mentoUser: User;
  startTime: string;
  endTime: string;
  noSessionQuestionDtos: NoSessionQeustionDto[]; // Question 인터페이스에서 순환참조 안 되게 세션 제외
  tags: Tag[];
}
// 1. 세션이다. 나 => 나의 세션 => 내가 누군가를 도와줬던 세션
// 2. 세션에는 여러 질문 (매칭된)이 존재할수 있어서 Dto[]로 생겼다.
// 3. DTO: 하나는 매칭된 하나 => comments는 1개.
// noSessionQuestionDtos

