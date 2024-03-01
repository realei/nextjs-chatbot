import React, { useEffect, useRef } from 'react';
import ChatBot from 'react-simple-chatbot';
import ChatComponent from '../../components/chatcomponent';

export default function AIBot() {
  const websocketRef = useRef(null);

  useEffect(() => {
    // 创建 WebSocket 连接
    websocketRef.current = new WebSocket('ws://localhost:8000/ws/chat/userid/');

    // 当组件卸载时，关闭 WebSocket 连接
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []); // 空依赖数组，因为我们只希望在组件挂载时运行一次


  const steps = [
    {
      id: '1',
      message: 'Hello!',
      trigger: 'userInput',
    },
    {
      id: 'userInput',
      user: true,
      trigger: 'ChatComponent',
    },
    {
      id: 'ChatComponent',
      component: <ChatComponent websocketRef={websocketRef} />,
      waitAction: true,
      asMessage: true,
    },
    {
      id: 'nextStepId',
      message: '{previousValue}',
      trigger: 'userInput',
    },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      marginLeft: '20px'
    }}>
      <ChatBot 
        steps={steps} 
        style={{ 
          boxShadow: 'none', 
          width: '33vw', // Set the width to one third of the viewport width
          height: '90vh', // Set the height to 90% of the viewport height
          maxWidth: 'unset', 
          borderRadius: '5px', 
          overflowY: 'auto' 
        }}
        contentStyle={{ // This will style the chat content area
          height: '80vh', // Set the height to 80% of the viewport height
          overflowY: 'auto' 
        }}
        inputStyle={{ // This will style the input area
          margin: '1em', // Add some margin around the input
        }}
        bubbleStyle={{ whiteSpace: 'pre-line' }}
      />
    </div>
  );
}