**Artevelde University of Applied Sciences**

```
Campus Mariakerke
Industrieweg 232
9030 Gent
```

June 15th 2021

# @WORK 2

## Webshop: Codegram

## Team 04: Codegram

```
Charlotte Delvaux
Thabisa Dingani
Karelle Keters
```

2020 -2021 – Associate Degree in Computer Programming

```
Professors:
Lennart Dubois
Philippe De Pauw – Waterschoot
Tim De Paepe
```

## Table of Contents

- Table of Contents
- 1. Briefing
- 2. Planning
- 3. Design
   - 1. Ideaboards ..........................................................................................................................................
   - 2. Moodboard ........................................................................................................................................
   - 3. Sitemap...............................................................................................................................................
   - 4. Wireframes .........................................................................................................................................
   - 5. Style Tile .............................................................................................................................................
   - 8. Visual Designs .....................................................................................................................................
   - 9. Clickable Prototype ..........................................................................................................................
- 4. Develop
   - 1. Content .............................................................................................................................................
   - 2. Data ..................................................................................................................................................
   - 3. Code Snippets ...................................................................................................................................
   - 4. Screenshots ......................................................................................................................................
   - 5. Deployment Guide ...........................................................................................................................


## 1. Briefing

Dit project betreft het eindproject voor het vak @work2 in de opleiding Graduaat Programmeren aan
Arteveldehogeschool, gemaakt door Team Codegram. Team members zijn: Charlotte Delvaux, Thabisa
Dingani en Karelle Keters.

Doel van deze opdracht is het ontwikkelen van een webshop om een project naar keuze te verkopen. Van
idee, naar design, naar deployment.

Team Codegram zal programmeercursussen verkopen in een webshop, personen kunnen deze per stuk
kopen, of een abonnement nemen om toegang te hebben tot alle cursussen.

## 2. Planning


## 3. Design

### 1. Ideaboards ..........................................................................................................................................

Overzicht van de ideaboards:

### 2. Moodboard ........................................................................................................................................

Link naar het moodboard


### 3. Sitemap...............................................................................................................................................


### 4. Wireframes .........................................................................................................................................

Link naar het overzicht van de wireframes

**Figuur 1: Overzicht low fidelity wireframes**

**Figuur 2: Low fidelity landing page**


**Figuur 3: Low fidelity payment**

**Figuur 4: Low fidelity course filter**


### 5. Style Tile .............................................................................................................................................

Link naar de style tile

**Figuur 5: Style tile**


### 8. Visual Designs .....................................................................................................................................

Link naar de visual designs

**Figuur 6: Visual Designs overzicht**

**Figuur 7: Visual design contact page - Desktop**


**Figuur 8: Visual design course details - Desktop**

**Figuur 9: Visual design login - Desktop**


**Figuur 10: Visual designs - Mobile**

### 9. Clickable Prototype ..........................................................................................................................

Link naar het clickable prototype

**Figuur 10: Prototype overzicht**


## 4. Develop

### 1. Content .............................................................................................................................................

De content voor de webshop werd toegevoegd aan de database met behulp van Faker.js. Zie data voor
meer details rond de verschillende datatypes, tabellen, en de relaties tussen deze elementen.

### 2. Data ..................................................................................................................................................

Ontwerp database schema en relaties:

**Figuur 11: Eerste ontwerp database schema.**


**Figuur 12: Eindresultaat database schema en relaties.**


### 3. Code Snippets ...................................................................................................................................

**Figuur 13: Course database model - /server/db/models/category.js**


**Figuur 14: Database bestand – /server/db/index.js**


**Figuur 15 – Helper utilities – /server/utils/helper.js**


**Figuur 16: Landing page – /server/views/index.html**


**Figuur 17: Logic for user login - /server/public/js/main.js**


**Figuur 18: 7-1 SCSS - /server/public/_sass/main.scss**


**Figuur 19: Header partial - /server/views/partials/header.njk**


**Figuur 20: Utilities for authentication - /server/utils/auth.js**


**Figuur 21: Public routes - /server/routes/index.js**


**Figuur 22: Simple seeder for newsletters - /server/db/seeders/index.js**

**Figuur 23: Seeder for autogenerated tables through Sequelize ORM - /server/db/seeders/index.js**


**Figuur 24: Default theme SCSS - /server/public/_sass/themes/_default.scss**


**Figuur 25: Base template - /server/views/base.html**


**Figuur 26: Example for API routes with Swagger documentation - /server/api/routes/index.js**


**Figuur 27: API CRUD testing - /__tests__/server/requests.test.js**


**Figuur 28: Setting up the app - /server/app.js**


**Figuur 29: Authentication login endpoint - /server/utils/auth.js**


**Figuur 30: Category controller - / server/api/controllers/category.controller.js**


**Figuur 31: Rendering course using JWT bearer token - /server/public/js/course.js**


### 4. Screenshots ......................................................................................................................................

**Figuur 32: Homepage - Desktop**

**Figuur 33: Project backlog**


**Figuur 34: Swagger API docs – Rendered to [http://localhost:8080/api/docs](http://localhost:8080/api/docs) after starting the server.**

**Figuur 35: Test coverage**

### 5. Deployment Guide ...........................................................................................................................

Voordat je deze webshop in actie kan zien, is het noodzakelijk om deze te clonen van GitHub, hiervoor is
een installatie en configuratie van Git vereist. Installeer ook Node en NPM.

- Open Visual Studio Code, open een nieuwe terminal
- Gebruik ‘git clone https://github.com/pgmgent-pgm -4/webshop-codegram’
- Navigeer naar het project ‘cd webshop-codegram’
- Installeer de benodigde node modules ‘npm install’
- Na het voltooien van deze installatie kan de server gestart worden ‘npm run dev’
- Om de testen te kunnen doorlopen is het noodzakelijk om de database met de naam
    ‘database.sqlite3’ te dupliceren en de naam ‘test.sqlite3’ te geven, zonder deze extra actie
    zullen de tests falen. Om de testen te starten ‘npm run test’


