function getRandomTimeout(min = 300, max = 1200) {
  return Math.random() * (max - min) + min;
}

(async function () {
  const mainHeader = document.getElementById("main-header");
  const cursor = document.createElement("span");
  cursor.classList.add("cursor");

  const strContents = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Nunc at vulputate arcu. Sed condimentum est ac lectus maximus viverra.
    Nulla rutrum in ipsum sollicitudin iaculis. Donec dignissim tempus leo,
    at convallis magna pretium vulputate. Morbi placerat pretium euismod.
    Sed blandit ut mauris id finibus. In vehicula, dui id fringilla porta,
    nisi sem rutrum diam, ut iaculis ipsum turpis nec arcu. Vivamus hendrerit
    mauris justo, vitae mattis dui iaculis interdum. Maecenas dignissim
    condimentum suscipit. Fusce sit amet ex sagittis, eleifend nunc ac, pulvinar sem.
    Praesent laoreet bibendum tempor. Quisque luctus massa felis, ut venenatis
    nulla volutpat vitae. Cras sodales vel velit eget consequat.`;

  const tokens = strContents.split(" ");

  for (let i = 0; i < tokens.length; i++) {
    console.info(`Sleeping at ${new Date().valueOf()}`);
    await new Promise((r) => setTimeout(r, getRandomTimeout()));

    const spanEl = document.createElement("span");
    spanEl.innerText = `${tokens[i]} `;
    spanEl.classList.add("span-token-text");
    mainHeader.appendChild(spanEl);
    mainHeader.appendChild(cursor);

    setTimeout(() => {
      spanEl.classList.remove("span-token-text");
      spanEl.classList.add("span-token-text-complete");
    }, getRandomTimeout());
  }

  spinner.style.display = "none";
})();
