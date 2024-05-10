import {useContext} from 'react';
import {AuthContext} from '../auth';
import {Navigate, useLocation} from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const {logged} = useContext(AuthContext);

    // If an optimization is needed, we can try to memo this part since it's being executed every time the component is
    // rendered. For now, it will stay like this.
    const {pathname, search} = useLocation();
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

    return (logged)
        ? children
        : <Navigate to="/login"/>;
};
