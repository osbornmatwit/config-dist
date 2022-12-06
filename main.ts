import * as fs from "https://deno.land/std@0.166.0/fs/mod.ts";

export function add(a: number, b: number): number {
  return a + b;
}

function read_config(path: string) {

}

/**
 * Creates config file and gitignore if it does not exist in provided location (creating location if it does not exist)
 * @param path Location of repo
 */
function init_repo(path: string) {

}

/**
 * Checks the access of a given path and optionally creates the directory
 * @param dir_path The path to the dir to check for access
 * @param options Options object
 * @
 */
async function check_access(dir_path: string, options = {}) {


}

async function mass_check_acesss(dir_path: string[], options = {}) {
  return Promise.allSettled(dir_path.map(path => check_access(path, options)));
}

enum CopyMode {
  Copy, // direct copy files
  SoftLink, // may not implement this
  HardLink // create a hard link
}

async function copy_file(src: string, dest: string, mode: CopyMode): Promise<void> {
  await copy(src,dest);

}

/**
 * Use this function to check if the file is in it's destination,
 * maybe additionally checking if it is the right file,
 * and then you can prompt for if the file should overwrite the current file
 * @param src Path to source file
 * @param dest Path to destination file
 * @param mode Mode used for copying of the file
 * 
 * For copy, can only check if file exists and has correct contents
 * For softlink, can check if file is correct soft link
 * For hardlink, can just check the number of links to file in source directory
 */
async function check_copied(src: string, mode: CopyMode): Promise<boolean> {
  return exists(path);
}

/**
 * Runs a command to update the config files, defined in the config-dist config file, maybe with a default.
 * For example, you might run git pull
 * @param config Options to be defined
 */
async function run_command(config: Record<string, unknown>) {

}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));

  check_access("./example.json");
}
