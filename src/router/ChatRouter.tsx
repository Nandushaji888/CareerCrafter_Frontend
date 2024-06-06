import { Route, Routes } from 'react-router-dom'
import UserEmptyMessageContainer from '../pages/user/UserEmptyMessageContainer'
import UserMessageContainer from '../pages/user/UserMessageContainer'
import UserPrivateRoute from '../components/UserPrivateRoute'
import RecruiterEmptyMessageContainer from '../pages/recruiter/RecruiterEmptyMessageContainer'
import RecruiterMessageContainer from '../pages/recruiter/RecruiterMessageContainer'



const ChatRouter = () => {
    return (
        <Routes>
            <Route element={<UserPrivateRoute />}>

                <Route path='/' element={<UserEmptyMessageContainer />} />
                <Route path='/:id' element={<UserMessageContainer />} />
                <Route path='/messages' element={<RecruiterEmptyMessageContainer />} />
                <Route path='/messages/:id' element={<RecruiterMessageContainer />} />
            </Route>

        </Routes>
    )
}

export default ChatRouter
