// server.js
const express = require("express");
const app = express();
const PORT = 3001;

var cors = require("cors");

app.use(cors);

// Sample species data
const speciesData = [
  {
    name: "Amur Leopard",
    conservationStatus: "Critically Endangered",
    continent: "Asia",
    populationTrend: -0.03,
    image:
      "https://wildscapia.com/wp-content/uploads/2020/05/amur-leopard-4112011_1280.jpg",
  },
  {
    name: "Black Rhino",
    conservationStatus: "Critically Endangered",
    continent: "Africa",
    populationTrend: -0.05,
    image: "",
  },
  {
    name: "Vaquita",
    conservationStatus: "Critically Endangered",
    continent: "North America",
    populationTrend: -0.05,
    image: "",
  },
  {
    name: "Sumatran Elephant",
    conservationStatus: "Critically Endangered",
    continent: "Asia",
    populationTrend: -0.04,
    image: "",
  },
  {
    name: "Javan Rhino",
    conservationStatus: "Critically Endangered",
    continent: "Asia",
    populationTrend: -0.06,
    image: "",
  },
  {
    name: "Mountain Gorilla",
    conservationStatus: "Critically Endangered",
    continent: "Africa",
    populationTrend: 0.02,
    image: "",
  },
  {
    name: "Hawksbill Turtle",
    conservationStatus: "Critically Endangered",
    continent: "South America",
    populationTrend: -0.07,
    image: "",
  },
  {
    name: "Philippine Eagle",
    conservationStatus: "Critically Endangered",
    continent: "Asia",
    populationTrend: -0.04,
    image: "",
  },
  {
    name: "Yangtze Finless Porpoise",
    conservationStatus: "Critically Endangered",
    continent: "Asia",
    populationTrend: -0.03,
    image: "",
  },
  {
    name: "Cross River Gorilla",
    conservationStatus: "Critically Endangered",
    continent: "Africa",
    populationTrend: -0.03,
    image: "",
  },
];

// Route to get top 5 endangered species for a given continent
app.get("/endangered/:continent", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { continent } = req.params;
  const continentSpecies = speciesData.filter(
    (species) => species.continent === continent
  );
  const sortedSpecies = continentSpecies
    .sort((a, b) => b.populationTrend - a.populationTrend)
    .slice(0, 5);
  res.json(sortedSpecies);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
