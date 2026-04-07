import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bell, ShieldCheck, Smartphone, Truck, User } from "lucide-react";
import SettingsOption from "../SettingsOption";

const SettingsView = ({ driverProfile }) => {
    const [selectedSection, setSelectedSection] = useState(null);

    const handleSettingsOptionClick = (section) => {
        setSelectedSection(section);
    };

    const settingsItems = [
        { key: "personal", icon: User, label: "Personal Information", sub: "Edit phone, address, and profile pic" },
        { key: "vehicle", icon: Truck, label: "Vehicle Diagnostics", sub: "Check engine, tires, and oil status" },
        { key: "notifications", icon: Bell, label: "Notifications", sub: "Toggle sound, alerts, and SMS" },
        { key: "security", icon: ShieldCheck, label: "Security", sub: "Change PIN and authentication" },
    ];

    return <div className="max-w-3xl space-y-8 animate-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
            <div className="flex items-center gap-6 pb-8 border-b border-slate-800">
                <div className="relative">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" className="w-24 h-24 rounded-full border-4 border-emerald-500/20 object-cover" />
                    <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full border-4 border-slate-900 text-slate-900"><Smartphone className="w-4 h-4" /></button>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{driverProfile?.user?.name}</h3>
                    <p className="text-slate-400">Senior Field Executive</p>
                    <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20 uppercase mt-2 inline-block">Verified Driver</span>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                {settingsItems.map((item) => (
                    <SettingsOption
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        sub={item.sub}
                        onclick={() => handleSettingsOptionClick(item.key)}
                    />
                ))}
            </div>
            {selectedSection && <SectionContent section={selectedSection} driverProfile={driverProfile} onClose={() => setSelectedSection(null)} />}
            <div className="pt-4"><button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700">Export Shift Report (.PDF)</button></div>
        </div>
    </div>
};

const SectionContent = ({ section, driverProfile, onClose }) => {
    const name = driverProfile?.user?.name ?? "Driver";
    const contentRef = useRef(null);

    useEffect(() => {
        if (!section) return;
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, [section]);

    if (!section) return null;

    const sectionMap = {
        personal: {
            title: "Edit Personal Information",
            description: `Update ${name}'s phone number, address, and profile details.`,
            details: [
                "Change phone number",
                "Update home or work address",
                "Upload profile photo",
            ],
        },
        vehicle: {
            title: "Vehicle Diagnostics",
            description: "Review vehicle health, tire pressure, oil level, and maintenance alerts.",
            details: [
                "Engine status",
                "Tire pressure report",
                "Oil and fluid checks",
            ],
        },
        notifications: {
            title: "Notifications",
            description: "Control alert preferences for sounds, push notifications, and SMS messages.",
            details: [
                "Enable/disable sound alerts",
                "Toggle push notifications",
                "Update SMS alert settings",
            ],
        },
        security: {
            title: "Security Settings",
            description: "Manage login security, PIN code, and authentication preferences.",
            details: [
                "Change PIN or passcode",
                "Enable two-factor authentication",
                "Review recent security events",
            ],
        },
    };

    const current = sectionMap[section];
    if (!current) return null;

    return <div ref={contentRef} className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <h3 className="text-xl font-semibold text-white">{current.title}</h3>
                <p className="text-slate-400 mt-2">{current.description}</p>
            </div>
            <button type="button" onClick={onClose} className="self-start rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-emerald-500 hover:bg-slate-800 hover:text-white">
                Close
            </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
            {current.details.map((item) => (
                <button key={item} type="button" className="group flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 p-4 text-left transition hover:border-emerald-500 hover:bg-slate-800">
                    <span className="text-sm text-slate-200">{item}</span>
                    <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:text-emerald-400" />
                </button>
            ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                Open section details
            </button>
            <button type="button" className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-500 hover:text-white">
                View settings overview
            </button>
        </div>
    </div>;
};

export default SettingsView;