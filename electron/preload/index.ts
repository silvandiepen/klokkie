function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  },
};

function useLoading() {
  const styleContent = `
@keyframes rotateHand {
  0%{
    transform: translateX(-50%) rotate(0deg);
  }
  100%{
    transform: translateX(-50%) rotate(360deg);
  }
}
.clock{
  width: 4em; height: 4em; border-radius: 50%; border: .2em solid white;
  background-color: transparent;
  position: relative;
}
.clock__hand{
  height: 1.5em; width: .2em; background-color: currentColor;
  display: block; position: absolute; 
  bottom: 50%; left: 50%; transform: translateX(-50%);
  transform-origin: 50% 100%;
}
.clock__hand--hour{
  animation:rotateHand 12s 0s linear infinite;
  height: 1em;
}
.clock__hand--minute{
  animation:rotateHand .6s 0s  linear infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff8800;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="app-loading-wrap">
    <div class="clock">
      <span class="clock__hand clock__hand--hour"></span>
      <span class="clock__hand clock__hand--minute"></span>
    </div>
  </div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);
