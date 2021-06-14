"use strict";
"use esversion: 6";

export interface Stack {
    stack: number[];
    reg: number | null;
    child: Stack | null;
};

export function _iter<ret_t>(op: (s: Stack) => ret_t, stack: Stack | null): ret_t
{
    if (stack === null) {
        return op(stack);
    } else {
        _iter(op, stack.child);
    }
}

export function stack_normal_push(v: number, stack: Stack)
{
    _iter((s: Stack) => s.stack.push(v), stack);
}

export function stack_normal_pop(stack: Stack)
{
    return _iter((s: Stack) => s.stack.pop(), stack);
}
