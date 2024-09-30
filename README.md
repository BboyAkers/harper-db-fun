# HarperDB Developer Experience Engineer Coding Challenge

## Overview

The purpose of this challenge is to demonstrate your proficiency in developing user interfaces and their associated backend services. It also provides an opportunity to work with HarperDB and explore how it can be leveraged on both the front and back end.

We are not trying to trick you with this challenge, and we are not expecting that you submit a large and complex solution. Our intention is that you spend no more than 1 to 2 hours on this challenge.

Please approach this challenge with the above things in mind.

__We’re here to support you in doing your best, so if you get stuck, please don’t hesitate to reach out.__

During the technical interview please be ready to share your screen, discuss your solution, and impress our team!

## Setup

Install HarperDB locally
https://docs.harperdb.io/docs/getting-started#installing-a-harperdb-instance

Once HarperDB is up and running, navigate to the `hdb/components` directory and create a new directory called `movies`.

Next, clone this repository into the `movies` directory and restart HarperDB to load the component.

We have installed a basic React template in the `web` directory. When HarperDB is running It can be reached at `localhost:9926`

There is a `movie` and `genre` table defined in `schema.graphql`

We recommend exploring this code and the hdb directory to better understand how HarperDB works.

Please submit your code to this repository.

## Tasks

The goal of this challenge is to build a simple movie application that allows users to view popular movies, save them to a database, and filter saved movies by genre.

1. **Add Genres and Movies to the Database**
   - Create a form in the UI to add movie genres to the `Genre` table. The table should have two attributes: `id` and `name`. Example genres are provided below.
   - Create a form in the UI to add movies to the `Movie` table. The table should have four attributes: `id`, `title`, `genre_ids`, and `release_date`.
   - Use the HarperDB HTTP REST interface to insert the new records into the respective tables.
2. **Fetch and Display Popular Movies**
   - Retrieve all records from the `Movie` table and display them in the UI.
   - Implement a `genre` filter to refine the displayed movie list.
3. **Create a Genre-Movie Relationship**
   - In the `schema.graphql` file, define a relationship between the genre table's id and the movie table.
4. **Build Genre-Based Movie Filtering**
   - Create a page where users can select a genre and view all saved movies that match that genre. Use the relationship established in the previous step to facilitate this functionality.
5. **UI Design**
   - Design your UI to demonstrate best practices in creating a well-crafted, user-friendly interface.
6. **Stretch goal**
   - Make the movie records in your "Popular Movies" list editable and deletable.

---
## Resources

These links contain the bulk of the information you'll need to complete the tasks above.

- HarperDB NPM Repo: https://www.npmjs.com/package/harperdb
- Operations API: https://docs.harperdb.io/docs/developers/operations-api
- REST API: https://docs.harperdb.io/docs/developers/rest
- Resource Class: https://docs.harperdb.io/docs/technical-details/reference/resource#resource-class
- Defining A Table Schema And Relationships: https://docs.harperdb.io/docs/developers/applications/defining-schemas#relationships-relationship
- Open Source Component Library: https://github.com/HarperDB-Add-Ons


---
## Sample Data

### Genres
```json
[
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]
```
