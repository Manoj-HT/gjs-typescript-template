import Gio from 'gi://Gio';

/**
 * Executes a shell command asynchronously and returns the output.
 * @param argv - The command and arguments as an array of strings.
 * @returns A Promise that resolves with the command's stdout.
 */
export function exec(argv: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const proc = new Gio.Subprocess({
                argv: argv,
                flags: Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE
            });
            
            proc.init(null);
            
            proc.communicate_utf8_async(null, null, (proc, res) => {
                try {
                    if (!proc) {
                        reject(new Error('Process lost'));
                        return;
                    }
                    const [ok, stdout, stderr] = proc.communicate_utf8_finish(res);
                    
                    if (!ok) {
                        reject(new Error('Communication failed'));
                        return;
                    }

                    if (!proc.get_successful()) {
                        const exitStatus = proc.get_exit_status();
                        reject(new Error(stderr ? stderr.trim() : `Command failed with exit code ${exitStatus}`));
                    } else {
                        resolve(stdout ? stdout.trim() : '');
                    }
                } catch (e) {
                    reject(e);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Executes a command with root privileges using pkexec.
 * This will trigger the system's GUI authentication prompt.
 * @param argv - The command and arguments to run as root.
 */
export function execSudo(argv: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const sudoArgv = ['pkexec', ...argv];
            
            const proc = new Gio.Subprocess({
                argv: sudoArgv,
                flags: Gio.SubprocessFlags.NONE
            });
            
            proc.init(null);
            
            proc.wait_check_async(null, (proc, res) => {
                try {
                    if (!proc) {
                        reject(new Error('Process lost'));
                        return;
                    }
                    proc.wait_check_finish(res);
                    resolve();
                } catch (e) {
                    // This throws if the process exits with non-zero status (e.g. user dismissed auth)
                    reject(e);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}
