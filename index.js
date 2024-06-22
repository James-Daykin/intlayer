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
      "https://www.dvdplanetstore.pk/wp-content/uploads/2014/07/Mean-Girls-2004dvdplanetstorepk.jpg",
    description:
      "The Amur Leopard is one of the world's most endangered wild cats, found in the temperate forests of the Russian Far East and northeastern China. Its population has been drastically reduced due to habitat loss, poaching, and human encroachment.",
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
    name: "Vaquita",
    conservationStatus: "Critically Endangered",
    continent: "America",
    populationTrend: -0.05,
    image:
      "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2022/04/Untitled-design-2022-04-12T161151.368.jpg",
    description:
      "Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.",
  },
  {
    id: 4,
    name: "Sumatran Elephant",
    conservationStatus: "Critically Endangered",
    continent: "Asia",
    populationTrend: -0.04,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Elephant_Sumatra_ProfilG.jpg",
    description:
      "The Sumatran Elephant, a subspecies of the Asian elephant, is critically endangered due to habitat destruction and fragmentation. Found on the Indonesian island of Sumatra, it is under constant threat from deforestation and human-wildlife conflict.",
  },
  {
    id: 5,
    name: "Javan Rhino",
    conservationStatus: "Critically Endangered",
    continent: "Asia",
    populationTrend: -0.06,
    image: "https://rhinos.org/wp-content/uploads/2020/09/Hero-BlackRhino.jpg",
    description:
      "The Javan Rhino is one of the rarest large mammals in the world, with fewer than 70 individuals surviving in Ujung Kulon National Park in Indonesia. It is critically endangered due to habitat loss and poaching.",
  },
  {
    id: 6,
    name: "Mountain Gorilla",
    conservationStatus: "Critically Endangered",
    continent: "Africa",
    populationTrend: 0.02,
    image: "https://static.toiimg.com/img/105480351/Master.jpg",
    description:
      "The Mountain Gorilla, found in the forests of the Virunga Mountains and Bwindi Impenetrable National Park, has shown a slight population increase due to intense conservation efforts. However, it remains critically endangered due to habitat loss and disease.",
  },
  {
    id: 7,
    name: "Hawksbill Turtle",
    conservationStatus: "Critically Endangered",
    continent: "America",
    populationTrend: -0.07,
    image: "https://static.toiimg.com/img/105480351/Master.jpg",
    description:
      "The Hawksbill Turtle, known for its beautiful shell, is critically endangered due to illegal trade, habitat loss, and pollution. It is found in tropical coral reefs around the world, including the Caribbean and Western Atlantic.",
  },
  {
    id: 8,
    name: "Philippine Eagle",
    conservationStatus: "Critically Endangered",
    continent: "Asia",
    populationTrend: -0.04,
    image:
      "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2000432736057/Davao-City-Philippine-Eagle-and-Malagos---1-Day-Tour-2d709507-f7b8-495b-93ae-9c02b9457a96.jpeg?tr=q-60,c-at_max,w-1280,h-720&_src=imagekit",
    description:
      "The Philippine Eagle, one of the largest and most powerful eagles in the world, is critically endangered due to deforestation and hunting. It is endemic to the Philippines and requires vast territories of undisturbed forest to thrive.",
  },
  {
    id: 9,
    name: "Yangtze Finless Porpoise",
    conservationStatus: "Critically Endangered",
    continent: "Asia",
    populationTrend: -0.03,
    image:
      "https://www.wwf.org.uk/sites/default/files/styles/content_slide_image/public/2020-08/Large_WW245010.jpg?h=3e43625b&itok=tKiuJ9ao",
    description:
      "The Yangtze Finless Porpoise, native to the Yangtze River in China, is critically endangered due to habitat degradation, pollution, and heavy boat traffic. Conservation programs are in place to protect this unique freshwater species.",
  },
  {
    id: 10,
    name: "Cross River Gorilla",
    conservationStatus: "Critically Endangered",
    continent: "Africa",
    populationTrend: -0.03,
    image: "https://study.com/cimages/multimages/16/cross_river_gorilla.jpg",
    description:
      "The Cross River Gorilla is the most endangered gorilla subspecies, found only in the border region between Nigeria and Cameroon. Its population is declining due to habitat loss and poaching.",
  },
  // Add the remaining species data here...
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
