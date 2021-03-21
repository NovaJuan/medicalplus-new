export default async (handler, type, data) => {
  const { ipcRenderer } = window.require("electron");
  const res = await ipcRenderer.invoke(handler, type, data);
  return res;
};
