import FlexSearch from "flexsearch";

/*
 Fuzzy Search Benchmarking
*/

// Configure FlexSearch for fuzzy search
const index = new FlexSearch.Index({
    tokenize: "full",  // Tokenization strategy
    resolution: 3,        // Scoring precision
    threshold: 30000,
});

// Generate and add the large dataset to the index
const largeDataset = Array.from({ length: 100000 }, (_, i) => ({
    id: i,
    text: `Sample entry number ${i}`,
}));

console.time("Indexing Time");
largeDataset.forEach((item) => {
    index.add(item.id, item.text);
})
console.timeEnd("Indexing Time");

// Perform searches and measure search time
const queries = ["Sample entry number 123", "Sample entry number 5000"];
queries.forEach((query) => {
    console.time(`Search time for "${query}"`);
    const results = index.search(query, {limit: 10000});
    console.timeEnd(`Search time for "${query}"`);
    console.log(`Results for "${query}":`, results.length); // Display first 10 results
});

console.time("Search Time");
const res = index.search("Sample entry number")
console.timeEnd("Search Time");

console.log(res)
