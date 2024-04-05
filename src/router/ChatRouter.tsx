import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserEmptyMessageContainer from '../pages/user/UserEmptyMessageContainer'
import UserMessageContainer from '../pages/user/UserMessageContainer'
import UserPrivateRoute from '../components/UserPrivateRoute'



const ChatRouter = () => {
    return (
        <Routes>
            <Route element={<UserPrivateRoute />}>

                <Route path='/' element={<UserEmptyMessageContainer />} />
                <Route path='/:id' element={<UserMessageContainer />} />
            </Route>

        </Routes>
    )
}

export default ChatRouter
