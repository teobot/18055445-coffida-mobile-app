# Coffida React Native Mobile App

### To Add
- [ ] Confirm password input from account creation
- [x] have the login screen show loading while it tries to find if the user is already logged in

### Issues
#### All new issues with be moved to the issues page on GitHub
- ~~fix app crash when user clicks on location that doesn't have review or ratings.~~
- ~~fix the review card, its now in a horizontal flatlist so needs changing~~

## Changes

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
