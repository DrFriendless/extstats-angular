# ExtstatsAngular

Angular components for my Extended Stats project.

Contents:
* a group of buttons used to control optional content above a feature, e.g. Documentation and Fiddles.
* a documentation component which loads text from a JSON file
* geek chips - small tiles representing a BGG user
* geek combo - the combo box which lets you choose users of the site
* geek list editor - a combination of the geek combo and geek chips to edit a list of geeks
* loader - the pulsating coloured buttons which indicate something is loading
* the user data service - interface for Angular to tell whether a user is logged in and get stored data for them
* the cookie service - interface for Angular to look at cookies
* the user tag service - a facade over the user data service to provide facilities for the board game link
* source / view infrastructure - allows a page component to load data from GraphQL and distribute it to the features on the page

## Release Notes

9.2.0 - remove old abstract component classes, add tagged selector to combo
      - UserTagService
9.2.1 - remove intrusive "no tags" from board game link
9.2.3 - added tag groups
9.3.0 - remove getAllTags from UserConfigService as it had become wrong
9.3.10 - add selector chips
9.3.11 - highlight used tag in mini taglist as bolding doesn't work for emojis
