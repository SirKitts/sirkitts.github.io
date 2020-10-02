import { AVATARS } from '@/helpers/constants';

export const GetIcon = v => {
    if (v === undefined) { v = GetRandomInt(2) }
    return AVATARS[v].avatar
};

export const GetRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const GetUserIcon = v => {
    if (v === undefined || v >= 2) { v = GetRandomInt(2) }
    return AVATARS[v].avatar
};

export const ShowDate = d => {
    return (new Date(new Date(d)).toString().substr(0, 15))
};

export const ShowTime = t => {
    const [hr, minutes] = t.split(':');
    const hrs = parseInt(hr);
    const hours = hrs === 0 ? '12' : hrs > 12 ? hrs - 12 : hr;
    const ampm = hrs < 12 ? 'AM' : 'PM';
    return [[hours, minutes].join(':'), ampm].join(' ');
}
