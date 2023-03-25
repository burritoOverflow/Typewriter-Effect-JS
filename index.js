function chooseRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

(async function () {
  const mainHeader = document.getElementById("main-header");
  const timeouts = [411, 611, 1102, 202, 313];

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
    console.info(`Sleeping at ${new Date()}`);
    await new Promise((r) => setTimeout(r, chooseRandomElement(timeouts)));

    const spanEl = document.createElement("span");
    spanEl.innerText = `${tokens[i]} `;
    spanEl.classList.add("span-token-text");
    mainHeader.appendChild(spanEl);
    mainHeader.appendChild(cursor);

    setTimeout(() => {
      spanEl.classList.remove("span-token-text");
      spanEl.classList.add("span-token-text-complete");
    }, chooseRandomElement(timeouts));
  }

  spinner.style.display = "none";
})();
