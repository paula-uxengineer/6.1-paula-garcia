# 6.1-paula-garcia

# Dice Game API

> This project is a REST API developed in Node.js using TypeScript and follows the principles of SOLID Clean Architecture. It provides functionalities for a dice game, including player management, dice rolls, and a player ranking based on their success in the game.

### Features

- Player Management: Registration, update, and deletion of players.
- Dice Rolls: Recording and deletion of dice rolls for players.
- Player Ranking: Display of players ranked by their success in the game.

### Technologies Used

- Node.js
- TypeScript
- Express.js
- Prisma (ORM for interacting with the database)
- MySQL (Relational database)
- Docker (For managing the database)

### Prerequisites

- Node.js and npm installed on your system.
- Docker installed on your system.

### Installation

1. Clone this repository on your local machine:

```bash
git clone https://github.com/your-username/dice-game-api.git
```

2. Navigate to the project directory:

```bash
cd dice-game-api
```

3. Install the project dependencies:

```bash
npm install
```

Copy the .env.example file and rename it to .env. Make sure to configure the environment variables according to your preferences.

### Execution

1. Start the MySQL database using Docker:

```bash
docker-compose up -d
```

2. Start the application:

```bash
npm run dev
```

The API will be available at http://localhost:3000.

### Running Tests

To ensure all works as expected, all functions and routes were tested using Supertest and Jest.

Run this command to every function and route on /players

```bash
npm run test:players
```

Run this command to every function and route on /games

```bash
npm run test:games
```

Run this command to every function and route on /ranking

```bash
npm run test:ranking
```

This project is licensed under the MIT License.
