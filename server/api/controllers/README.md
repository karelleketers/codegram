# Controllers or Actions

The controllers' responsibility is to pull, modify, and provide data to the user. Essentially, the controller is the link between the view (UI) and the model (data).

Through getter and setter functions, the controller pulls data from the model and initializes the views.

If there are any updates from the views, it modifies the data with a setter function.


Will contain logic for CRUD (connection to db) and Parsing (logic) of data
Dataschema info:
-   users (zero to one profile)
-   profiles (profile info for a user, settings, info, ...)
-   categories 
-   products
-   product_has_categories (many (products) to many (categories))
-   product_reviews (one (product) to many (users))
-   order (one (order) to one (user))
-   order_products (one (order) to many (products) && one (product) to many (orders))
-   payments (one (payment) to one (user) and one (order))
-   promotions (one (promotion) to one (product))