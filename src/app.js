const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

const geoCodeRequest = require("./utils/geo-code");
const foreCast = require("./utils/fore-cast");

const port = process.env.PORT || 8080;

//Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../src/templates/views");
const partialsPath = path.join(__dirname, "../src/templates/partials");

//Setup Static Directory to Serve
app.use(express.static(publicDir));
hbs.registerPartials(partialsPath);

//Handle Bars
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Details",
    name: "Praveena App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Head",
    name: "About Praveena",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "This is from Help Template",
    name: "Pls take help from pravs",
  });
});

app.get("/weather", (req, res) => {
  res.send({ foreCast: "-50,30", location: "Kuppam" });
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({
      error: "Please provide the search option on query string",
    });

  res.send({
    products: [],
  });
});

app.get("/address", (req, res) => {
  geoCodeRequest(
    req.query.address,
    (error, { latitude, longitude, location }) => {
      if (error) return res.send({ error: "Provide address to get details" });

      foreCast(latitude, longitude, (err, resp = {}) => {
        if (err)
          return res.send({
            error: "Unable to find the details for current location",
          });
        res.send({ foreCast: resp, location, address: req.query.address });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("defaultError", {
    title: "Page Not Found",
    name: "Vinodh Kumar",
    errorMessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("defaultError", {
    title: "404",
    name: "V praveena",
    errorMessage: "Page Not Found",
  });
});

app.get("/help/*", (req, res) => {
  res.send("Request URL not found");
});

app.get("*", (req, res) => {
  res.send("404 Not Found");
});

app.listen(port);
