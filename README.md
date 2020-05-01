# Asuka

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)

## About The Project

![](https://cdn.discordapp.com/attachments/428937438224842754/705724439161208833/1082.jpg)

This is Asuka, a Discord bot created by [faldyif](https://github.com/faldyif) mainly for osu! tracking. Because this project is currently work in progress, it only supports the following features:
* User Profiles (std/mania/taiko/ctb)
* User Most Recent Play
* Compare Play

### Built With

* [Typescript](https://www.typescriptlang.org)
* [discord.js](https://discord.js.org)
* [Moment.js](https://momentjs.com)
* [ts-jest](https://github.com/kulshekhar/ts-jest)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is the things you need to use the software and how to install them.
* Node.js 12.0.0 or newer
* Redis
* npm
```sh
npm install npm@latest -g
```
* node-ts (for running without compiling)
```sh
npm install node-ts -g
```

### Installation

1. Clone the repo
```sh
git clone git@github.com:faldyif/asuka.git
```
2. Install NPM packages
```sh
npm i
```
3. Copy the `.env.example` to `.env`
```sh
cp .env.example .env
```
4. Copy the `.env.example` to `.env`
```sh
cp .env.example .env
```
5. Configure the `.env` file that's been copied before
6. Run `npm start` or `npm debug` for running without compiling

## Roadmap

See the [open issues](https://github.com/faldyif/asuka/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make our work easier. Any contributions you make are **greatly appreciated**.
1. Clone the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Notes: 
* Consider using emoji for commit messages. Because every commit is important. So let's celebrate each and every commit with a corresponding emoji! 😄 ([Example](https://gist.github.com/parmentf/035de27d6ed1dce0b36a))
