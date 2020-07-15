Empty simple convenient environment for writing something in typescript

# Scripts:

## [npm run start]
## [npm run start:open]
Runs static server for **./dist** folder at **http://localhost:3141**.
Opens page in a browser in case **:open** prefix was added.

## [npm run dev]
## [npm run dev:open]
Runs webpack dev server at **http://localhost:3141**. Will listen for changes and rebuild the project instantly.
Opens page in a browser in case **:open** prefix was added.

## [npm run build]
## [npm run build:open]
Build the project from **./src** folder to **./dist**;
Opens page in a browser in case **:open** prefix was added (the same as **npm run build && npm run start:open**).