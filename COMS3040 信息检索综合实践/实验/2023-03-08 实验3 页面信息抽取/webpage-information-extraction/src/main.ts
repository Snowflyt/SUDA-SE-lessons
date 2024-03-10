import exercise1 from './exercise1.js';
import exercise2 from './exercise2.js';

const EX1_SOURCE_PATH = './data/data1/Ng.htm';
const EX1_OUTPUT_PATH = './output/data1/Ng.txt';
const EX1_SHOW_OUTPUT = true;
const EX2_SOURCE_FOLDER = './data/data2/';
const EX2_OUTPUT_FOLDER = './output/data2/';
const EX2_SHOW_OUTPUT = false;

const main = async () => {
  console.log('Exercise 1:');
  await exercise1(EX1_SOURCE_PATH, EX1_OUTPUT_PATH, EX1_SHOW_OUTPUT);
  if (!EX1_SHOW_OUTPUT) {
    console.log('Done.');
  }

  console.log();

  console.log('Exercise 2:');
  await exercise2(EX2_SOURCE_FOLDER, EX2_OUTPUT_FOLDER, EX2_SHOW_OUTPUT);
  if (!EX2_SHOW_OUTPUT) {
    console.log('Done.');
  }
};

await main();
