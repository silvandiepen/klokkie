import { ipcRenderer } from "electron";

export const resizeNow = () => {
  const containerSize = document
    .querySelector(".container")
    ?.getBoundingClientRect();

  ipcRenderer.send("resize-me-now", {
    width: Math.floor(containerSize?.height || 500),
    height: Math.floor(containerSize?.width || 500),
  });
};
