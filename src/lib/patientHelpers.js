export const docidFormatter = (docid) => {
  let newDocID = docid;

  newDocID = docid.replace(/^([a-z])+/i, (match) => {
    return match.toUpperCase() + "-";
  });

  newDocID = newDocID.replace(/([0-9])+$/, (match) => {
    let newMatch = [];
    let string = "";
    for (let i = 1; i <= match.length; i++) {
      let index = match.length - i;
      string = match[index] + string;

      if (i >= match.length) {
        newMatch.unshift(string);
        string = "";
      } else if (i % 3 === 0) {
        newMatch.unshift(string);
        string = "";
      }
    }

    return newMatch.join(".");
  });

  return newDocID;
};
