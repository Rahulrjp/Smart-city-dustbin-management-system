export const driverStats = {
    name: "Rajesh Kumar",
    id: "DRV-2024-089",
    vehicle: "DL 01 G 4532",
    fuel: 75,
    binsCollected: 12,
    totalBins: 24,
    distanceCovered: "14.5 km"
};

export const notifications = [
    { id: 1, title: "New Task Assigned", message: "A new pickup has been added to your route in Sector 12.", time: "15 mins ago", type: "task", read: false },
    { id: 2, title: "Shift Update", message: "Your break time has been shifted to 12:45 PM.", time: "1 hour ago", type: "info", read: true },
    { id: 3, title: "Weather Alert", message: "Heavy rain expected in your area. Drive safely.", time: "2 hours ago", type: "info", read: true },
];

export const systemAlerts = [
    { id: 1, title: "Urgent Overflow", message: "Bin #902 in Sector 22 is at 100% capacity.", time: "2 mins ago", severity: "critical" },
    { id: 2, title: "Road Closure", message: "Main St. closed due to maintenance. Reroute via Bypass.", time: "10 mins ago", severity: "warning" },
    { id: 3, title: "Vehicle Health", message: "Low tire pressure detected in Rear Left tire.", time: "30 mins ago", severity: "warning" },
];

export const tasks = [

    { id: 1, location: "Sector 15, Metro Station", level: 95, status: "Urgent", type: "Organic", time: "10 mins" },
    { id: 2, location: "Central Park Gate 2", level: 85, status: "High", type: "Recyclable", time: "15 mins" },
    { id: 3, location: "City Mall Parking", level: 70, status: "Normal", type: "Hazardous", time: "22 mins" },
    { id: 4, location: "Model Town Block C", level: 40, status: "Normal", type: "Organic", time: "30 mins" },
    { id: 5, location: "Rajiv Chowk North", level: 92, status: "Urgent", type: "Organic", time: "45 mins" },
];