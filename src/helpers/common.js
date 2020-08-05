import { AVATARS, CONSULTANTS } from '@/helpers/constants';

export const GetConsultant = (v) => {
    if (v === undefined) { v = GetRandomInt(2) } 
    return CONSULTANTS[v].name
};

export const GetConsultantIcon = (v) => {
    if (v === undefined) { v = GetRandomInt(2) } 
    return CONSULTANTS[v].avatar
};

export const GetIcon = (v) => {
    if (v === undefined) { v = GetRandomInt(2) }
    return AVATARS[v].avatar
};

export const GetOrdinal = (n) => {
    // if (n === undefined ) {return null}
    var s = ['th','st','nd','rd']
    var v = n % 100
    return n+(s[(v-20)%10]||s[v]||s[0])
};

export const GetRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const GetUserIcon = (v) => {
    if (v === undefined || v >= 2) { v = GetRandomInt(2) }
    return AVATARS[v].avatar
};
