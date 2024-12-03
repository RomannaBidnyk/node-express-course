console.log("Express Tutorial");

const express = require("express");
const { products } = require("./data");
const app = express();

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }
  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  let filteredProducts = products;

  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(searchTerm)
    );
  }

  if (req.query.limit) {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      filteredProducts = filteredProducts.slice(0, limit);
    }
  }

  if (req.query.maxPrice) {
    const maxPrice = parseFloat(req.query.maxPrice);
    if (!isNaN(maxPrice) && maxPrice > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price < maxPrice
      );
    }
  }

  res.json(filteredProducts);
});

app.all("*", (req, res) => {
  res.status(404).send("404 - Page Not Found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
