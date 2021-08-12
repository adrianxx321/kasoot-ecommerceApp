const algoliasearch = require("algoliasearch");
const ALGOLIA_ID = "IFD2BPPZCG";
const ALGOLIA_SEARCH_KEY = "43b4ebd6602c07e3cb971f8042f383ad";

const searchProducts = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
const searchProductsIndex = searchProducts.initIndex('shoes');

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
