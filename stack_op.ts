"use strict";
"use esversion: 6";

import {
    Stack,
    _iter,
} from "./stack";

/* Sadly, nothing here is at all pure because JS is a big
 * mutable mess :(
 */

export function stack_dup(stack: Stack)
{
    _iter((s: Stack) => s.stack.push(s.stack[s.stack.length - 1]), stack);
}

export function stack_pop(stack: Stack)
{
    _iter((s: Stack) => s.stack.pop(), stack);
}

export function stack_swap(stack: Stack)
{
    _iter(function (s: Stack) {
        const tmp = s.stack[s.stack.length - 2];
        s[s.stack.length - 2] = s.stack[s.stack.length - 1];
        s[s.stack.length - 1] = tmp;
    }, stack);
}

export function stack_swap_three(stack: Stack)
{
    _iter(function (s: Stack) {
        const tmp = s.stack[s.stack.length - 1];
        s.stack[s.stack.length - 1] = s.stack[s.stack.length - 2];
        s.stack[s.stack.length - 2] = s.stack[s.stack.length - 3];
        s.stack[s.stack.length - 3] = tmp;
    }, stack);
}

export function stack_shift_right(stack: Stack)
{
    _iter((s: Stack) => s.stack.unshift(s.stack.pop()), stack);
}

export function stack_shift_left(stack: Stack)
{
    _iter((s: Stack) => s.stack.push(s.stack.shift()), stack);
}

export function stack_reverse(stack: Stack)
{
    _iter((s: Stack) => s.stack.reverse(), stack);
}

export function stack_pushlen(stack: Stack)
{
    _iter((s: Stack) => s.stack.push(s.stack.length), stack);
}

export function stack_givebirth(stack: Stack)
{
    _iter(function (s: Stack) {
        const n = s.stack.pop();
        s.child = {stack: s.stack.slice(s.stack.length - n), reg: null, child: null};
        s.stack = s.stack.slice(0, s.stack.length - n);
    }, stack);
}

export function stack_murderchild(stack: Stack)
{
    _iter(function (s: Stack) {
        s.stack.concat(stack.child.stack);
        s.child = null;  // bam
    }, stack);
}

export function stack_reg(stack: Stack)
{
    function stack_regadd()
    {
        _iter((s: Stack) => s.reg = s.stack.pop(), stack);
    }
    function stack_regget()
    {
        _iter((s: Stack) => {s.stack.push(s.reg); s.reg = null}, stack);
    }

    if (stack.reg) {
        return stack_regget;
    } else {
        return stack_regadd;
    }
}
