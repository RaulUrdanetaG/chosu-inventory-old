# Chosu inventory

## Functionality

- Look through a list of items of a database that contains the inventory of a small bussiness in Colombia.
- Filter the results by tags or if you are an admin, filter by item owner or location in the store.
- Search items by name, or names containing the search.
- Add new items with photos from the gallery or take it at the moment you create the item, categorize the item by tags, owner and location in the store.
- Update or delete the existing items.
- Create new tags or update existing ones.
- Create new owners or update existing ones.
- Shopping cart system for non admin users.
- Log in with admin account to see additional info than normal users.
  
#### (Future updates)
- Add whatsapp link to contact the bussiness owner.

## My learnings
- Development of a full stack app.
  
### Frontend
- Angular routing (default routing, route parameters to use an specific parameter of the route to use it in the app, and not found route).
- Angular components and modules (property and event binding, interpolation).
- Communication between components with Input/Output decorators and binding.
- Conditional display of components and html objects (ngIf, ngFor).
- Angular HttpClient to make requests to an API.
- Angular interceptors to add authorization header in case the user is admin.
- Angular guards to protect CRUD UI pages from non admin users.
- Angular services (injectables, with observable vars).
- TypeScript interfaces.
- tailwind class styles.
- Netlify deployment with client side routing.

### Backend
- MongoDB set up and connection using mongoose.
- Creation of a REST API in backend using nodeJS and express.
- CRUD manipulation of database.
- Middleware set up to validate CRUD actions are being requested by admin user.
- Google cloud connection to buckets to store item images, and return a public link for the image to display it on the item.
- JSON WEB TOKEN creation for user validation.
- Password encryption using bcrypt to securely store new users in the database.
- Bcrypt compare to validate the password from login interface.
- Used .env to store sensible info about the app like google cloud JSON, mongoDB URI or JWT secret token.
- Set up cors to make the API available for everyone using api endpoint link.
- Deployment of backend app in render.com with env variables.

This repository will be Deprecated.
