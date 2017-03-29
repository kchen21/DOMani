export const forCreatingElement = (str) => {
  return (str[0] === "<" && str.slice(-1) === ">");
};

export const parseTag = (str) => {
  let tag = "";

  for (let i = 1; i < str.length; i++) {
    if (str[i] === ">") {
      break;
    } else {
      tag += str[i];
    }
  }

  return tag;
};

export const parseInnerHTML = (str, tagLength) => {
  return str.slice(tagLength + 2, str.length - tagLength - 3);
};
