import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../../utils/hooks/useGetConversations'


const Conversations = () => {

  const { conversation, loading } = useGetConversations()

  
  return (
    <div className='py-2 flex flex-col gap-2 overflow-auto'>
      {conversation && conversation.map((conv, idx) => {
        return (
          <div className='mb-3'>
          <Conversation
            key={conv?._id}
            conversation={conv}
            lastIdx={idx === conversation.length - 1}
          />
          </div>
        );
      })}
      {loading && (
        <img src='/ZKZg.gif' alt="loading" style={{ position: 'absolute', top: '50%', left: '26%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' }} />

      )}
    </div>
  )
}

export default Conversations
