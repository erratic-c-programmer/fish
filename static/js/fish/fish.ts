"use strict";
"use esversion: 6";

import { Codebox, IP_DIRS, codebox_ip_chdir, codebox_ipget, codebox_ipgetdir, codebox_dir_reflect_y, codebox_dir_reflect_x, codebox_tick, codebox_get, codebox_write, codebox_jmp, } from "./codebox_op";

import { stack_normal_push, stack_normal_pop, } from "./stack";

import { stack_dup, stack_pop, stack_swap, stack_swap_three, stack_shift_left, stack_shift_right, stack_reverse, stack_pushlen, stack_givebirth, stack_murderchild, stack_reg, } from "./stack_op";

import { sane_switch, } from "./sanity";

// UGLY FUNCTION, whatever
async function _runfish(cb: Codebox, delay: number=0, debug=false)
{
    delay
    let codebox = cb;
    let stack = {stack: [], reg: null, o: null};
    let runningp = true;
    let stringmode_p = false;

    while (runningp) {
        let op = codebox_ipget(codebox);
        let dir = undefined;

        if (stringmode_p) {
            if (op === '"' || op === "'") {
                stringmode_p = false;
            } else {
                stack_normal_push(op.charCodeAt(0), stack);
            }
        } else {

            switch (op) {  // Ugh
                // Direcrtion
                case ">":
                    codebox_ip_chdir(IP_DIRS.E, codebox);
                    break;
                case "<":
                    codebox_ip_chdir(IP_DIRS.W, codebox);
                    break;
                case "^":
                    codebox_ip_chdir(IP_DIRS.N, codebox);
                    break;
                case "v":
                    codebox_ip_chdir(IP_DIRS.S, codebox);
                    break;
                case "x":
                    codebox_ip_chdir([IP_DIRS.N, IP_DIRS.E, IP_DIRS.S, IP_DIRS.W][Math.floor(Math.random() * 4)], codebox);
                    break;


                // Trampolines
                case "!":
                    codebox_tick(codebox);
                    break;
                case "?":
                    if (!stack_normal_pop(stack)) {
                        codebox_tick(codebox);
                    }
                    break;


                // Amazing things
                case ".": {
                    let y = stack_normal_pop(stack);
                    let x = stack_normal_pop(stack);
                    codebox_jmp(x, y, codebox);
                    break;
                }
                case "'":
                case '"':
                    stringmode_p = true;
                    break;
                case "&":
                    stack_reg(stack);
                    break;


                // More stack manip!! Whee!!
                case ":":
                    stack_dup(stack);
                    break;
                case "~":
                    stack_pop(stack);
                    break;
                case "$":
                    stack_swap(stack);
                    break;
                case "@":
                    stack_swap_three(stack);
                    break;
                case "}":
                    stack_shift_right(stack);
                    break;
                case "}":
                    stack_shift_left(stack);
                    break;
                case "r":
                    stack_reverse(stack);
                    break;
                case "l":
                    stack_pushlen(stack);
                    break;
                case "[":
                    stack_givebirth(stack);
                    break;
                case "]":
                    stack_murderchild(stack);
                    break;
                case "g": {
                    let y = stack_normal_pop(stack);
                    let x = stack_normal_pop(stack);
                    stack_normal_push(codebox_get(x, y, codebox), stack);
                    break;
                }
                case "p": {
                    let y = stack_normal_pop(stack);
                    let x = stack_normal_pop(stack);
                    let v = stack_normal_pop(stack);
                    codebox_write(v, x, y, codebox);
                    codebox.maxx = Math.max(codebox.maxx, x);
                    codebox.maxy = Math.max(codebox.maxx, y);
                    stack_normal_push(codebox_get(x, y, codebox), stack);
                    break;
                }


                // Meth (from aritHMETic; rearranged. Yeah, so what?)
                case "+": {
                    let b = stack_normal_pop(stack);
                    let a = stack_normal_pop(stack);
                    stack_normal_push(a + b, stack);
                    break;
                }
                case "-": {
                    let b = stack_normal_pop(stack);
                    let a = stack_normal_pop(stack);
                    stack_normal_push(a - b, stack);
                    break;
                }
                case "*": {
                    let b = stack_normal_pop(stack);
                    let a = stack_normal_pop(stack);
                    stack_normal_push(a * b, stack);
                    break;
                }
                case ",": {
                    let b = stack_normal_pop(stack);
                    let a = stack_normal_pop(stack);
                    stack_normal_push(a / b, stack);
                    break;
                }
                case "%": {
                    let b = stack_normal_pop(stack);
                    let a = stack_normal_pop(stack);
                    stack_normal_push(a % b, stack);
                    break;
                }
                case "=": {
                    let b = stack_normal_pop(stack);
                    let a = stack_normal_pop(stack);
                    stack_normal_push(a === b ? 1 : 0, stack);
                    break;
                }
                case ")": {
                    let b = stack_normal_pop(stack);
                    let a = stack_normal_pop(stack);
                    stack_normal_push(a > b ? 1 : 0, stack);
                    break;
                }
                case "(": {
                    let b = stack_normal_pop(stack);
                    let a = stack_normal_pop(stack);
                    stack_normal_push(a < b ? 1 : 0, stack);
                    break;
                }


                // Mirrors
                case "_":
                    codebox_dir_reflect_x(codebox);
                    break;
                case "|":
                    codebox_dir_reflect_y(codebox);
                    break;
                case "/":
                    dir = codebox_ipgetdir(codebox);
                    codebox_ip_chdir(sane_switch(dir, [
                        [IP_DIRS.N, IP_DIRS.E],
                        [IP_DIRS.S, IP_DIRS.W],
                        [IP_DIRS.E, IP_DIRS.N],
                        [IP_DIRS.W, IP_DIRS.S]
                    ]), codebox);
                    break;
                case "\\":
                    dir = codebox_ipgetdir(codebox);
                    codebox_ip_chdir(sane_switch(dir, [
                        [IP_DIRS.N, IP_DIRS.W],
                        [IP_DIRS.S, IP_DIRS.E],
                        [IP_DIRS.E, IP_DIRS.S],
                        [IP_DIRS.W, IP_DIRS.N]
                    ]), codebox);
                    break;
                case "#":
                    codebox_dir_reflect_x(codebox);
                    codebox_dir_reflect_y(codebox);
                    break;


                // Literals
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "a":
                case "b":
                case "c":
                case "d":
                case "e":
                case "f":
                    stack_normal_push(parseInt(op, 16), stack);
                    break;


                // IO
                case "o":
                    process.stdout.write(String.fromCharCode(stack_normal_pop(stack)));
                    break;
                case "n":
                    process.stdout.write(stack_normal_pop(stack).toString());
                    break;


                // Bye
                case ";":
                    runningp = false;
                    break;


                default:
                    break;
            }
        }

        if (debug) {
            console.log(`IP @ (${codebox.IP.posx},${codebox.IP.posy})`);
            console.log(`INSTR @ IP: ${codebox_ipget(codebox)}`);
            console.log(`STACK: ${JSON.stringify(stack)}`);
            console.log('------');
        }
        codebox_tick(codebox);  // tick
        if (delay !== 0) {  // speed issues
            await new Promise(r => setTimeout(r, delay));  // due to https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
        }
    }
}

export async function runfish(cb: Codebox, delay: number=0, debug=false)
{
    try {
        await _runfish(cb, delay, debug);
    } catch (error) {
        throw new Error("something smells fishy...");
    }
}
