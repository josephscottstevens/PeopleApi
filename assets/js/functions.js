export function id(t) {
  return t;
}

export function groupBy(items = [], func) {
  const map = new Map();
  items.forEach((item) => {
    const key = func(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return [...map];
}

export function countCharacters(str = "") {
  const items = str.split("");
  const groupedItems = groupBy(items, id);

  return groupedItems.map(t => [t[0], t[1].length]);
}

export function getEditDistance(a = "", b = "") {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

export function onlyDupes(items = [], minDistance = 2) {
  const dupes = [];
  // For every item in list, compare to every other item
  for (var i = 0; i < items.length; i++) {
    for (var j = i + 1; j < items.length; j++) {
      if (getEditDistance(items[i], items[j]) <= minDistance) {
        dupes.push([items[i], items[j]]);
      }
    }
  }
  return dupes;
}

export function listPossibleDupes(items = [], minDistance = 2) {
  const byThree = (t) => {
    return Math.floor(t.length / 3);
  }
  const groupedEmails = groupBy(items, byThree).map(t => t[1]);
  return groupedEmails.map(t => onlyDupes(t, minDistance)).reduce((a, b) => a.concat(b), []);
}

export function filterForPossibleDupes(items) {
  return items
}