export const adminStats = {
    totalBins: 1240,
    activeDrivers: 45,
    criticalBins: 12,
    wasteCollected: "125.4 Tons",
    efficiency: "94%"
};

export const binData = [
    { id: "BIN-101", zone: "Sector 12", level: 95, battery: 82, lastPing: "2 mins ago", type: "Organic" },
    { id: "BIN-102", zone: "Main Square", level: 45, battery: 12, lastPing: "5 mins ago", type: "Recyclable" },
    { id: "BIN-103", zone: "Metro St.", level: 88, battery: 94, lastPing: "1 min ago", type: "Hazardous" },
    { id: "BIN-104", zone: "Park Road", level: 12, battery: 65, lastPing: "15 mins ago", type: "Organic" },
];

export const fleetData = [
    { id: "DRV-001", name: "Rajesh Kumar", vehicle: "DL 01 G 4532", status: "On Route", progress: 65 },
    { id: "DRV-002", name: "Suresh Singh", vehicle: "DL 01 G 1289", status: "Break", progress: 40 },
    { id: "DRV-003", name: "Amit Verma", vehicle: "DL 02 H 9921", status: "Standby", progress: 0 },
];

export const notifications = [
    { id: 1, title: "System Maintenance", message: "Server update scheduled for 2:00 AM tonight.", time: "1 hour ago", type: "info", read: false },
    { id: 2, title: "Sensor Fault", message: "Bin #442 in Zone B reporting irregular data.", time: "3 hours ago", type: "warning", read: true },
];

export const systemAlerts = [
    { id: 1, title: "Critical Overflow", message: "Multiple bins in Sector 22 require immediate dispatch.", time: "5 mins ago", severity: "critical" },
    { id: 2, title: "Network Outage", message: "Gateway #09 (North Zone) is offline.", time: "12 mins ago", severity: "critical" },
    { id: 3, title: "Low Battery Alert", message: "5 bins in Central Park under 10% battery.", time: "45 mins ago", severity: "warning" },
];