import { useAuthContext } from './UseAuthContext'
import { useWorkoutsContext } from './UseWorkoutsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        //remove user from localstorage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}