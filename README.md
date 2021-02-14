# Coffida React Native Mobile App

## Building
- Run `expo build:android` or `expo build:ios`.


## Issues

### All new issues with be moved to the issues page on GitHub

## Changes

### 14/02/2021
- Updated dependencies
- Deleted camera screen
- Added new image helper
- LocationReviewScreen: Moved taking images to the review screen
- Updated version number
- Removed unused screen

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
- ReviewImageScreen: Added new screen for taking images for the review
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
- ReviewLikeButton: Create new component, for liking user reviews
- CoffidaHelper: Created new component to reduce duplicate code relate to the API
- LocationHelper: Styling change
- ValidationHelper: Changed logic, Create new function for cleaning strings
- AccountScreen: Removed user reviews, Updated for CoffidaHelper use
- CreateAccountScreen: Changed function name
- LocationReviewScreen: Added new location review creation screen
- LocationScreen: Added new onFocus listener, Updated ReviewCard props
- SearchScreen: Added new onFocus listener

### 08/02/2021
- app.json: Added google maps api key
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
- ReviewCard: Added new reusable components, various logic and styling changes
- AccountScreen: Updated props on components
- LocationScreen: Added new reusable components, Code refactoring and styling changes

### 04/02/2021
- App.js: Removed single comment
- Updated various dependencies
- Location Card: Changed imports, added fix to locations without ratings
- Added new favourite button for the user to "like" a location
- Added new ResultsRow component, Hopefully should be able to reuse alot of flatlist code
- Added new ReviewCard, this displays a user review
- AuthenticationHelper: Added comments
- ValidationHelper: Added comments
- AccountScreen: Added hook for updating information upon "goBack" method call, Added the display of the reviews and favourite locations, Various logic and styling changes
- Added new loading screen, this is for the user when information is being requested, it can be passed a customized message parameter
- LocationScreen: Various import changes, Fixed bug where ratings with null values would cause crash, Added new loading screen
- LoginScreen: Added the new loading screen, various logic changes, reducer payload changes

### 03/02/2021
- App: Added account screen button, Added new account screen,
- Update dependencies
- Created new account button for the navigation
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
- Changed API url location
- Added location card to display location information
- Created logout button for the header
- Created Location page for location information
- LoginScreen: Changed logic, removed unused params, Added TODO
- SearchScreen: Removed Logout function, Changed from pre-define renderItem to Comp

### 01/02/2021
- Updated the account creation, login and home screens
- Added profanity checker helper
- Added validation checker
- Large changes to various screens and logic

## Resources

- https://picsum.photos/500
- https://source.unsplash.com/1600x900/?coffee,shop
- https://www.npmjs.com/package/react-native-form-validator
- https://console.cloud.google.com/apis/library/maps-android-backend.googleapis.com?authuser=3&folder=&organizationId=&project=enterpriseproject18055445
- https://docs.expo.io/versions/latest/sdk/location/


## Testing Functions
```
 const cal = ({ lat1, lon1 }, { lat2, lon2 }) => {
   const R = 6371e3; // metres
   const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
   const φ2 = (lat2 * Math.PI) / 180;
   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
   const Δλ = ((lon2 - lon1) * Math.PI) / 180;

   const a =
     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

   return R * c;
 };
```