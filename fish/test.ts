import { runfish } from "./fish";
import { codebox_arrconv } from "./codebox_op";
//runfish(codebox_arrconv(["321nnn;"]));
/*
let testcb = [
    "10::n' 'o&+&$10.",
    ">'helol'2[r]roooooao5:+n   12$nn    00.;",
]
runfish(codebox_arrconv(testcb), 20);
*/
let fibocb = [
">0:n 70v     1:nf8+0v         >:@@:&@&+:nv",
"       v            v         ^          f",
"       v            v         ^          f",
"       v            v         ^          4",
"       v            v         ^          +",
"       v            v         ^          +",
"       v            v         ^          8",
"       v            v         ^          >>>>v",
"       v            v         ^<<<<<<<<<<<   v",
"       v            v                        v",
"       v            v                        v",
"       v            v                        v",
"       v            v                        v",
"       v            v                        v",
"       v            v                        v",
"       v            v                        v",
"       v            v                        v",
"       v            v                        v",
"  v<<<<<            v                        v",
"  v                 v                        v",
"  v                 v                        v",
"  v                 v                        v",
"  v                 v                        v",
"  v                 v                        v",
"  v<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
"  v",
"  v",
"  v",
"  >ff2++o."]
runfish(codebox_arrconv(fibocb));
