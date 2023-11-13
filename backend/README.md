Chosu inventory API

endpoints

# /items
- ## GET
/ gets all items from db
/:itemID gets a single item with the selected ID.

- ## POST
/ requires an array for the desired tags to filter the items.
/addItem requires a body with name, an array of image links, price, bought at price, an array of tags, owner, location and a description.

- ## DELETE
/:itemdId deletes the item with itemID from db.

# /images
- ## POST
/upload requires an array of file images

# /users
- ## POST
/register requires a body with username, password and role, if you want to be an admin request the admin token.

/login requires a body with username and password

# /users/cart
- ## GET
/:userID retrieves an array with the item id's in the cart for the user ID

- ## PUT

/:userID requires the new cart array with items id, and updates the user cart in db.

# /tags
- ## GET

/ Gets all tags from db.

- ## POST

/addTag requires JWT as admin to be able to post a new tag using body tagname

- ## PUT

/:tagID requires JWT as admin to be able to update tagID tagname usng body tagname

- ## DELETE

/:tagID requires JWT as admin to be able to delete tag from db.

# /owners
- ## GET

/ Gets all owners from db.

- ## POST

/addOwner requires JWT as admin to be able to post a new owner using body owner

- ## PUT

/:ownerID requires JWT as admin to be able to update ownerID owner usng body owner

- ## DELETE

/:ownerID requires JWT as admin to be able to delete owner from db.

# /locations
- ## GET

/ Gets all locations from db.

- ## POST

/addLocation requires JWT as admin to be able to post a new owner using body owner

- ## PUT

/:locationID requires JWT as admin to be able to update locationID location using body location

- ## DELETE

/:locationID requires JWT as admin to be able to delete location from db.