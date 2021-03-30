# Coffida React Native Mobile App
*Student ID*: **18055445**  
*Created By*: **Theo Clapperton**  
*Grade Given*: **`✨ 100% ✨`**  
*Description*: **A mobile coffee review service**  
*Written In*: **React Native**  
*Last Updated*: **30/03/2021**  
*Style Guide*: **Prettier**  
*Linter*: **ESlint**  
*Version*: **`1.4.54`**  
*Github Repo Link*: ***[Github Link](https://github.com/teobot/18055445-coffida-mobile-app)***  
*YouTube Screen-cast*: ***[YouTube Link](https://www.youtube.com/watch?v=18M6XCi7B5s)***

![Mobile Image](https://i.imgur.com/HNsmSpI.png)

## Running
1. Run `npm install` inside the root directory
2. Make sure that the [`coffida backend`](https://github.com/ash-williams/coffida_server) is running
3. If needed change the URL of the coffida backend inside ***`/src/api/coffida.js`***
4. You need a Google Maps api key, Follow **[this](https://developers.google.com/maps/documentation/android-sdk/get-api-key)** guide and then place the key inside `/app.json` replacing the `GOOGLE_MAPS_API_KEY` variable placeholder
5. Run `npm start` inside this app root directory to run the application

## Building
- Run `expo build:android` or `expo build:ios`.

## Issues
- All new issues have been moved to the [issues page](https://github.com/teobot/rn-coffida/issues) on GitHub

## Changes

### 30/03/2021 - PUBLIC RELEASE
- Deactivated Google Maps Api Key
- Updated deps
- Updated README, Version, Package-lock
- Added more Running Project details

### 24/02/2021
- LocationCard: Fixed distance to the location
- AccountScreen: Fixed blank space at bottom of the screen
- LoginScreen: Changed Toast to be more informative
- Updated README
- Updated version

### 24/02/2021
- Moved ResultRow component
- Made new NoResults component from if the location or user has no review/favorites
- AccountScreen: Imported new NoResults component
- LocationScreen: Imported new NoResults component
- Updated README
- Updated version

### 24/02/2021
- coffida.js: Added comments, Integrated refactored theme coloring
- AccountButton: Added comments, Integrated refactored theme coloring
- DeleteReview: Added comments, Integrated refactored theme coloring
- ResultRow: Added comments, Integrated refactored theme coloring 
- SettingsButton: Added comments, Integrated refactored theme coloring
- LocationCard: Added comments, Integrated refactored theme coloring
- LocationLikeButton: Added comments, Integrated refactored theme coloring
- LocationQuickStats: Added comments, Integrated refactored theme coloring
- LocationRatingStats: Added comments, Integrated refactored theme coloring
- OwnUserReviewView: Added comments, Integrated refactored theme coloring
- ReviewCard: Added comments, Integrated refactored theme coloring
- ReviewLikeButton: Added comments, Integrated refactored theme coloring
- EndOfResultsView: Added comments, Integrated refactored theme coloring
- SearchPaginationButton: Added comments, Integrated refactored theme coloring
- SearchRatingInput: Added comments, Integrated refactored theme coloring
- LogoutController: Added comments, Integrated refactored theme coloring
- ThemeController: Added comments, Integrated refactored theme coloring
- LocationContext: Added comments, Integrated refactored theme coloring
- ThemeContext: Added comments, Integrated refactored theme coloring
- ToastContext: Added comments, Integrated refactored theme coloring
- AuthenticationHelper: Added comments, Integrated refactored theme coloring
- CoffidaHelper: Added comments, Integrated refactored theme coloring
- ImageHelper: Added comments, Integrated refactored theme coloring
- LocationHelper: Added comments, Integrated refactored theme coloring
- ValidationHelper: Added comments, Integrated refactored theme coloring
- AccountScreen: Added comments, Integrated refactored theme coloring
- CreateAccountScreen: Added comments, Integrated refactored theme coloring
- LoadingScreen: Added comments, Integrated refactored theme coloring
- LoginScreen: Added comments, Integrated refactored theme coloring
- SearchScreen: Added comments, Integrated refactored theme coloring
- SettingsScreen: Added comments, Integrated refactored theme coloring
- UpdateUserInformationScreen: Added comments, Integrated refactored theme coloring
- RatingInput: Deleted unused component
- Updated README
- Updated version

### 23/02/2021
- Updated logos
- DeleteReview: Fixed delete review issue, Added comments
- CreateAccountScreen: Removed feather import, Fixed dynamic theme color
- LocationReviewScreen: Fixed DeleteReview component props, Removed imports
- LoginScreen: Fixed styling, Fixed imports, Added password viewer

### 22/02/2021
- Implement a dark mode feature
- Updated asset visuals
- Removed unused dependencies
- Removed unused text files
- Added new background images
- AccountButton: Added ThemeContext import, Added dynamic text color
- DeleteReview: Import ThemeContext import, Added dynamic color changing
- ResultRow: Import ThemeContext import, Added dynamic color changing
- SettingsButton: Import ThemeContext import, Added dynamic color changing
- LocationCard: Import ThemeContext import, Added dynamic color-changing, Moved styles
- LocationRatingStats: Import ThemeContext import, Added dynamic color-changing, Moved styles
- OwnUserReviewView: Import ThemeContext import, Added dynamic color-changing, Moved styles
- ReviewCard: Added dynamic text color styling
- ReviewLikeButton: Import ThemeContext import, Added dynamic color changing
- SearchRatingInput: Import ThemeContext import, Added dynamic color changing
- LogoutController: Import ThemeContext import, Added dynamic color changing
- ThemeController: Import ThemeContext import, Added dynamic color changing
- ThemeContext: Set the initial theme to match the theme of the device
- AuthenticationHelper: Removed comments
- CoffidaHelper: Removed comments
- ValidationHelper: Removed unused functions, Refactored validation function, Added banned terms for the review body
- AccountScreen: Import ThemeContext import, Added dynamic color-changing, Moved styles, Removed comments
- CreateAccountScreen: Refactored form validation, Import ThemeContext import, Added dynamic color-changing, Moved styles
- LoadingScreen: Import ThemeContext import, Added dynamic color changing
- LocationReviewScreen: Import ThemeContext import, Added dynamic color-changing, Refactored validation
- LocationScreen: Added dynamic color-changing, Removed comments
- LocationScreen: Removed comment, Refactored validation, Added image, Added theme color changing
- SearchScreen: Added dynamic color changing
- UpdateUserInformationScreen: Added comments, Refactored validation, Added dynamic color changing
- Updated README
- Updated version

### 20/02/2021
- Fixed "on cancel doesn't clear search" bug
- Fixed "No rating background color on the review rating screen" enhancement
- Added "No results message on SearchScreen"
- Fixed "Update account screen back to account" on account, update places user back to account screen
- Removed the logout button with the account button
- User can now see and filter by distance to the user
- Fixed "user create account issue" issue
- Added a small description of the app on the login screen
- Fixed "Infinite loading screen if server not available" issue
- App.js: Added new ThemeContext, ToastContext and UserLocationContext
- Updated dependencies
- LocationScreen: Moved to the new folder, Refactored the entire design
- AccountButton: Changed onPress function to use es6 javascript
- DeleteReview: Imported ToastContext, Removed error logs to Toasts
- LocationLikeButton: Imported ToastContext, Removed error logs to Toasts
- OwnUserReviewView: Removed TODO, as it didn't require one
- ReviewCard: Imported ToastContext, Removed error logs to Toasts, Changed image to new "aspectRatio" styling
- EndOfResultsView: Created new End of results text, implemented dark mode
- SearchRatingInput: Removed Background color prop, Added image size prop
- LogoutController: Imported ToastContext, Removed error logs to Toasts
- ThemeController: Import ThemeContext, Added ability to change Theme prop in react.context
- createDataContext: Deleted legacy component
- LocationContext: Created new react context for handling global user location information
- ThemeContext: Refactored from legacy context system
- ToastContext: Created new react context for handling global use of the toast component
- AuthenticationHelper: Removed TODO where they weren't needed
- CoffidaHelper: Removed console log on an error and replaced with "return null"
- ValidationHelper: Removed legacy form validation system, Replaced with a new validation system
- AccountScreen: Import new Contexts, Each new location gets a "distance" prop which is the distance from the user, Added error Toasts
- CreateAccountScreen: Changed component imports, Changed reducer type names, Refactored account information validation, Added Toast messages, Redesign screen styling
- LocationReviewScreen: Changed imports, added Toasts messages, Refactored legacy validation system, Changed rating, and button styling
- LocationScreen: Changed imports, Added Toast messages, Removed unused functions, Changed polygon line logic on map
- login screen: Changed imports, Refactored legacy validation system, Added Toasts messages, Refactored login screen styling
- SearchScreen: Changed imports, Added Results sorting, Import Toast and Theme context, Refactored legacy param and distance calculating, Fixed clear params on cancel issue, Reduced duplicate code, Added a new filter for sorting results
- UpdateUserInformationScreen: Changed imports, Refactored legacy validation system, Adde toast messages
- Updated README
- Updated App version


### 16/02/2021
- App.js: Added new Settings screen, Changed Logout to settings, Added context
- Moved: OwnUserReviewView, ReviewCard, ReviewLikeButton inside of Review folder
- LogoutButton: Replaced by settings button-through user testing
- LocationCard: Changed location image to database image, Removed comments
- Added new SettingsButton to open the settings screen
- Added new EndOfResults View for the search screen
- Added new SearchPaginationButton for searching for more results
- SearchRatingInput: Added new background rating colour
- Added new LogoutController function for logging out on setting screens
- Added new ThemeController function for changing the theme on the settings screen
- Created a new createDataContext function to make creating React.Context easier with less code
- Created new ThemeContext for controlling the theme
- AccountScreen: Added back the review cards
- LocationScreen: Updated import locations, Changed location screen image source
- SearchScreen: Changed formatting, Added imports, Imported context, Changed search logic, Added search bar functions, Added messages for showing search options, Added new styling
- Added new Settings screen for changing app settings
- UserInformationScreen: Applied Formatting, Pushes user back when updated
- Updated App version
- Updated README

### 15/12/2021
- Updated Dependencies
- Coffida: Added timeout of 5000ms
- Moved Components to new folders
- RatingInput: Added extra customization
- ReviewCard: Updated import paths
- SearchRatingInput: Added new rating component
- AuthenticationHelper: Refactored validationToken function, added console logs
- LocationHelper: Added new getDistanceToCoords function
- LocationReviewScreen: Removed console log
- LocationScreen: Updated import paths, added map view polygon to user location, added new distance view to a location
- LoginScreen: Removed console logs, added minor commas
- SearchScreen: Added Searching within the search screen
- updated version number

### 14/02/2021
- Updated dependencies
- Deleted camera screen
- Added new image helper
- LocationReviewScreen: Moved taking images to the review screen
- Updated version number
- Removed unused screen
- Updated App.js navigation

### 12/02/2021
- App.js: Added new Screen for image taking
- Updated Dependencies
- DeleteReview: Added new component for deleting a review
- LogoutButton: Added post to "/user/logout" endpoint
- OwnUserReview: Removed own review, Changed logic, Changed props, removed unused components
- RatingInput: Removed Divider, Removed unused imports
- ReviewCard: Fixed prop imports, Added review image and image viewer
- ReviewLikeButton: Fixed prop imports, Changed likes and liked review logic, removed console log
- ReviewPhotoCamera: Added new camera component
- LocationReviewScreen: Added Review Image display/delete and update, Changed various logic and styling
- LocationScreen: Changed onFocus logic, Changed various component props
- ReviewImageScreen: Added a new screen for taking images for the review
- Updated version number

### 10/02/2021
- App.js: Added new update user screen
- LocationScreen: Updated navigation param
- OwnUserReviewView: Fixed Logic issue
- ResultRow: Removed props, Added children passthrough prop
- ValidationHelper: Added validate input function
- AccountScreen: Added update account information button, Changed imports, Updated ResultRow props
- LocationReviewScreen: Added delete review button, Fixed imports
- LocationScreen: Changed screen title logic, Update reviews props
- UpdateUserInformationScreen: Added new screen, user information update

### 09/02/2021
- Updated manifest
- App.js: Added new create account page
- AccountButton: Changed function name for accuracy
- OwnUserReviewView: Changed logic, Updated for added ReviewCard props
- RatingInput: Created new custom rating input
- ReviewCard: Changed props access, Added review like button
- ReviewLikeButton: Create a new component, for liking user reviews
- CoffidaHelper: Created a new component to reduce duplicate code relate to the API
- LocationHelper: Styling change
- ValidationHelper: Changed logic, Create a new function for cleaning strings
- AccountScreen: Removed user reviews, Updated for CoffidaHelper use
- CreateAccountScreen: Changed function name
- LocationReviewScreen: Added new location review creation screen
- LocationScreen: Added new onFocus listener, Updated ReviewCard props
- SearchScreen: Added new onFocus listener

### 08/02/2021
- app.json: Added google maps API key
- Updated dependencies
- Added new component: OwnUserReviewView, displays users own review
- Added new helper: LocationHelper, helps with location services
- Added new component: LocationReviewScreen, the start of the user review edit/post screen
- LocationScreen: Removed comments, Added google map view, added new OwnReviewView
- SearchScreen: Removed unused imports

### 05/02/2021
- Added new component: LocationQuickStats
- Added new component: LocationRatingStats
- ResultRow: logic and styling changes
- ReviewCard: Added new reusable components, various logic, and styling changes
- AccountScreen: Updated props on components
- LocationScreen: Added new reusable components, Code refactoring, and styling changes

### 04/02/2021
- App.js: Removed single comment
- Updated various dependencies
- Location Card: Changed imports, added fix to locations without ratings
- Added a new favorite button for the user to "like" a location
- Added new ResultsRow component, Hopefully, should be able to reuse a lot of flat list code
- Added new ReviewCard, this displays a user review
- AuthenticationHelper: Added comments
- ValidationHelper: Added comments
- AccountScreen: Added hook for updating information upon "goBack" method call, Added the display of the reviews and favorite locations, Various logic and styling changes
- Added new loading screen, this is for the user when information is being requested, it can be passed a customized message parameter
- LocationScreen: Various import changes, Fixed bug where ratings with null values would cause a crash, Added new loading screen
- LoginScreen: Added the new loading screen, various logic changes, reducer payload changes

### 03/02/2021
- App: Added account screen button, Added new account screen,
- Update dependencies
- Created a new account button for the navigation
- LocationCard: Change the locationCard star rating to 2 fixed decimal places
- LogoutButton: Updated to use new AuthenticationHelper reducer code
- AuthenticationHelper: Updated to use reducers, This now reuses more code and makes it easier for new development
- Created new account page, this displays all the users account information
- LocationScreen: Ratings are now to fixed 2 decimal places, Added new overall rating, Changed various styling
- LoginScreen: Updated to use new AuthenticationHelper reducer code

### 02/02/2021
- Added Location Screen
- Added Logout Button to 2 Screens
- Changed App.js export component to allow for title changes
- Updated dependencies
- Changed API URL location
- Added location card to display location information
- Created logout button for the header
- Created Location page for location information
- LoginScreen: Changed logic, removed unused params, Added TODO
- SearchScreen: Removed Logout function, Changed from pre-define renderItem to Comp

### 01/02/2021
- Updated the account creation, login, and home screens
- Added profanity checker helper
- Added validation checker
- Large changes to various screens and logic

## Resources

- https://picsum.photos/500
- https://source.unsplash.com/1600x900/?coffee,shop
- https://www.npmjs.com/package/react-native-form-validator
- https://console.cloud.google.com/apis/library/maps-android-backend.googleapis.com?authuser=3&folder=&organizationId=&project=enterpriseproject18055445
- https://docs.expo.io/versions/latest/sdk/location/