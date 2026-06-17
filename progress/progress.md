# Log book - Graduation project @ YHB

## [2026-06-15] Course start

Start of course with introduction and instructions received. Subject got clearance: Potluck-fullstack-app with Next.js!

## [2026-06-16] Setup

Scaffolding done. Dev & "admin" setup with repo, tech stack, documents, GitHub Project and other things up and running. Documenting my decisions in my final report as I go, to save time further down the road.

I am looking forward to explore the possibilities with GitHub Projects time charts. So far I have only managed to add a specific date, but I suspect I will be able to add longer time spans, which will be really helpful for visualization. I added my first items to the wrong repository by accident, but since they won't require branching I don't think that will be an issue.

Installed Next.js with the recommended defaults. It comes with the necessary dependencies out of the box, very convenient.

[Next.JS docs - Resource on fetching data with an ORM or db](https://nextjs.org/docs/app/getting-started/fetching-data#with-an-orm-or-database)

Next docs recommend a data access layer. It should only run on the server, perform authorization checks and return DTO's (Data Transfer Objects). I added a data security item to the backlog column, to be adressed when I get there. For now, I will add a data folder to the file structure, where communication with the database will take place.

[Prisma Installation and setup](https://www.prisma.io/docs/guides/frameworks/nextjs)

Installed the required dependencies for prisma (types, client & adapter), and finally Prisma itself.
By initializing Prisma, it creates its own scaffolding with necessary folders and files.

Installed the Prisma extension to VS Code, to add syntax highlighting, formatting, auto-completion, jump-to-definition and linting for .prisma files; which it didn't recognize before.

I "accidentally" went too deep on the database side of things, and began plotting the models. I took note of some Prisma-syntax, where @ signals an attribute and @id indicates the primary key. Through the relation syntax, connections between models is described.@relation("nameIfSeveralRelations", fields: \[nameOftheFieldInThisTable\], references: \[nameOfTheFieldInForeignTable\]).

One thing that is a bit counter intuitive is that Prisma needs a receiving relationship on the table that is references. I have to add an array that lists the incoming references, which in my head collides with the first normal form. As does the enum I added with dietary issues. It can be motivated by the fact that it is scoped to the issues I added to the enum definition, and is not cross referenced to a table with it's own data.

Seems like the last dependency I can currently see that I will need in the future is something for authentication. [NextAuth.js](https://next-auth.js.org/getting-started/introduction) offers a lot of built-in functionality. What I currently care about is that it will play well with Next, and allow me to use google for authentication. I installed it and initialized it using [this tutorial](https://next-auth.js.org/configuration/initialization#route-handlers-app). And I discover that this is the old version and that there is a [newer version](https://better-auth.com/) in town. Redid the installation and setup, based on the [Better-Auth documentation](https://better-auth.com/docs/installation).

During the afternoon, I spent some time in Figma.

| Color scheme                                                                                                                                                                                                                                                                         | First sketch of visual expression                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| ![Color scheme](./img/1.png)                                                                                                                                                                                                                                                         | ![Landing page sketch](./img/2.png)                                                                                              |
| I am after a colorful and friendly expression, with parallels to the whimsical combinations one can expect at a true potluck event. This color palette, I feel, I can tone down if needed (shades of blue, nothing but calming), and throw in energizing accents wherever I want to. | I made a sketch of a landing page to get a feel for what it might be. I like the abstract geometries and the dynamics it brings. |
