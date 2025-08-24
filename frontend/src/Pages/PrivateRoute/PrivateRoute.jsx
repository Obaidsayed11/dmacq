import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.auth?.token) || Cookies.get('token');
    return token ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;