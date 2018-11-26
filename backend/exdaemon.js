
const child_process = require('child_process')

function child(exe, args, env) {
    const child = child_process.spawn(exe, args, { 
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore'],
            env: env
    })
    child.unref()
    return child
}

module.exports = function(nodeBin) {
    if (process.env.__daemon) {
        return process.pid
    }
    process.env.__daemon = true

    var args = [].concat(process.argv)
    var node = args.shift()
    var env = process.env
    child(node, args, env)
    return process.exit()
}
