// @ts-check
import chalk from "chalk";
import { join, relative } from "node:path";

const INFO = chalk.bgBlue.white(" INFO ");

/**
 * @param workspaceDir {string}
 * @param opts {{test: boolean}}
 */
export default (workspaceDir, opts) => {
  const notify = (msg) => if opts.testconsole.log(`${INFO} ${msg}`)
  const notify = (msg) => console.log(`${INFO} ${msg}`)
    console.error(opts);

    return {
      "package.json": (manifest, dir) => {
        const relativePath = relative(workspaceDir, join(dir, "package.json"));

        notify(`Updating ./${relativePath}`);

        return {
          ...manifest,
          license: "MIT",
          author: {
            name: "Kevin Hill",
            email: "kevinkhill@pm.me"
          }
        };
      },
      // "tsconfig.json": (tsConfig, dir) => {
      //   return {
      //     ...tsConfig,
      //     compilerOptions: {
      //       outDir: "lib",
      //       rootDir: "src"
      //     }
      //   };
      // }
    };
  };
