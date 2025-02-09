# Pokémon Matching Cards Game

My first ever React project!

A fun and interactive Pokémon-themed matching cards game built with React, JavaScript/TypeScript, and Bootstrap/CSS.

<img src="https://live.staticflickr.com/65535/54257382696_4a0ca9d9cd_o.gif" alt="Example Image" width="512">

## Features

* **Deck of Pokémon cards**: A randomly generated deck of Pokémon cards, each with a unique image and ID.
* **Matching game**: Players can flip over two cards at a time to try and find a match.
* **Game statistics**: The game keeps track of the number of moves made by the player.
* **Difficulty levels**: Players can choose from three difficulty levels: Easy, Medium, and Hard.
* **Reviews system**: Players can submit reviews of the game, including a rating and comments.
* **Responsive design**: The game is fully responsive and can be played on desktop, tablet, or mobile devices.

## How to Play

1. Start the game by clicking on the "Play" button.
2. Choose a difficulty level: Easy, Medium, or Hard.
3. Flip over two cards at a time by clicking on them.
4. If the cards match, they will stay flipped over. If they don't match, they will flip back over.
5. Keep flipping cards until all the pairs have been found.
6. Submit a review of the game, including a rating and comments.

## Installation

To install the game, follow these steps:

1. Clone the repository using Git: `git clone https://github.com/your-username/pokemon-matching-cards-game.git`
2. Install the dependencies using npm: `npm install`
3. Start the game using npm: `npm start`

## Testing

This project uses Vitest along with React Testing Library to ensure that the game functions as expected. Tests cover key aspects such as:

- **Component Rendering**: Ensuring that all React components render correctly.
- **Game Mechanics**: Verifying the card flipping and matching logic.
- **Game Statistics**: Tracking move counts and validating difficulty settings.
- **Review System**: Testing review submissions and data handling.

To run the tests, execute the following command: `npm run test`

## Acknowledgments

* **Pokémon API**: The Pokémon API used in this game is provided by [PokéAPI](https://pokeapi.co/).
* **React Bootstrap**: The React Bootstrap library used in this game is provided by [React Bootstrap](https://react-bootstrap.github.io/).
