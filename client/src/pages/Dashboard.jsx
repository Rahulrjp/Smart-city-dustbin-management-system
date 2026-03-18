import MapView from "../components/dashboard/MapView";
import Sidebar from "../components/dashboard/Sidebar";
import { bins } from "../data/mockBins";

const Dashboard = () => {
    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}
            <Sidebar bins={bins} />

            {/* Map */}
            <div style={{ flex: 1 }}>
                <MapView bins={bins} />
            </div>

        </div>
    );
};

export default Dashboard;