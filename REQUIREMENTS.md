# PROJECT SCOPE / REQUIREMENTS

## Scope
Be able to book/manage bookable reasources availble to a user.

## Requirements

### Screens
- [ ] Login
- [ ] Register
- [ ] Dashboard
- [ ] Map View
- [ ] List View
- [ ] Bookings Page
- [ ] Booking Info Page
- [ ] Booking basket Slide-over
- [ ] Profile + Settings Page
- [ ] Help Page
- [ ] FYP About Page

### Functionality
- [ ] Email Receipts
  - [ ] Booking Info
  - [ ] ical / ics file attachment

#### Login
- [ ] User can login with email and password
- [ ] User can login with Azure AD (microsft account via oauth)
- [ ] User can Register
- [ ] User can reset password

#### Register
- [ ] User can register with email and password
  - Email
    - [ ] Email Requirements
      - [ ] Valid Email
      - [ ] Unique Email      
  - Password 
    - [ ] Password Requirements
      - [ ] 8 Characters
      - [ ] 1 Uppercase
      - [ ] 1 Lowercase
      - [ ] 1 Number
      - [ ] 1 Special Character
    - [ ] Password Confirmation
    - [ ] Password hashed and salted
  - First Name
  - Last Name
  - Phone Number

#### Dashboard
- [ ] Welcome Message
- [ ] User can see a list of upcoming bookings
- [ ] User can see a list of all bookings via calendar

#### Map View
- [ ] Users can navigate World Map to find office locations
- [ ] Users can select office locations to book a room
- [ ] Users can select office floor
  - [ ] Users can quickly navigate to a floor via a group of buttons
- [ ] Users can select bookable resources on a floor and add to cart
- [ ] Users can apply filters i.e css styling to the floor view
  - [ ] Reasource Catagory
  - [ ] >> Catagory Specific Filters
  - [ ] Date
  - [ ] Time
  - [ ] Duration

#### List View
- [ ] Users can navigate a list of all bookable resources
- [ ] Users can select bookable resources and add to cart
- [ ] Users can apply filters to the list view
  - [ ] Reasource Catagory
  - [ ] >> Catagory Specific Filters
  - [ ] Date
  - [ ] Time
  - [ ] Duration

#### Bookings Page
- [ ] Users can see a table of all current / upencoming bookings
- [ ] Users can see a table of all past bookings
- [ ] Users can see a table of all cancelled bookings
- [ ] User can drill down into any one of these bookings to get more info / manage booking
- [ ] Users can apply filters to each individual table
  - [ ] DateTime Range
  - [ ] Resource
  - [ ] Location

#### Booking Info Page
- [ ] Users can see all info about a booking
- [ ] Users can see a map of the location of the booking
- [ ] Users can cancel a booking
- [ ] Users can amend a booking

#### Booking Basket Slide-over
- [ ] Users can see all items in their basket
- [ ] Users can remove items from their basket
- [ ] Users can amend items in their basket
- [ ] Users can checkout their basket

#### Profile + Settings Page
- [ ] Users can see all their profile info
- [ ] Users can amend their profile info
- [ ] Users can see all their settings
- [ ] Users can amend their settings

#### Help Page
- [ ] Users can see a list of FAQ's
- [ ] ?? Chatbot / Live Chat like feature

#### FYP About Page
- [ ] Users can see a list of all contributors
- [ ] Users can see a list of all technologies used
- [ ] Users can see a list of all resources used
- [ ] Users can see a list of all references used

### Non-Functional Requirements
- [ ] Users can use the app on any device
- [ ] Users can use the app on any browser
- [ ] Users can use the app on any OS
- [ ] Users can use the app on any screen size
- [ ] Users can use the app on any screen orientation
- [ ] Users can use the app on any network
- [ ] Users can use the app on any location
- [ ] Users can use the app on any time zone
- [ ] Users can use the app on any language
- [ ] Users can use the app on any culture
- [ ] Users can use the app on any accessibility settings
- [ ] Users can use the app on any assistive technology
- [ ] Users can use the app on any input device
- [ ] Users can use the app on any output device

### Security Requirements
- [ ] Users can only access their own data
- [ ] ?? Users can only access their own help requests
