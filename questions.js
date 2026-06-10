const QUESTIONS_PER_RUN = 5;

const animalQuestions = [
  {
    question: "Which animal is known as the king of the jungle?",
    options: ["Elephant", "Lion", "Monkey", "Zebra"],
    answer: "Lion",
  },
  {
    question: "What do pandas mostly eat?",
    options: ["Fish", "Bamboo", "Nuts", "Grass"],
    answer: "Bamboo",
  },
  {
    question: "Which animal can live in the ocean and on land?",
    options: ["Dolphin", "Frog", "Shark", "Whale"],
    answer: "Frog",
  },
  {
    question: "What is a baby dog called?",
    options: ["Cub", "Pup", "Foal", "Kid"],
    answer: "Pup",
  },
  {
    question: "Which bird is famous for saying 'hoo hoo'?",
    options: ["Parrot", "Eagle", "Owl", "Swan"],
    answer: "Owl",
  },
  {
    question: "Which animal has a very long neck?",
    options: ["Giraffe", "Rabbit", "Koala", "Tiger"],
    answer: "Giraffe",
  },
  {
    question: "Where do penguins live?",
    options: ["Deserts", "Rainforests", "Cold icy places", "Caves"],
    answer: "Cold icy places",
  },
  {
    question: "Which animal is the largest in the world?",
    options: ["Blue whale", "Hippopotamus", "Elephant", "Gorilla"],
    answer: "Blue whale",
  },
  {
    question: "What do bees make?",
    options: ["Milk", "Honey", "Silk", "Cheese"],
    answer: "Honey",
  },
  {
    question: "Which animal can hop and carries babies in a pouch?",
    options: ["Koala", "Kangaroo", "Bear", "Fox"],
    answer: "Kangaroo",
  },
  {
    question: "Which pet says 'meow'?",
    options: ["Cat", "Dog", "Hamster", "Parrot"],
    answer: "Cat",
  },
  {
    question: "Which farm animal gives us wool?",
    options: ["Goat", "Cow", "Sheep", "Duck"],
    answer: "Sheep",
  },
];

window.quizConfig = {
  QUESTIONS_PER_RUN,
  animalQuestions,
};