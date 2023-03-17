import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitForm from '../../components/SubmitForm/SubmitForm';
import './MenteeSlotsMentoring.css';

const MenteeSlotsMentoring = () => {
  const navigator = useNavigate();
  return <SubmitForm type="mentoring" />;
};

export default MenteeSlotsMentoring;
