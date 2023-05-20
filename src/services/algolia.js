import algoliasearch from "algoliasearch/lite";
const client = algoliasearch("C6F1EVG98O", "48808055ab14d1844e57f54dff6a4e82");
const index = client.initIndex('kasoot');

// Perform an Algolia search:
// https://www.algolia.com/doc/api-reference/api-methods/search/
export const searchProducts = (searchTerm) => {
  return (
    index.search(searchTerm)
    .then(({hits}) => {
      // Response from Algolia:
      // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
      return hits
    }, (err) => {
      console.error(err)
      
      return []
    })
  )
}
