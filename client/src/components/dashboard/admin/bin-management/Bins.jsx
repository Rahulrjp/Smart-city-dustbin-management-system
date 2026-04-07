import React, { Activity, useEffect, useState } from 'react'
import { getBinData } from '../../../../utils/api';
import { Edit, Trash, Trash2 } from 'lucide-react';
import axios from 'axios';

const Bins = () => {

    const [bins, setBins] = useState([]);
    const [addBinClicked, setAddBinClicked] = useState(false);
    const [binNumber, setBinNumber] = useState('');
    const [binLocation, setBinLocation] = useState('');
    const [area, setArea] = useState('');
    const [binHeight, setBinHeight] = useState('');
    const [error, setError] = useState('');
    const [updateClicked, setUpdateClicked] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const getBins = async () => {
            try {
                const data = await getBinData();
                if (isMounted) {
                    console.log("Fetched bins:", data); // check if data changes
                    setBins(data); // replace state
                }
            } catch (err) {
                console.error("Error fetching bins:", err);
            }
        };

        getBins(); // run immediately

        const intervalId = setInterval(() => {
            getBins();
        }, 10000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);

    const handleAddBin = async (e) => {
        e.preventDefault();
        setError('');
        if (!binNumber || !binLocation || !binHeight) {
            setError('Please fill in all required fields');
            return;
        }
        const coodinates = binLocation.split(',').map(coord => parseFloat(coord.trim()));
        if (coodinates.length !== 2 || coodinates.some(coord => isNaN(coord))) {
            setError('Location must be in "lat, lng" format');
            return;
        }
        console.log("Adding bin with data:", { binNumber, binLocation, area, binHeight });

        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/bins`;
            const res = await axios.post(url, { binNumber, location: binLocation, area, binHeight }, { withCredentials: true });
            console.log("Bin added successfully:", res.data);
            setBins(prev => [...prev, res.data.bin]);
            setAddBinClicked(false);
            setBinNumber('');
            setBinLocation('');
            setArea('');
            setBinHeight('');
            setAddBinClicked(false);
            console.log("Bins after adding:", bins)
        } catch (error) {
            console.error("Error adding bin:", error);
            setError('Error adding bin. Please try again.');
        }

        console.log("Error : ", error);
    }

    const handleUpdateBin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/bins`;
            const res = await axios.patch(url,
                { binNumber, binLocation, area, binHeight },
                { withCredentials: true });
            console.log("Bin updated successfully:", res.data);
            setBins(prev => [...prev, res.data.bin]);
            setAddBinClicked(false);
        } catch (error) {
            console.error("Error updating bin:", error);
            setError('Error updating bin. Please try again.');
        }
    }



    return (
        <div className='flex flex-col gap-4'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    Live Bin Levels
                </h2>
                <button onClick={() => setAddBinClicked(!addBinClicked)} className="text-xs font-bold text-emerald-400 hover:underline">
                    {addBinClicked ? "Cancel" : "Add new Bin"}
                </button>
            </div>
            {addBinClicked && <div className='bg-slate-900 rounded-3xl p-8'>
                <h3 className="text-md font-bold text-white mb-2">Add New Bin</h3>
                <form className="rounded-lg shadow-lg bg-slate-900" onSubmit={handleAddBin}>
                    <div className="p-4 grid grid-cols-3 gap-4 bg-slate-900 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Bin number</label>
                            <input
                                type="text"
                                name='binNumber'
                                value={binNumber}
                                onChange={(e) => setBinNumber(e.target.value)}
                                className="bg-slate-800 text-slate-800 placeholder:text-slate-600 border border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none px-3 py-1 rounded-md"
                                placeholder="Enter bin number" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                            <input
                                type="text"
                                name='binLocation'
                                value={binLocation}
                                onChange={(e) => setBinLocation(e.target.value)}
                                className="bg-slate-800 text-slate-800 placeholder:text-slate-600 border border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none px-3 py-1 rounded-md"
                                placeholder="Comma separated coordinates" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Zone</label>
                            <input
                                type="text"
                                name='area'
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className="bg-slate-800 text-slate-800 placeholder:text-slate-600 border border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none px-3 py-1 rounded-md"
                                placeholder="Enter Zone" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Bin Height</label>
                            <input
                                type="text"
                                name='binHeight'
                                value={binHeight}
                                onChange={(e) => setBinHeight(e.target.value)}
                                className="bg-slate-800 text-slate-800 placeholder:text-slate-600 border border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none px-3 py-1 rounded-md"
                                placeholder="In cm" />
                        </div>
                        <div>
                            <button className="mt-6 px-4 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:bg-emerald-400 transition-colors">Add Bin</button>
                        </div>
                    </div>
                </form>
            </div>}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-800/50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Bin ID</th>
                            <th className="px-6 py-4">Zone</th>
                            <th className="px-6 py-4">Fill Level</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {bins.map(bin => (
                            <>
                                <tr key={bin._id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm text-emerald-400">{bin.binNumber}</td>
                                    <td className="px-6 py-4 text-sm text-white font-semibold">{bin?.location?.area || '-'}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-slate-800 h-1.5 rounded-full min-w-15 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${bin.fill.value > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                    style={{ width: `${bin.fill.value}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-slate-300">{bin.fill.value}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${bin.fill.value > 80 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                            {bin.fill.value > 80 ? 'CRITICAL' : 'OPTIMAL'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <button className=" flex justify-center items-center px-3 py-1 bg-slate-800 rounded-md font-bold">
                                            <Edit className="w-5 h-5 hover:text-blue-600 transition-colors duration-150" />
                                        </button>
                                        <button className=" flex justify-center items-center px-3 py-1 bg-slate-800 rounded-md font-bold">
                                            <Trash2 className="w-5 h-5 hover:text-red-600 transition-colors duration-150" />
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Bins