"use strict";
"use esversion: 6";

export interface Stack {
    stack: number[];
    reg: number | null;
    child: Stack | null;
};

let օ = null;
export let __=(o,о,ο=o=>o.child===օ)=>(о=>о(о))(о=>օ=>ο(օ)?o(օ):о(о)(օ.child))(о);

export function stack_normal_push(v: number, stack: Stack)
{
    __((s: Stack) => s.stack.push(v), stack);
}

export function stack_normal_pop(stack: Stack)
{
    return __((s: Stack) => s.stack.pop(), stack);
}
