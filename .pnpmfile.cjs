const enforceSingleVersion = [
  "eslint",
  "react",
  "react-dom",
  "typescript",
  "@types/node",
  "@types/react"
]


function afterAllResolved(lockfile, context) {
  context.log(`Checking for duplicated packages...`);

  const found = {};
  const packagesKeys = Object.keys(lockfile.packages);

  packagesKeys.forEach(p => {
    enforceSingleVersion.forEach(x => {
      if (p.startsWith(`/${x}/`)) {
        if (found[x]) {
          found[x] += 1;
        } else {
          found[x] = 1;
        }
      }
    })

  })

  let msg = ""

  for (let p in found) {
    const count = found[p];
    if (count > 1) {
      msg += `${p} found ${count} times\n`;
    }
  }

  if (msg) {
    context.log(Error(msg));
  } else {
    context.log(`None found!`);
  }

  return lockfile;
}

module.exports = {
  hooks: {
    afterAllResolved
  }
};
