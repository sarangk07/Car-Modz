'use client';

import { useParams } from 'next/navigation';
// import ChatRoom from '../../../components/ChatRoom';
import ChatRoom from '@/app/components/ChatRoom';

const ChatPage = () => {
  const { roomName } = useParams();

  if (!roomName) {
    return <div>Loading...</div>;
  }

  return <ChatRoom roomName={roomName} />;
};

export default ChatPage;
