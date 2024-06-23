// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = "https://intlayer-m8ehrb3ty-james-daykins-projects.vercel.app";

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Sample species data
const speciesData = [
  {
    id: 1,
    name: "Mean Girls",
    conservationStatus: "https://www.youtube.com/watch?v=oDU84nmSDZY",
    continent: "Comedy",
    populationTrend: "4/5",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/fXm3YKXAEjx7d2tIWDg9TfRZtsU.jpg",
    description:
      "Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.",
  },
  {
    id: 2,
    name: "South Park",
    conservationStatus: "https://www.youtube.com/watch?v=PbMl6DjhJ1I",
    continent: "Comedy",
    populationTrend: "4/5",
    image: "https://flxt.tmsimg.com/assets/p11860901_p_v8_ac.jpg",
    description:
      "South Park: Bigger, Longer & Uncut is a 1999 American adult animated musical comedy film based on the animated sitcom South Park.",
  },
  {
    id: 3,
    name: "Austin Powers",
    conservationStatus: "https://www.youtube.com/watch?v=LGVjoLlgHbM",
    continent: "Comedy",
    populationTrend: "4.5/5",
    image:
      "https://th.bing.com/th/id/OIP.phQs102CS-Qp44IqlRaWrAHaLL?w=110&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    description:
      "Austin Powers: The Spy Who Shagged Me is a 1999 American spy comedy film directed by Jay Roach. It is the second installment in the Austin Powers film series, after International Man of Mystery.",
  },

  {
    id: 4,
    name: "Dumb and Dumber",
    conservationStatus: "https://www.youtube.com/watch?v=l13yPhimE3o",
    continent: "Comedy",
    populationTrend: "4.3/5",
    image:
      "https://th.bing.com/th/id/OIP.jUcrqHwAZWBEX-bDbIytogHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    description:
      "Dumb and Dumber is a 1994 American buddy comedy film directed by Peter Farrelly. The film stars Jim Carrey and Jeff Daniels as dimwitted friends who set out on a cross-country trip to return a briefcase full of money.",
  },
  {
    id: 5,
    name: "The Big Lebowski",
    conservationStatus: "https://www.youtube.com/watch?v=cd-go0oBF4Y",
    continent: "Comedy",
    populationTrend: "4.7/5",
    image:
      "https://th.bing.com/th/id/OIP.h5Vtk2Wsq9xd_5UKdvBbGgHaK-?w=120&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    description:
      "The Big Lebowski is a 1998 American crime comedy film written, produced, and directed by Joel and Ethan Coen. The film stars Jeff Bridges as Jeffrey 'The Dude' Lebowski, a Los Angeles slacker and avid bowler.",
  },
  {
    id: 6,
    name: "There's Something About Mary",
    conservationStatus: "https://www.youtube.com/watch?v=20PQBtyfNZY",
    continent: "Comedy",
    populationTrend: "4.4/5",
    image:
      "https://th.bing.com/th/id/OIP.IGybD_B24y6fl8fgdFYH5AHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    description:
      "There's Something About Mary is a 1998 American romantic comedy film directed by Bobby and Peter Farrelly. The film stars Cameron Diaz as Mary, with Ben Stiller and Matt Dillon as her love interests.",
  },
  {
    id: 7,
    name: "Office Space",
    conservationStatus: "https://www.youtube.com/watch?v=dMIrlP61Z9s",
    continent: "Comedy",
    populationTrend: "4.6/5",
    image:
      "https://th.bing.com/th/id/OIP.KNW8B7FRtQybBZSLW_0KYwHaK-?w=120&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    description:
      "Office Space is a 1999 American black comedy film written and directed by Mike Judge. It satirizes the work life of a typical mid-to-late-1990s software company, focusing on a handful of individuals fed up with their jobs.",
  },
  {
    id: 8,
    name: "Anchorman: The Legend of Ron Burgundy",
    conservationStatus: "https://www.youtube.com/watch?v=NJQ4qEWm9lU",
    continent: "Comedy",
    populationTrend: "4.5/5",
    image:
      "https://th.bing.com/th/id/OIP.Qk3kSxnbkvxLFvg4ljORjAHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    description:
      "Anchorman: The Legend of Ron Burgundy is a 2004 American comedy film directed by Adam McKay. The film stars Will Ferrell as Ron Burgundy, a top-rated newsman in San Diego during the 1970s.",
  },
  {
    id: 9,
    name: "American Pie",
    conservationStatus: "https://www.youtube.com/watch?v=iUZ3Yxok6N8",
    continent: "Comedy",
    populationTrend: "4.2/5",
    image:
      "https://th.bing.com/th/id/OIP.eL8k82OAsPyHdGuQLxemNAHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    description:
      "American Pie is a 1999 American teen sex comedy film directed by Paul Weitz. It is the first film in the American Pie theatrical series and stars Jason Biggs, Chris Klein, and Seann William Scott.",
  },
];

// Array with just the name and description of each species
const speciesNamesAndDescriptions = speciesData.map((species) => ({
  id: species.id,
  name: species.name,
  description: species.description,
  image: species.image,
}));

// Route to get top 5 endangered species for a given continent
app.get("/endangered/:continent", (req, res) => {
  const { continent } = req.params;
  const continentSpecies = speciesData.filter(
    (species) => species.continent === continent
  );
  const sortedSpecies = continentSpecies
    .sort((a, b) => b.populationTrend - a.populationTrend)
    .slice(0, 5);
  res.json(sortedSpecies);
});

// Route to get name and description by id
app.get("/species-descriptions/:id", (req, res) => {
  const { id } = req.params;
  const species = speciesNamesAndDescriptions.find(
    (species) => species.id === parseInt(id)
  );
  if (species) {
    res.json(species);
  } else {
    res.status(404).send({ error: "Species not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
