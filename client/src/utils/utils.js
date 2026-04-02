export const getColor = (fill) => {
    if (fill >= 80) return "red";
    if (fill >= 50) return "yellow";
    return "green";
};

export const parseLocation = (rawLocation) => {
    if (typeof rawLocation !== "string") return { lat: null, lng: null };
    const [latStr, lngStr] = rawLocation.split(",").map((v) => v.trim());
    const parsedLat = Number(latStr);
    const parsedLng = Number(lngStr);
    return {
        lat: Number.isFinite(parsedLat) ? parsedLat : null,
        lng: Number.isFinite(parsedLng) ? parsedLng : null,
    };
};

export const normalizeBin = (serverBin, index) => {
    const parsedLocation = parseLocation(serverBin.location);
    const fillValue = Number(serverBin.fill?.value ?? serverBin.fill ?? 0);
    return {
        id: serverBin._id || serverBin.id,
        binNumber: serverBin.binNumber || `BIN-${index + 1}`,
        fill: Number.isFinite(fillValue) ? fillValue : 0,
        lat: Number(serverBin.location.coordinates[0] ?? serverBin.location?.lat ?? parsedLocation.lat ?? 20.2961),
        lng: Number(serverBin.location.coordinates[1] ?? serverBin.location?.lng ?? parsedLocation.lng ?? 85.8245),
        // pickedUp: Boolean(serverBin.pickedUp || serverBin.isCollected || serverBin.collected),
        updatedAt: serverBin.lastUpdated || serverBin.updatedAt || Date.now(),
    };
};