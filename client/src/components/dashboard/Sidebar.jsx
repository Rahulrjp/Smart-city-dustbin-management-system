import { getColor } from "../../utils/utils";

const Sidebar = ({ bins }) => {
    return (
        <div style={{ width: "300px", padding: "10px", background: "#f4f4f4" }}>
            <h2>Bins Status</h2>

            {bins.map((bin) => (
                <div
                    key={bin.id}
                    style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "8px",
                        background: "white",
                    }}
                >
                    <h4>{bin.id}</h4>
                    <p>Fill: {bin.fill}%</p>
                    <p style={{ color: getColor(bin.fill), fontWeight: "bold" }}>
                        {getColor(bin.fill).toUpperCase()}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;