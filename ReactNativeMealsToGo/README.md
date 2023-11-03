React Native Restaurant App with Google Maps, Firebase Authentication, and React Navigation

This React Native app allows users to search for restaurants in Chicago, Toronto, San Francisco, and Antwerp. It uses Google Maps, React Native Paper, Firebase Authentication, and React Navigation. Users can save their favorite restaurants and order from them, with payment processing integrated into the app. Each user's favorites are saved in local storage. You can also take picture and set that picture as you profile image.

Features:

Search for restaurants in Chicago, Toronto, San Francisco, and Antwerp,
Save your favorite restaurants,
Order from your favorites with payment processing,
Mock dishes for each restaurant,
Firebase Authentication for user authentication,
Local AsyncStorage for saving favorites,
Take a picture using your camera and set as your profile image,
React Native Camera.

Technologies Used:

React Native,
React Navigation,
Google Maps,
Firebase Authentication,
React Native Paper,
Styled Components.

Usage
Upon launching the app, users will be prompted to sign in or create an account with Firebase Authentication. Once signed in, users can search for restaurants in Chicago, Toronto, San Francisco, and Antwerp. They can save their favorite restaurants by tapping the heart icon, and view their favorites by navigating to the settings tab and then you "favorites" tab.

To order from a favorite restaurant, users can navigate to that restaurant's details page and tap the "Order Special" button. After selecting a "Special Order", they can proceed to checkout, where they will be prompted to enter payment(just name) information.

To set their profile image, users can navigate to their settings page and tap the logo at the top (by default its blue icon with "apps" icon from expo). They will be prompted to take a picture using their camera, and the picture will be saved as their profile image.(of course you have give a permission to take a picture otherwise it will stay the same).
