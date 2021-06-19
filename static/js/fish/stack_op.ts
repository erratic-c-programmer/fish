"use strict";
"use esversion: 6";

import { Stack, __, } from "./stack";

/* Sadly, nothing here is at all pure because JS is a big
 * mutable mess :(
 */

export function stack_dup(stack: Stack)
{
    __((s: Stack) => s.stack.push(s.stack[s.stack.length - 1]), stack);
}

export function stack_pop(stack: Stack)
{
    __((s: Stack) => s.stack.pop(), stack);
}

export function stack_swap(stack: Stack)
{
    __(function (s: Stack) {
        let tmp = s.stack[s.stack.length - 2];
        s.stack[s.stack.length - 2] = s.stack[s.stack.length - 1];
        s.stack[s.stack.length - 1] = tmp;
    }, stack);
}

export function stack_swap_three(stack: Stack)
{
    __(function (s: Stack) {
        const tmp = s.stack[s.stack.length - 1];
        s.stack[s.stack.length - 1] = s.stack[s.stack.length - 2];
        s.stack[s.stack.length - 2] = s.stack[s.stack.length - 3];
        s.stack[s.stack.length - 3] = tmp;
    }, stack);
}

export function stack_shift_right(stack: Stack)
{
    __((s: Stack) => s.stack.unshift(s.stack.pop()), stack);
}

export function stack_shift_left(stack: Stack)
{
    __((s: Stack) => s.stack.push(s.stack.shift()), stack);
}

export function stack_reverse(stack: Stack)
{
    __((s: Stack) => s.stack.reverse(), stack);
}

export function stack_pushlen(stack: Stack)
{
    __((s: Stack) => s.stack.push(s.stack.length), stack);
}

export function stack_givebirth(stack: Stack)
{
    __(function (s: Stack) {
        const n = s.stack.pop();
        s.child = {stack: s.stack.slice(s.stack.length - n), reg: null, child: null};
        s.stack = s.stack.slice(0, s.stack.length - n);
    }, stack);
}

export function stack_murderchild(stack: Stack)
{
    __(function (s: Stack) {
        s.stack = s.stack.concat(s.child.stack);
        s.child = null;  // bam
    }, stack, x => x.child.child === null);
}

export function stack_reg(stack: Stack)
{
    __((s: Stack) => {
        if (s.reg === null) {
            s.reg = s.stack.pop();
        } else {
            s.stack.push(s.reg);
            s.reg = null;
        }
    }, stack);
}
