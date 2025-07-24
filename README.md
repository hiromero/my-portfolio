# My Portfolio

> A full‑stack portfolio website built with React (frontend) and Node.js/Express (backend).  
> Allows the owner to log in and **Create • Read • Update • Delete** their personal details, work experiences, education, skills, achievements, and certifications.

![Dashboard Preview](./public/dashboard-screenshot.png)

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Demo

Live demo (if hosted): https://hiromero.github.io/  
![Portfolio Home](./public/home-screenshot.png)

---

## Features

- **Authentication**: JWT‑based login for portfolio owner
- **Owner Dashboard**
  - **Personal Details** (name, email, phone, bio, etc.)
  - **Work Experience** (list, add, edit, delete; auto‑sorted newest→oldest)
  - **Education** (list, add, edit, delete; auto‑sorted by graduation date)
  - **Skills** (icon‑grid with CRUD, powered by react‑icons)
- **Public View**: Guest users can browse without logging in
- **Dark‑mode UI**: GitHub‑inspired styling via SCSS

---

## Tech Stack

- **Frontend**
  - React v18, React Router v6
  - SCSS for styling (BEM methodology)
  - Axios for HTTP requests
  - react‑icons for skill icons
- **Backend**
  - Node.js, Express.js
  - JSON files as simple “databases” (data stored under `backend/data/`)
  - JWT for authentication
- **Dev Tools**
  - [concurrently](https://www.npmjs.com/package/concurrently) (optional)
  - nodemon (for auto‑reload during development)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- npm (comes with Node.js)
- Git

### Installation

Clone the repo:

```bash
git clone https://github.com/hiromero/my-portfolio.git
cd my-portfolio
```
