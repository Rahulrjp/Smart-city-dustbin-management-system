
export const getBinStatus = (fill) => {
    if (fill < 20) {
        return 'Empty';
    } else if (fill > 20 && fill <= 35) {
        return 'Almost Half Full';
    } else if (fill > 35 && fill <= 70) {
        return 'Half Full';
    } else if (fill > 70 && fill <= 90) {
        return 'Almost Full';
    } else {
        return 'Full';
    }
}