BUILDDIR = build
JS = build/fish.js build/stack.js build/stack_op.js build/codebox_op.js build/sanity.js build/test.js

all : $(JS)
	cat $^ | sed 's/import.*//g' | sed 's/export//g' > $(BUILDDIR)/hoho.js

build/%.js : %.ts
	tsc --target es6 --lib es6,dom --outDir $(BUILDDIR) $<

clean :
	rm -f $(BUILDDIR)/*.js
