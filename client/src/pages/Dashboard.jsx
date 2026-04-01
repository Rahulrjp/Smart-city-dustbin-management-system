import { Navigate } from "react-router-dom";

const Dashboard = () => {
    return <Navigate to={role === "admin" ? "/dashboard/admin" : "/dashboard/driver"} replace />;
};

export default Dashboard;