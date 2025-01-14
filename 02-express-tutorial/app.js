console.log("Express Tutorial");

const express = require("express");
const { products } = require("./data");
const peopleRouter = require("./routes/people");
const cookieParser = require("cookie-parser");
const app = express();

// app.use(express.static("./public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  res.cookie("name", name);
  res.status(201).json({ success: true, message: `Hello, ${name}` });
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ success: true, message: "User logged off" });
});

app.get("/test", auth, (req, res) => {
  res.status(200).json({ success: true, message: `Welcome, ${req.user}` });
});

const logger = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} request to ${req.url}`);
  next();
};

app.use(logger);
app.use(express.static("./methods-public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.use("/api/v1/people", peopleRouter);

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
