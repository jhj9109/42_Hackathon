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
  mentorUser: User | null;
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
  menteeUserId: number;
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