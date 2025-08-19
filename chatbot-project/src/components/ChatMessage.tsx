import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/different-image.png'; // .. represents outer folder (hint: command line)
import dayjs from 'dayjs';
import './ChatMessage.css';

type ChatMessagesProps = {
  message: string; 
  sender: string; 
  time: number
};

export function ChatMessage({ message, sender, time }: ChatMessagesProps) {
  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
        <div className='chat-message-time'>
          {dayjs(time).format('h:mma')}
        </div>
      </div>

      {sender === 'user' && (
        <img
          src={UserProfileImage}
          className="chat-message-profile"
        />
      )}
    </div>
  );
}