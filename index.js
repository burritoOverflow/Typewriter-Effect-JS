function getRandomTimeout(min = 300, max = 800) {
  return Math.random() * (max - min) + min;
}

function createAuthorHeader() {
  const authorHeader = document.createElement("h3");
  authorHeader.id = "author-header";
  const authorStr = "H.P Lovecraft";
  for (let i = 0; i < authorStr.length; i++) {
    const charSpan = document.createElement("span");
    charSpan.classList.add("author-char");
    charSpan.innerText = authorStr.charAt(i);
    authorHeader.appendChild(charSpan);
  }
  return authorHeader;
}

(async function () {
  let doTypingEffect = true;
  const mainHeader = document.getElementById("main-header");

  function styleFinishedText(tokenEl) {
    console.info("Token ", tokenEl.innerText);
    tokenEl.classList.remove("span-token-text");
    tokenEl.classList.add("span-token-text-complete");
  }

  document.getElementById("main-div").addEventListener("click", function () {
    doTypingEffect = false;
  });

  const cursor = document.createElement("span");
  cursor.classList.add("cursor");

  const strContents = `The most merciful thing in the world, 
  I think, is the inability of the human mind to correlate
  all its contents. We live on a placid island of ignorance in the midst of
  black seas of infinity, and it was not meant that we should voyage far. The
  sciences, each straining in its own direction, have hitherto harmed us little;
  but some day the piecing together of dissociated knowledge will open up such
  terrifying vistas of reality, and of our frightful position therein, that we
  shall either go mad from the revelation or flee from the light into the peace
  and safety of a new dark age.`;

  const tokens = strContents.split(" ");

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].replace(/ /g, "").length === 0) {
      console.info("Empty token found");
      continue;
    }

    await new Promise((r) => {
      const timeoutDuration = doTypingEffect ? getRandomTimeout(122, 545) : 15;
      setTimeout(r, timeoutDuration);
    });

    const spanEl = document.createElement("span");
    spanEl.innerText = `${tokens[i]} `;
    spanEl.classList.add("span-token-text");
    mainHeader.appendChild(spanEl);
    mainHeader.appendChild(cursor);

    if (doTypingEffect) {
      setTimeout(() => {
        if (!spanEl) return;
        styleFinishedText(spanEl);
      }, getRandomTimeout(245, 601));
    } else {
      if (!spanEl) return;
      styleFinishedText(spanEl);
    }
  }

  spinner.style.display = "none";
  const unstyled = document.querySelectorAll(".span-token-text");
  unstyled.forEach(function (element) {
    element.classList.remove("span-token-text");
    element.classList.add("span-token-text-complete");
  });

  mainHeader.appendChild(createAuthorHeader());
  mainHeader.removeChild(cursor)
})();
