import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './pages/App/App';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import MenteeComment from './pages/MenteeComment/MenteeComment';
import MenteeMentorMentoring from './pages/MenteeMentorMentoring/MenteeMentorMentoring';
import MenteeMentors from './pages/MenteeMentors/MenteeMentors';
import MenteeMentorSlots from './pages/MenteeMentorSlots/MenteeMentorSlots';
import MenteeSlots from './pages/MenteeSlots/MenteeSlots';
import MenteeSlotsMentoring from './pages/MenteeSlotsMentoring/MenteeSlotsMentoring';
import MentoringLog from './pages/MentoringLog/MentoringLog';
import MentorSlots from './pages/MentorSlots/MentorSlots';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'mentor/slots',
        element: <MentorSlots />,
      },
      {
        path: 'mentee/mentors',
        element: <MenteeMentors />,
      },
      {
        path: 'mentee/comment',
        element: <MenteeComment />,
      },
      {
        path: 'mentee/slots',
        element: <MenteeSlots />,
      },
      {
        path: 'mentee/slots/mentoring',
        element: <MenteeSlotsMentoring />,
      },
      {
        path: 'mentee/mentors/:mentorId/slots',
        element: <MenteeMentorSlots />,
      },
      {
        path: 'mentee/mentors/:mentorId/mentoring',
        element: <MenteeMentorMentoring />,
      },
      {
        path: 'mentoring-log/:id',
        element: <MentoringLog />,
      },
      {
        path: '*',
        element: <Navigate to={'/'} />,
      },
    ],
  },
]);

export default router;
