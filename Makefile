all : fish.js stack.js stack_op.js codebox_op.js sanity.js test.js

%.js : %.ts
	tsc --target es6 --lib es6,dom $<
