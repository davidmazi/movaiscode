import neatCsv from "neat-csv";
import * as fs from "fs";

const listStream = fs.createReadStream("list.csv");
const listObject = await neatCsv(listStream, { headers: false });
const words = listObject.map((o) => o[0]);

const wordsCount = {};

// Init wordsCount : {word1 : 0, word2: 0...}
for (const word of words) {
  wordsCount[word] = 0;
}

// Populate wordsCount with number of appearances: {word1 : 4, word2 : 1...}
for (const word of words) {
  wordsCount[word]++;
}

const wordToFind = "cadeau";

// Find if word to find is present in words count
const result = isWordPresent(wordToFind, wordsCount);
if (result.isPresent) {
  console.log(
    `The word ${wordToFind} is present ${wordsCount[wordToFind]} times, found in ${result.iteration} iterations`
  );
} else {
  console.log(`The word ${wordToFind} is not present`);
}

function isWordPresent(
  wordToFind,
  wordsCount,
  iteration = -1,
  currentPosition = 0
) {
  if (Object.keys(wordsCount)[currentPosition] === wordToFind) {
    return { isPresent: true, iteration };
  }
  iteration++;
  // Select a random index to find if they have common letters (at the same index)
  const searchIndexInWord = Math.floor(
    Math.random() * Object.keys(wordsCount).length
  );

  if (
    // They have at least one letter in common in the same index
    Object.keys(wordsCount)[searchIndexInWord][searchIndexInWord] ==
    wordToFind[searchIndexInWord]
  ) {
    return isWordPresent(wordToFind, wordsCount, iteration, searchIndexInWord);
  }
  // Keep searching with another letter
  return isWordPresent(wordToFind, wordsCount, iteration);
}
