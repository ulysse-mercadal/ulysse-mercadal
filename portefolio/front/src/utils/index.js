export const convertBgMode = (bgMode, fgOrBg) => {
  if (bgMode == "black"){
    return fgOrBg == "f" ? "white" : "black";
  } else {
    return fgOrBg == "f" ? "black" : "white";
  }
}
