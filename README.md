
# save-heap v0.0.1 [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

```CoffeeScript
saveHeap = require "save-heap"
```

&nbsp;

### saveHeap(timeout, dest)

This will save **three** `.heapsnapshot` files in `dest`. Learn about the [Three Snapshot Technique](https://youtu.be/L3ugr9BJqIs?t=16m).

If `dest` is not yet a directory, it will be automatically created for you.

If no `dest` is given, it defaults to `process.cwd()`.

Below, we save 3 heap snapshots over 10 seconds. The first snapshot is saved immediately. The second snapshot; after 5 seconds. The third; after 10. All three files are found in the `process.cwd() + "/heap-snapshots"` directory.

```CoffeeScript
saveHeap 1e5, "heap-snapshots"
```

&nbsp;

### saveHeap(dest)

This will save a single `.heapsnapshot` file in `dest`.

If `dest` is not yet a directory, it will be automatically created for you.

If no `dest` is given, it defaults to `process.cwd()`.

```
saveHeap "heap-snapshots"
```

&nbsp;

## install

```sh
npm install aleclarson/save-heap#0.0.1
```

&nbsp;
