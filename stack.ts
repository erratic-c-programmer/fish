"use strict";
"use esversion: 6";

export interface Stack {
    stack: number[];
    reg: number | null;
    child: Stack | null;
};

export let __=(o,i,r=x=>x.child===null)=>(f=>f(f))(f=>c=>r(c)?o(c):f(f)(c.child))(i);

export function stack_normal_push(v: number, stack: Stack)
{
    __((s: Stack) => s.stack.push(v), stack);
}

export function stack_normal_pop(stack: Stack)
{
    return __((s: Stack) => s.stack.pop(), stack);
}
