const { open } = require("node:fs/promises");

function generateTokenMap(parsedStr) {
  const templateRegEx = /({{\w+}})/g;

  // find the start idxs of the template parameters
  const indexMap = [...parsedStr.matchAll(new RegExp(templateRegEx, "gi"))].map(
    (a) => {
      return a.index;
    }
  );

  const tokenMap = indexMap.map((tokenIdx) => {
    // where the indicies are start of the template to the end of the template
    const endIdx = parsedStr.indexOf("}}", tokenIdx) + 2;
    return {
      // substring and start and end idx
      token: parsedStr.substring(tokenIdx + 2, endIdx - 2),
      startIdx: tokenIdx,
      endIdx,
    };
  });

  return tokenMap;
}

(async () => {
  const replacementMap = {
    name: "Steve",
    noun: "potato",
    feel: "tired",
    items: ["banana", "orange", "fruit"],
  };

  function doParse(line) {
    let tempLine = String();
    let tokenArr = Array();

    tokenArr = tokenArr.concat(generateTokenMap(line));
    if (!tokenArr.length) {
      tempLine += line;
    }

    let lastEndIdx = 0;
    tokenArr.forEach((tokenMap) => {
      if (typeof replacementMap[tokenMap.token] === "string") {
        tempLine +=
          line.substring(lastEndIdx, tokenMap.startIdx) +
          replacementMap[tokenMap.token] +
          line.substring(tokenMap.endIdx, tokenMap.endIdx + 1);
        lastEndIdx = tokenMap.endIdx + 1;
      } else if (typeof replacementMap[tokenMap.token] === "object") {
        // no-op for now
        const itemsArr = replacementMap[tokenMap.token];
        let replaceStr = String();
        itemsArr.forEach((item) => {
          replaceStr +=
            line.substring(lastEndIdx, tokenMap.startIdx) +
            item +
            line.substring(tokenMap.endIdx) +
            "\n";
        });
        lastEndIdx = tokenMap.endIdx + 1;
        tempLine += replaceStr;
      }
    });

    outputStr += tempLine;
    outputStr += "\n";
  }
  const file = await open("template.txt");

  let outputStr = String();

  for await (const line of file.readLines()) {
    doParse(line);
  }

  console.info(outputStr);
})();
