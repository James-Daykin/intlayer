// server.ts
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000; // Updated PORT to a valid number for local development

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Sample movie data interface
interface Movie {
  id: number;
  name: string;
  category: string;
  rating: string;
  year: number;
  trailer: string;
  image: string;
  description: string;
}

// Sample movie data
const moviesData: Movie[] = [
  {
    id: 1,
    name: "Mean Girls",
    category: "Comedy",
    rating: "4/5",
    year: 2004,
    trailer: "https://www.youtube.com/embed/oDU84nmSDZY?si=NDnwhf8WsHfAIJ0X",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/fXm3YKXAEjx7d2tIWDg9TfRZtsU.jpg",
    description:
      "Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.",
  },
  {
    id: 2,
    name: "The Matrix",
    category: "Sci-Fi",
    rating: "5/5",
    year: 1999,
    trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/9dA8x4foECFY4vfsZsROgsieN0y.jpg",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 3,
    name: "Inception",
    category: "Sci-Fi",
    rating: "4.5/5",
    year: 2010,
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/rI7rg8iDAsE4gLlA93U9Asoitmf.jpg",
    description:
      "A thief who enters the dreams of others to steal secrets from their subconscious is given a chance to have his criminal history erased as payment for implanting another person's idea into a target's subconscious.",
  },
  {
    id: 4,
    name: "The Shawshank Redemption",
    category: "Drama",
    rating: "5/5",
    year: 1994,
    trailer: "https://www.youtube.com/embed/6hB3S9bIaco",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/9QZzpZ5fHoFakmG9TjS1pOGU89I.jpg",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 5,
    name: "The Godfather",
    category: "Crime",
    rating: "5/5",
    year: 1972,
    trailer: "https://www.youtube.com/embed/sY1S34973zA",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/cHkF7yGE4KO4HfR4xTAMIny3LTr.jpg",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: 6,
    name: "Pulp Fiction",
    category: "Crime",
    rating: "4.5/5",
    year: 1994,
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/cx4z4S1AeR1kUlTYPbJfO7C0xgf.jpg",
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 7,
    name: "Forrest Gump",
    category: "Drama",
    rating: "5/5",
    year: 1994,
    trailer: "https://www.youtube.com/embed/bLvqoHBptjg",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/5KCVkau1HEl7b5iY4GHa1t8HT7y.jpg",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Civil Rights Movement, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
  },
  {
    id: 8,
    name: "Interstellar",
    category: "Sci-Fi",
    rating: "4.5/5",
    year: 2014,
    trailer: "https://www.youtube.com/embed/2LqzF5WauAw",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/5hQYgDqLdr7J5iW9HhAxklxHXtx.jpg",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 9,
    name: "The Dark Knight",
    category: "Action",
    rating: "5/5",
    year: 2008,
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/1hRoyzDtpgMU7Dz4JF6u9a3W8l6.jpg",
    description:
      "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, forcing Batman to reluctantly join forces with his old ally, Commissioner Gordon, and his new partner, Harvey Dent, to take down the criminals that plague the streets.",
  },
  {
    id: 10,
    name: "The Avengers",
    category: "Action",
    rating: "4.5/5",
    year: 2012,
    trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/8b9t3O8sEvAZyHn5lK1xHE5W7f5.jpg",
    description:
      "Nick Fury of S.H.I.E.L.D. brings together a team of superheroes to form The Avengers, who must stop Loki from subjugating Earth.",
  },
  {
    id: 11,
    name: "Gladiator",
    category: "Action",
    rating: "4/5",
    year: 2000,
    trailer: "https://www.youtube.com/embed/owK1qxDselE",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/1yBe6oKJ22km1nEPMmNSI5Zl6Z0.jpg",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
  },
  {
    id: 12,
    name: "Fight Club",
    category: "Drama",
    rating: "4.5/5",
    year: 1999,
    trailer: "https://www.youtube.com/embed/qtRKdVHc-cE",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/6C2aHV5j0ue1syFhUbFFWaDvtz3.jpg",
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.",
  },
  {
    id: 13,
    name: "The Silence of the Lambs",
    category: "Thriller",
    rating: "4.5/5",
    year: 1991,
    trailer: "https://www.youtube.com/embed/VpO5p9v2QUA",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/k8yME84TfR6x8EtPYHfDzXMC5ri.jpg",
    description:
      "A young FBI cadet must confide in an incarcerated and manipulative cannibal killer to receive his help on catching another serial killer who skins his victims.",
  },
  {
    id: 14,
    name: "Jurassic Park",
    category: "Adventure",
    rating: "4/5",
    year: 1993,
    trailer: "https://www.youtube.com/embed/LCi7sMydOdI",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/cQkDk8c9E1RQScSHWb7vco5P4PA.jpg",
    description:
      "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
  },
  {
    id: 15,
    name: "Back to the Future",
    category: "Adventure",
    rating: "4.5/5",
    year: 1985,
    trailer: "https://www.youtube.com/embed/qvsgGtivCgs",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/kWqY5Gzj9YBLwyJ8b6on6Sc0wm0.jpg",
    description:
      "A young man is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, eccentric scientist Doc Brown.",
  },
];

// Array with just the name and description of each movie
const moviesNamesAndDescriptions = moviesData.map((movie) => ({
  id: movie.id,
  name: movie.name,
  category: movie.category,
  image: movie.image,
  year: movie.year,
  rating: movie.rating,
  description: movie.description,
  trailer: movie.trailer,
}));

// Route to get top movies for a given category
app.get("/movies/:category", (req: Request, res: Response) => {
  const { category } = req.params;
  const categoryMovies = moviesData.filter(
    (movie) => movie.category === category
  );
  const sortedMovies = categoryMovies.sort((a, b) => b.id - a.id).slice(0, 15);
  res.json(sortedMovies);
});

// Route to get name and description by id
app.get("/movie-details/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = moviesNamesAndDescriptions.find(
    (movie) => movie.id === parseInt(id, 10)
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
