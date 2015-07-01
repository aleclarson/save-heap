
{ async, sync } = require "io"
log = require "lotus-log"
{ resolve } = require "path"
HeapDump = require "heapdump"

saveHeap = module.exports = (timeout, dest) ->

  hasTimeout = typeof timeout is "number"

  if !hasTimeout
    dest = timeout
    timeout = null

  dest ?= saveHeap.dest

  if typeof dest isnt "string"
    throw TypeError "'dest' must be a String"

  sync.makeDir dest

  # Use the three snapshot technique if a 'timeout' is given.
  if hasTimeout
    _saveHeap dest
    async.delay(timeout / 2).then -> _saveHeap dest
    async.delay(timeout).then -> _saveHeap dest

  # Just take a single snapshot otherwise.
  else _saveHeap dest

saveHeap.dest = process.cwd()

_saveHeap = (dest) ->

  path = resolve saveHeap.dest + "/" + process.pid + "_" + Date.now() + ".heapsnapshot"

  log.moat 1
  log "Saving heap to: "
  log.yellow path
  log.moat 1

  async.
  HeapDump.writeSnapshot path, (error) ->
    log.error error if error?
