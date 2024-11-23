import FlexSearch from "flexsearch";

/*
 Prefix Based Search Benchmarking
*/

const dataset = [];
for (let i = 0; i < 100000; i++) {
    dataset.push({ id: i, text: `Sample text entry number ${i}` });
}

const index = new FlexSearch.Index({
    tokenize: "forward",  // Tokenization strategy
    threshold: 0,         // Matching threshold
    resolution: 9,        // Scoring resolution
});


console.time("Indexing Time");
dataset.forEach((item) => {
    index.add(item.id, item.text);
});
console.timeEnd("Indexing Time");

// Perform a search
console.time("Search Time");
const results = index.search("Sample text entry number 500", {limit: 10000});
console.timeEnd("Search Time");

console.log(`Found ${results.length} results.`);
console.log(results);
