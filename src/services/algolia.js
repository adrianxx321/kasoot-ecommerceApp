const algoliasearch = require("algoliasearch");
const ALGOLIA_ID = "C6F1EVG98O";
const ALGOLIA_SEARCH_KEY = "d0334b51b96b3557dbc8d20f3ed7ebd9";

const searchProducts = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
const searchProductsIndex = searchProducts.initIndex('kasoot');

// Perform an Algolia search:
// https://www.algolia.com/doc/api-reference/api-methods/search/
export const getShoesQuery = (searchTerm) => {
      return (
        searchProductsIndex.search(searchTerm)
        .then(({hits}) => {
          // Response from Algolia:
          // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
          return hits
        })
      )
}
