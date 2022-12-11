import * as jsonc from "https://deno.land/x/jsonc@1/main.ts";
import * as flags from "https://deno.land/std@0.167.0/flags/mod.ts";

enum CopyMode {
  Copy, // direct copy files
  SoftLink, // may not implement this
  HardLink // create a hard link
}

function fix_path(path: string): string {
  if (path.startsWith("~")) {
    const home = Deno.env.get("HOME");
    if (home == undefined) {
      throw new Error("Can't find home directory for path starting with ~");
    }
    path = path.replace("~", home);
  }
  console.log(path);
  try {
    const realPath = Deno.realPathSync(path);
    return realPath;
  } catch {
    return path;
  }

}

async function parse_config(path: string) {
  const configText = await Deno.readTextFile(path);
  const config = jsonc.parse(configText);
  if (!(config.files instanceof Object)) {
    console.log("Files array not existing");
    throw new Error(); // write custom error, and handle global config instead of local config
  }
  const files: Map<string, string> = config.files;

  for (const [source, dest] of Object.entries(files)) {
    const realSource = fix_path(source);
    if (dest instanceof Array) {
      dest.map(fix_path).map(dest => copy_file(realSource, dest, CopyMode.Copy));
    } else {
      copy_file(realSource, fix_path(dest), CopyMode.Copy);
    }
  }
}


/**
 * Checks the access of a given path and optionally creates the directory
 * @param dir_path The path to the dir to check for access
 * @param options Options object
 * @
 */
async function mass_check_acesss(dir_path: string[], options = {}) {
  return Promise.allSettled(dir_path.map(path => check_access(path, options)));
}

async function copy_file(src: string, dest: string, mode: CopyMode): Promise<void> {
  try {
    await check_access(dest);
  } catch (err) {
    console.error("Can't access destination ", dest, err);
  }
  await Deno.copyFile(src, dest);
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
  return (await Deno.stat(src)).isFile;
}


// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {

  if (Deno.args.length === 0) {
    // read global config file
    console.log("No args provided, looking for global config file...");

  } else {
    const args = flags.parse(Deno.args, {
      boolean: ["init"]
    });

    if (args.init) {
      // initialize repo (create example config file)
      if (args._.length !== 1 || typeof args._[0] !== 'string') {
        console.log("please provide 1 path to initialize a new repo");
        Deno.exit(1);
      } else {
        init_repo(args._[0]);
      }
    } else {
      parse_config(args._[0] as string);
    }
  }

}
