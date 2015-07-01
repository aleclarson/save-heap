(function() {
  var HeapDump, async, log, resolve, saveHeap;

  async = require("io").async;

  log = require("lotus-log");

  resolve = require("path").resolve;

  HeapDump = require("heapdump");

  saveHeap = module.exports = function(timeout, dest) {
    var hasTimeout, path;
    hasTimeout = typeof timeout === "number";
    if (!hasTimeout) {
      dest = timeout;
      timeout = null;
    }
    if (dest == null) {
      dest = saveHeap.dest;
    }
    if (typeof dest !== "string") {
      throw TypeError("'dest' must be a String");
    }
    if (!async.isDir(dest)) {
      throw Error("'" + dest + "' is not a directory");
    }
    if (hasTimeout) {
      saveHeap(dest);
      async.delay(timeout / 2).then(function() {
        return saveHeap(dest);
      });
      return async.delay(timeout).then(function() {
        return saveHeap(dest);
      });
    } else {
      path = resolve(saveHeap.dest + "/" + process.pid + "_" + Date.now() + ".heapsnapshot");
      log.moat(1);
      log("Saving heap to: ");
      log.yellow(path);
      log.moat(1);
      return HeapDump.writeSnapshot(path, function(error) {
        if (error != null) {
          return log.error(error);
        }
      });
    }
  };

  saveHeap.dest = process.cwd();

}).call(this);

//# sourceMappingURL=map/index.js.map
