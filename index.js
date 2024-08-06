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
    year: 2004,
    trailer: "https://www.youtube.com/embed/oDU84nmSDZY?si=NDnwhf8WsHfAIJ0X",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/fXm3YKXAEjx7d2tIWDg9TfRZtsU.jpg",
    description:
      "Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.",
  },
  {
    id: 2,
    name: "South Park",
    category: "Comedy",
    rating: "4/5",
    year: 1999,
    trailer: "https://www.youtube.com/embed/PbMl6DjhJ1I?si=8PkjhAa4K-l4IEfZ",
    image: "https://flxt.tmsimg.com/assets/p11860901_p_v8_ac.jpg",
    description:
      "South Park: Bigger, Longer & Uncut is a 1999 American adult animated musical comedy film based on the animated sitcom South Park.",
  },
  {
    id: 3,
    name: "Austin Powers",
    category: "Comedy",
    rating: "4.5/5",
    year: 1999,
    trailer: "https://www.youtube.com/embed/LGVjoLlgHbM?si=duoUmqHpDdrhEGzg",
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
    year: 1994,
    trailer: "https://www.youtube.com/embed/l13yPhimE3o?si=tBGqK9eI-hbO1i1V",
    image: "https://image.tmdb.org/t/p/w1280/4LdpBXiCyGKkR8FGHgjKlphrfUc.jpg",
    description:
      "Dumb and Dumber is a 1994 American buddy comedy film directed by Peter Farrelly. The film stars Jim Carrey and Jeff Daniels as dimwitted friends who set out on a cross-country trip to return a briefcase full of money.",
  },
  {
    id: 5,
    name: "Superbad",
    category: "Comedy",
    rating: "4.4/5",
    year: 2007,
    trailer: "https://www.youtube.com/embed/4eaZ_48ZYog?si=mufbflUiCrRlEtSN",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
    description:
      "Superbad is a 2007 American coming-of-age teen comedy film directed by Greg Mottola and produced by Judd Apatow. The film stars Jonah Hill and Michael Cera as two teenagers about to graduate from high school.",
  },
  {
    id: 6,
    name: "Office Space",
    category: "Comedy",
    rating: "4.6/5",
    year: 1999,
    trailer: "https://www.youtube.com/embed/rPJUXZvX6UI?si=n6F_hchGRFYjw3XM",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/v7fBXxHZ5WQn2PGgpXhTqHgtcJk.jpg",
    description:
      "Office Space is a 1999 American black comedy film written and directed by Mike Judge. It satirizes the work life of a typical mid-to-late-1990s software company, focusing on a handful of individuals fed up with their jobs.",
  },
  {
    id: 7,
    name: "Anchorman",
    category: "Comedy",
    rating: "4.5/5",
    year: 2004,
    trailer: "https://www.youtube.com/embed/QvJ1K0_JzFI?si=LNDFybSU6LKuVwpr",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/9rQceSyOxJpOVsJRhkgoxNqbkvA.jpg",
    description:
      "Anchorman: The Legend of Ron Burgundy is a 2004 American comedy film directed by Adam McKay. The film stars Will Ferrell as Ron Burgundy, a top-rated newsman in San Diego during the 1970s.",
  },
  {
    id: 8,
    name: "American Pie",
    category: "Comedy",
    rating: "4.2/5",
    year: 1999,
    trailer: "https://www.youtube.com/embed/iUZ3Yxok6N8?si=D4iJGQc1b_aH2gEx",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/n0nglZOU2uLMAwf1glc6dEWvojC.jpg",
    description:
      "American Pie is a 1999 American teen sex comedy film directed by Paul Weitz. It is the first film in the American Pie theatrical series and stars Jason Biggs, Chris Klein, and Seann William Scott.",
  },
  {
    id: 9,
    name: "Titanic",
    category: "Romance",
    rating: "4.8/5",
    year: 1997,
    trailer: "https://www.youtube.com/embed/CHekzSiZjrY?si=svYWG2C13vFgoJg1",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    description:
      "Titanic is a 1997 American epic romance and disaster film directed, written, produced, and co-edited by James Cameron. It stars Leonardo DiCaprio and Kate Winslet as members of different social classes who fall in love aboard the RMS Titanic during its ill-fated maiden voyage.",
  },
  {
    id: 10,
    name: "Her",
    category: "Romance",
    rating: "4.6/5",
    year: 2013,
    trailer: "https://www.youtube.com/embed/dJTU48_yghs?si=r0UO_6HHiGdoGYTX",
    image: "https://image.tmdb.org/t/p/w1280/lEIaL12hSkqqe83kgADkbUqEnvk.jpg",
    description:
      "Her is a 2013 American science-fiction romantic drama film written, directed, and produced by Spike Jonze. It marks Jonze's solo screenwriting debut. The film follows Theodore Twombly (Joaquin Phoenix), a man who develops a relationship with Samantha (Scarlett Johansson), an artificially intelligent virtual assistant personified through a female voice.",
  },
  {
    id: 11,
    name: "Ghost",
    category: "Romance",
    rating: "4.5/5",
    year: 1990,
    trailer: "https://www.youtube.com/embed/8uubih798tg?si=owVhXdHq7ITqG6lg",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/w9RaPHov8oM5cnzeE27isnFMsvS.jpg",
    description:
      "Ghost is a 1990 American romantic fantasy thriller film directed by Jerry Zucker from a screenplay by Bruce Joel Rubin. The film stars Patrick Swayze, Demi Moore, Whoopi Goldberg, Tony Goldwyn, and Rick Aviles.",
  },
  {
    id: 12,
    name: "Twilight",
    category: "Romance",
    rating: "4/5",
    year: 2008,
    trailer: "https://www.youtube.com/embed/QDRLSqm_WVg?si=7RScYuZMbbJ9WPpD",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/3Gkb6jm6962ADUPaCBqzz9CTbn9.jpg",
    description:
      "Twilight is a 2008 American romantic fantasy film based on Stephenie Meyer's 2005 novel of the same name. Directed by Catherine Hardwicke, it stars Kristen Stewart and Robert Pattinson.",
  },
  {
    id: 13,
    name: "Amélie",
    category: "Romance",
    rating: "4.5/5",
    year: 2001,
    trailer: "https://www.youtube.com/embed/Py7cDXQae2U?si=VNDSmQKgmxX7HX_J",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg",
    description:
      "Amélie is a 2001 French romantic comedy film directed by Jean-Pierre Jeunet. It stars Audrey Tautou as the title character, a shy waitress who decides to change the lives of those around her for the better while grappling with her own isolation.",
  },
  {
    id: 14,
    name: "Once",
    category: "Romance",
    rating: "4.3/5",
    year: 2007,
    trailer: "https://www.youtube.com/embed/K4uFFNl6FQ4?si=ZxNCfbNJzQqTAnH",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/7nW363kSYRCkr4VGOMvuSGwtzKs.jpg",
    description:
      "Once is a 2007 Irish romantic musical drama film written and directed by John Carney. The film stars Glen Hansard and Markéta Irglová as two struggling musicians in Dublin, Ireland.",
  },
  {
    id: 15,
    name: "The Notebook",
    category: "Romance",
    rating: "4.6/5",
    year: 2004,
    trailer: "https://www.youtube.com/embed/BjJcYdEOI0k?si=849jpAw3V_UKSPDA",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
    description:
      "The Notebook is a 2004 American romantic drama film directed by Nick Cassavetes and based on Nicholas Sparks' 1996 novel of the same name. The film stars Ryan Gosling and Rachel McAdams as a young couple who fall in love in the 1940s.",
  },
  {
    id: 16,
    name: "La La Land",
    category: "Romance",
    rating: "4.7/5",
    year: 2016,
    trailer: "https://www.youtube.com/embed/0pdqf4P9MB8?si=NkcmduCvN0L9M2kt",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    description:
      "La La Land is a 2016 American romantic musical film written and directed by Damien Chazelle. It stars Ryan Gosling as a jazz pianist and Emma Stone as an aspiring actress, who meet and fall in love while pursuing their dreams in Los Angeles.",
  },
  {
    id: 17,
    name: "Die Hard",
    category: "Action",
    rating: "4.8/5",
    year: 1988,
    trailer: "https://www.youtube.com/embed/jaJuwKCmJbY?si=_YYgQeIrKVAyOIuy",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/7Bjd8kfmDSOzpmhySpEhkUyK2oH.jpg",
    description:
      "Die Hard is a 1988 American action film directed by John McTiernan and written by Jeb Stuart and Steven E. de Souza. It stars Bruce Willis as New York City Police Department officer John McClane who is caught in a Los Angeles skyscraper during a Christmas Eve heist.",
  },
  {
    id: 18,
    name: "The Dark Knight",
    category: "Action",
    rating: "4.9/5",
    year: 2008,
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY?si=QiuYc_n9DN5WEKtS",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description:
      "The Dark Knight is a 2008 superhero film directed, produced, and co-written by Christopher Nolan. Based on the DC Comics character Batman, the film is the second installment of Nolan's The Dark Knight Trilogy and a sequel to 2005's Batman Begins.",
  },
  {
    id: 19,
    name: "Inception",
    category: "Action",
    rating: "4.7/5",
    year: 2010,
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0?si=qFkLh_InXoQaYo9F",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    description:
      "Inception is a 2010 science fiction action film written and directed by Christopher Nolan. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.",
  },
  {
    id: 20,
    name: "Mad Max",
    category: "Action",
    rating: "4.8/5",
    year: 2015,
    trailer: "https://www.youtube.com/embed/hEJnMQG9ev8?si=86Bd3nboqtCetDrc",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    description:
      "Mad Max: Fury Road is a 2015 post-apocalyptic action film co-written, produced, and directed by George Miller. It stars Tom Hardy as Max Rockatansky, who joins forces with Imperator Furiosa (Charlize Theron) to flee from cult leader Immortan Joe and his army in a War Rig.",
  },
  {
    id: 21,
    name: "Gladiator",
    category: "Action",
    rating: "4.7/5",
    year: 2000,
    trailer: "https://www.youtube.com/embed/P5ieIbInFpg?si=qgt40FWhdb4qkRF2",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    description:
      "Gladiator is a 2000 epic historical drama film directed by Ridley Scott and written by David Franzoni, John Logan, and William Nicholson. The film stars Russell Crowe as Roman general Maximus Decimus Meridius, who is betrayed and seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.",
  },
  {
    id: 22,
    name: "John Wick",
    category: "Action",
    rating: "4.6/5",
    year: 2014,
    trailer: "https://www.youtube.com/embed/C0BMx-qxsP4?si=1Ic5ze9YYuYw_b-e",
    image:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    description:
      "John Wick is a 2014 neo-noir action thriller film directed by Chad Stahelski and written by Derek Kolstad. It stars Keanu Reeves as John Wick, a retired hitman seeking vengeance for the killing of his dog, a gift from his recently deceased wife.",
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
app.get("/movies/:category", (req, res) => {
  const { category } = req.params;
  const categoryMovies = moviesData.filter(
    (movie) => movie.category === category
  );
  const sortedMovies = categoryMovies.sort((a, b) => b.id - a.id).slice(0, 15);
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
