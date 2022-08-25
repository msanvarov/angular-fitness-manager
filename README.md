<h1 align="center">Fitness Manager</h1>

<p align="center">
  <a href="https://angular.io/" target="blank"><img src="https://angular.io/assets/images/logos/angular/angular.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">Fitness Manager is an app built with Angular to plan meals and workouts.
</p>

<p align="center">
  <a href="https://github.com/msanvarov/fitness-manager/actions/workflows/firebase-hosting-merge.yml">
    <img src="https://github.com/msanvarov/fitness-manager/actions/workflows/firebase-hosting-merge.yml/badge.svg" alt="CI status for main branch" />
  </a>&nbsp;
  <a href="https://github.com/msanvarov/fitness-manager/actions/workflows/firebase-hosting-pull-request.yml">
    <img src="https://github.com/msanvarov/fitness-manager/actions/workflows/firebase-hosting-pull-request.yml/badge.svg" alt="CI status for PRs" />
  </a>&nbsp;
</p>

Table of Contents:

[Description](#-description) |
[Prerequisites](#%EF%B8%8F-prerequisites) |
[Deployment](#-deployment) |
[Testing](#-testing) |
[TypeDocs](#-typedocs) |
[Progress](#-progress) |
[Resources](#-resources)

🔎 This repo was created with [Nx](https://nx.dev/).

### 📚 Description

This Angular application is made to cover a variety of Angular topics/concepts. It comes with authentication, logging, security, and database features out of the box (mainly thanks to [AngularFire](https://github.com/angular/angularfire)).

> Please refer to the [CONCEPTS.md file](CONCEPTS.md) for a list of topics covered.

---

### 🛠️ Prerequisites

#### Non Docker

- Please make sure to have [Node.js](https://nodejs.org/en/download/) (16+) locally by downloading the Javascript runtime via `brew`, `choco`, or `apt-get`.

#### Docker 🐳

- Please make sure to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) operational to quickly compose the required dependencies. Then follow the docker procedure outlined below.

---

### 🚀 Deployment

#### Manual Deployment without Docker

- Download dependencies using `npm i` or `yarn`.

- Start the app in development mode by using `npm run start` (the app will be exposed on port 4200; not to conflict with other frontend framework/library ports).

<details open>
<summary>Optional: Change to personal Firebase project</summary>
<br>

> Remark: I created a Firebase project for this app to enable ease of use (thus running the application should work out of the box) but there are limitations. It is free-tiered and once the quota is reached, the project will be disabled.

- [Create a Firebase project](https://cloud.google.com/firestore/docs/client/get-firebase).
- Onboard the created Firebase project with `npx nx g @angular/fire:ng-add`. This command will prompt a Firebase login and ask to select a Firebase project. Following the rest of the prompts can provide hassle-free configuration.
</details>

#### Deploying with Docker 🐳

- Execute the following command in-app directory:

```bash
# creates and loads the docker container in detached mode with the required configuration
$ docker-compose up -d
```

- The following command will download dependencies and execute the web application on http://localhost:4200.

---

### ✅ Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

### 💡 TypeDocs

The documentation for this application can be viewed via the command `npm run compodoc`.

This command will produce a **documentation folder** with the required front-end files and **start hosting on [localhost:3000](http://localhost:3000/)**.

---

### 🏗️ Progress

|                                                         Branches | Status |
| ---------------------------------------------------------------: | :----- |
|             [main](https://github.com/msanvarov/fitness-manager) | ✅     |
| [feat/\*](https://github.com/msanvarov/fitness-manager/branches) | 🚧     |

---

### 👥 Support

PRs are appreciated, I fully rely on the passion ❤️ of the OS developers.

---

### 📖 Resources

Further resources to provide further insight into Angular and Firebase:

- [Angular](https://angular.io)
- [Nx Docs](https://nx.dev/getting-started/intro)
- [Firebase Docs](https://firebase.google.com/docs/)
- [Firebase CLI](https://firebase.google.com/docs/cli/)
- [AngularFire Repo/Docs](https://github.com/angular/angularfire)

---

### 📇 License

The fitness manager app is [MIT licensed](LICENSE).

[Author](https://sal-anvarov.tech/)
