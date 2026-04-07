import { format, formatDistanceToNow } from 'date-fns'

export const getCleanDate = (date) => {
    const cleanDate = format(new Date(date), 'MMMM dd, yyyy');
    return cleanDate;
}

export const getRelativeDate = (date) => {
    const relativeDate = formatDistanceToNow(new Date(date), { addSuffix: false, includeSeconds: true });
    return relativeDate;
}