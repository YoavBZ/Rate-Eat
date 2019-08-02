# Assignment 3

Yoav Bar-Zeev 204694814
Shaked Megidish 312431596
Yoav Elmoalem 20456655

### Components:
* App
    * Home
        * Profile
            * EditPicture
            * EditReview
        * RestaurantsPage
            * RatingPage
            * RatingPageList
            * RestaurantReviewPicture
            * MapContainer
        * UsersPage
            * RatingPage
    * Login
    * Register
        * DragAndDrop

### Project Structure:
The App component is the main project components. It contains the different page components.

The Login, Register and Home components represents the different pages that can be displayed.

In the Register page the user can upload his picture using drag & drop.

In the Login page the user can enter his credential in order to login, or use Facebook authentication.

The Home component represents the main page after the user has logged-in.
It contains 3 sub-pages that the user can navigate between: Profile, RestaurantsPage and UsersPage.

In the Profile the user can see his personal information and reviews, and modify them.

In RestaurantsPage the user can search for a restaurant, see its information, its review and submit a new review.

In UsersPage the user can search for users and see their reviews. 

Both UserPage and RestaurantPage support search by name and by location, as well as sorting by different parameters.

### Extra features:
* Facebook Login - Authentication method for logging-in.
* Google Maps API - Used for displaying each restaurant location by its latitude & longitude coordinates.

### Tech stack:
* React
* Redux
* Saga
* Express
* Mongoose
* Boilerplate
* PrimeReact

To start the server:
1. start mongodb using mongod
2. node src\server\server.js # backend
3. npm run dev # frontend