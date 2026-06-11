const QUESTIONS_PER_RUN = 5;

const animalQuestions = [
  {
    question: "Which animal is known as the king of the jungle?",
    options: ["Elephant", "Lion", "Monkey", "Zebra"],
    answer: "Lion",
    difficulty: "easy",
  },
  {
    question: "What do pandas mostly eat?",
    options: ["Fish", "Bamboo", "Nuts", "Grass"],
    answer: "Bamboo",
    difficulty: "easy",
  },
  {
    question: "Which animal can live in the ocean and on land?",
    options: ["Dolphin", "Frog", "Shark", "Whale"],
    answer: "Frog",
    difficulty: "easy",
  },
  {
    question: "What is a baby dog called?",
    options: ["Cub", "Pup", "Foal", "Kid"],
    answer: "Pup",
    difficulty: "easy",
  },
  {
    question: "Which bird is famous for saying 'hoo hoo'?",
    options: ["Parrot", "Eagle", "Owl", "Swan"],
    answer: "Owl",
    difficulty: "easy",
  },
  {
    question: "Which animal has a very long neck?",
    options: ["Giraffe", "Rabbit", "Koala", "Tiger"],
    answer: "Giraffe",
    difficulty: "easy",
  },
  {
    question: "Where do penguins live?",
    options: ["Deserts", "Rainforests", "Cold icy places", "Caves"],
    answer: "Cold icy places",
    difficulty: "easy",
  },
  {
    question: "Which animal is the largest in the world?",
    options: ["Blue whale", "Hippopotamus", "Elephant", "Gorilla"],
    answer: "Blue whale",
    difficulty: "medium",
  },
  {
    question: "What do bees make?",
    options: ["Milk", "Honey", "Silk", "Cheese"],
    answer: "Honey",
    difficulty: "easy",
  },
  {
    question: "Which animal can hop and carries babies in a pouch?",
    options: ["Koala", "Kangaroo", "Bear", "Fox"],
    answer: "Kangaroo",
    difficulty: "easy",
  },
  {
    question: "Which pet says 'meow'?",
    options: ["Cat", "Dog", "Hamster", "Parrot"],
    answer: "Cat",
    difficulty: "easy",
  },
  {
    question: "Which farm animal gives us wool?",
    options: ["Goat", "Cow", "Sheep", "Duck"],
    answer: "Sheep",
    difficulty: "easy",
  },
  {
    question: "Which animal is known as the fastest land animal?",
    options: ["Cheetah", "Tortoise", "Horse", "Ostrich"],
    answer: "Cheetah",
    difficulty: "medium",
  },
  {
    question: "Which mammal lays eggs?",
    options: ["Platypus", "Kangaroo", "Dolphin", "Elephant"],
    answer: "Platypus",
    difficulty: "hard",
  },
  {
    question: "Which animal is known for its black and white stripes?",
    options: ["Penguin", "Zebra", "Skunk", "Panda"],
    answer: "Zebra",
    difficulty: "easy",
  },
  {
    question: "Which is the largest land animal?",
    options: ["Giraffe", "Elephant", "Rhino", "Hippo"],
    answer: "Elephant",
    difficulty: "medium",
  },
  {
    question: "Which animal carries its home on its back?",
    options: ["Turtle", "Rabbit", "Dog", "Cat"],
    answer: "Turtle",
    difficulty: "medium",
  },
  {
    question: "how many chambers does a giraffe's heart have?",
    options: ["1", "2", "3", "4"],
    answer: "4",
    difficulty: "hard",
  },
  {
    question: "Which animal is known for building dams?",
    options: ["Beaver", "Beetle", "Ant", "Otter"],
    answer: "Beaver",
    difficulty: "medium",
  },
  {
    question: "how many teeth does a great white shark have?",
    options: ["100", "300", "50", "400"],
    answer: "300",
    difficulty: "hard",
  },
];

window.quizConfig = {
  QUESTIONS_PER_RUN,
  animalQuestions,
};