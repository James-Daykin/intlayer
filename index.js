// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = "https://intlayer-ru6a2okon-james-daykins-projects.vercel.app/";

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
const moviesData = [
  {
    id: 1,
    name: "Mean Girls",
    category: "Comedy",
    rating: "4/5",
    trailer: "https://www.youtube.com/watch?v=oDU84nmSDZY",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/fXm3YKXAEjx7d2tIWDg9TfRZtsU.jpg",
    description:
      "Cady Heron. is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.",
  },
  {
    id: 2,
    name: "South Park",
    category: "Comedy",
    rating: "4/5",
    trailer: "ttps://www.youtube.com/embed/PbMl6DjhJ1I?si=8PkjhAa4K-l4IEfZ",
    image: "https://flxt.tmsimg.com/assets/p11860901_p_v8_ac.jpg",
    description:
      "South Park: Bigger, Longer & Uncut is a 1999 American adult animated musical comedy film based on the animated sitcom South Park.",
  },
  {
    id: 3,
    name: "Austin Powers",
    category: "Comedy",
    rating: "4.5/5",
    trailer: "https://www.youtube.com/watch?v=LGVjoLlgHbM",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/f2ohIBEbc3eERyU5pgSknm8DqUj.jpg",
    description:
      "Austin Powers: The Spy Who Shagged Me is a 1999 American spy comedy film directed by Jay Roach. It is the second installment in the Austin Powers film series, after International Man of Mystery.",
  },
  {
    id: 4,
    name: "Dumb & Dumber",
    category: "Comedy",
    rating: "4.3/5",
    trailer: "https://www.youtube.com/watch?v=l13yPhimE3o",
    image: "https://image.tmdb.org/t/p/w1280/4LdpBXiCyGKkR8FGHgjKlphrfUc.jpg",
    description:
      "Dumb and Dumber is a 1994 American buddy comedy film directed by Peter Farrelly. The film stars Jim Carrey and Jeff Daniels as dimwitted friends who set out on a cross-country trip to return a briefcase full of money.",
  },
  {
    id: 6,
    name: "There's Something About Mary",
    category: "Comedy",
    rating: "4.4/5",
    trailer: "https://www.youtube.com/watch?v=503D8hOfE_8",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/g03pwohXHOI75InM3zraiaEGguO.jpg",
    description:
      "There's Something About Mary is a 1998 American romantic comedy film directed by Bobby and Peter Farrelly. The film stars Cameron Diaz as Mary, with Ben Stiller and Matt Dillon as her love interests.",
  },
  {
    id: 7,
    name: "Office Space",
    category: "Comedy",
    rating: "4.6/5",
    trailer: "https://www.youtube.com/watch?v=rPJUXZvX6UI",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/v7fBXxHZ5WQn2PGgpXhTqHgtcJk.jpg",
    description:
      "Office Space is a 1999 American black comedy film written and directed by Mike Judge. It satirizes the work life of a typical mid-to-late-1990s software company, focusing on a handful of individuals fed up with their jobs.",
  },
  {
    id: 8,
    name: "Anchorman",
    category: "Comedy",
    rating: "4.5/5",
    trailer: "https://www.youtube.com/watch?v=NJQ4qEWm9lU",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/9rQceSyOxJpOVsJRhkgoxNqbkvA.jpg",
    description:
      "Anchorman: The Legend of Ron Burgundy is a 2004 American comedy film directed by Adam McKay. The film stars Will Ferrell as Ron Burgundy, a top-rated newsman in San Diego during the 1970s.",
  },
  {
    id: 9,
    name: "American Pie",
    category: "Comedy",
    rating: "4.2/5",
    trailer: "ttps://www.youtube.com/embed/PbMl6DjhJ1I?si=8PkjhAa4K-l4IEfZ",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/n0nglZOU2uLMAwf1glc6dEWvojC.jpg",
    description:
      "American Pie is a 1999 American teen sex comedy film directed by Paul Weitz. It is the first film in the American Pie theatrical series and stars Jason Biggs, Chris Klein, and Seann William Scott.",
  },
];

// Array with just the name and description of each movie
const moviesNamesAndDescriptions = moviesData.map((movie) => ({
  id: movie.id,
  name: movie.name,
  description: movie.description,
  trailer: movie.trailer,
}));

// Route to get top movies for a given category
app.get("/movies/:category", (req, res) => {
  const { category } = req.params;
  const categoryMovies = moviesData.filter(
    (movie) => movie.category === category
  );
  const sortedMovies = categoryMovies
    .sort((a, b) => b.id - a.id) // Adjust sorting logic as per your data
    .slice(0, 15); // Limit to top 15 movies
  res.json(categoryMovies);
});

// Route to get name and description by id
app.get("/movie-details/:id", (req, res) => {
  const { id } = req.params;
  const movie = moviesNamesAndDescriptions.find(
    (movie) => movie.id === parseInt(id)
  );
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send({ error: "Movie not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
