import { ipcRenderer } from "electron";

export const resizeNow = () => {
//   const sizes: number[] = [];
//   const times = document.querySelectorAll(".time");
//   times.forEach((t) => {
//     sizes.push(t.getBoundingClientRect().width);
//   });
//   const minWidth = Math.max(...sizes);

  const containerSize = document
    .querySelector(".container")
    ?.getBoundingClientRect();

//   const width = Math.max(minWidth, containerSize?.width || 0);

  ipcRenderer.send("resize-me-now", {
    width: Math.floor(containerSize?.width || 500),
    height: Math.floor(containerSize?.height || 500),
  });
};
export const reloadWindow = ()=>{
    ipcRenderer.send('reload-me-now',{})
}

export const setOnTop = (ontop: boolean)=>{
  ipcRenderer.send('set-on-top',ontop)
}
