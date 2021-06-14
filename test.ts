import { runfish } from "./fish";
import { codebox_arrconv } from "./codebox_op";
console.log({IP: {dir: 0, posx: 0, posy: 0}, codebox: codebox_arrconv(["1n"]), maxx: 2, maxy: 1});
runfish({IP: {dir: 0, posx: 0, posy: 0}, codebox: codebox_arrconv(["1n"]), maxx: 2, maxy: 1});
