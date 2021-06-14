"use strict";
"use esversion: 6";

export const IP_DIRS = {
	N: -1,
	S: 1,
	E: 0,
	W: 2,
};

export type CBEntry = string | number;

export interface InstructionPointer {
    dir: number;
    posx: number;
    posy: number;
};

export interface Codebox {
    IP: InstructionPointer;
    codebox: Map<[string, number], CBEntry>;
    maxx: number;
    maxy: number;
};

export function codebox_arrconv(in_: string[]) {
    let ret = new Map;
    let i = 0;
    let j = 0;
    for (const e0 of in_) {
        i = 0;
        for (const _ of e0) {
            ret[JSON.stringify([i, j])] = in_[i][j];
            j += 1;
        }
        i += 1;
    }
    return ret;
}


export function codebox_dir_reflect_y(cb: Codebox)  // about the y
{
    if (cb.IP.dir == IP_DIRS.E) {
        cb.IP.dir = IP_DIRS.W;
    } else if (cb.IP.dir == IP_DIRS.W) {
        cb.IP.dir = IP_DIRS.E;
    }
}

export function codebox_dir_reflect_x(cb: Codebox)  // about the x
{
    if (cb.IP.dir == IP_DIRS.N) {
        cb.IP.dir = IP_DIRS.S;
    } else if (cb.IP.dir == IP_DIRS.S) {
        cb.IP.dir = IP_DIRS.N;
    }
}

export function codebox_write(val: CBEntry, posx: number, posy: number, cb: Codebox)
{
    cb.codebox[JSON.stringify([posx, posy])] = val;
}

export function codebox_get(posx: number, posy: number, cb: Codebox)
{
    let r = cb.codebox[JSON.stringify([posx, posy])];
    return (typeof(r) == "undefined" ? 0 : r)
}

export function codebox_tick(cb: Codebox)
{
    if (cb.IP.dir === IP_DIRS.N) {
        cb.IP.posy -= 1;
    } else if (cb.IP.dir === IP_DIRS.S) {
        cb.IP.posy += 1;
    } else if (cb.IP.dir === IP_DIRS.E) {
        cb.IP.posx += 1;
    } else if (cb.IP.dir === IP_DIRS.W) {
        cb.IP.posx -= 1;
    }

    if (cb.IP.posx > cb.maxx) {
        cb.IP.posx = 0;
    }
    if (cb.IP.posy > cb.maxy) {
        cb.IP.posx = 0;
    }
    if (cb.IP.posx < 0) {
        cb.IP.posx = cb.maxx;
    }
    if (cb.IP.posy < 0) {
        cb.IP.posy = cb.maxy;
    }
}

export function codebox_ip_chdir(dir: number, cb: Codebox)
{
    cb.IP.dir = dir;
}

export function codebox_ipget(cb: Codebox)
{
    return cb.codebox[JSON.stringify([cb.IP.posx, cb.IP.posy])];
}

export function codebox_ipgetdir(cb: Codebox)
{
    return cb.IP.dir;
}

export function codebox_jmp(x: number, y: number, cb: Codebox)
{
    cb.IP.posx = x;
    cb.IP.posy = y;
}
