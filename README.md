A configuration file installer for linux built in javascript using deno.
# Requirements
Deno:
Run `curl -fsSL https://deno.land/x/install/install.sh | sh` in your shell on linux, or follow the instructions at https://deno.land/manual@v1.28.2/getting_started/installation

[Velociraptor](https://velociraptor.run/) for run scripts


# Running / Building
We use velociraptor to manage run scripts, so you can simply run `vr` to list the available scripts, but here they are for reference:
- `vr run`
Runs the program from source, with additional args passed to the script when it's run.
- `vr test`
Runs the tests in [main_test.ts](main_test.ts)
- `vr build`
Builds the script into a binary called `config-dist`

