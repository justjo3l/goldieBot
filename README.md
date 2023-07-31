# GoldieBot
Messenger bot for Goldstein College

This bot intends to provide Goldstein residents easy access to Dino menus, Goldie events, Shop and much more! This also provides an opportunity for Goldstein COMP and ENG students (or anyone interested) to contribute to a software project for Goldstein.

## Active Commands

- ### `dino`

    Returns a message showing the menu for the next possible meal at dino.
  
    For example, if you send this command at 03:00 PM on a Sunday, it will show you the Dinner menu for Sunday.
    
    Usage example:
    ```
    dino
    ```

- ### `dino <date> <meal_type>`

    Returns a message showing the menu for a specific meal on a certain date. The Date format is DD/MM/YYY.
    
    Acceptable inputs for meal_type are "breakfast", "brunch", "lunch" and "dinner". Any other input will automatically result in the return of dinner menu (as it is the most searched menu).
    
    Usage example:
    ```
    dino 30/07/2023 breakfast
    ```

- ### `breakfast`

    Returns a message showing the breakfast menu for the day.
    
    Usage example:
    ```
    breakfast
    ```

- ### `brunch`

    Returns a message showing the brunch menu for the day.
    
    Usage example:
    ```
    brunch
    ```

- ### `lunch`

    Returns a message showing the lunch menu for the day.
    
    Usage example:
    ```
    lunch
    ```

- ### `dinner`

    Returns a message showing the dinner menu for the day.
    
    Usage example:
    ```
    dinner
    ```

## Other Features

If an unrecognized message is sent, the bot replies with a simple message saying the following:

_Hello <user_name>! You said "<sent_message>"!_

## Contributing to the project

In order to contribute to the project, it would be recommended to read through and understand the current codebase and then work on issues that have been raised, or raise one yourself.

Clone the repository locally, create a new branch with the appropriate changes and make a pull request with a detailed description of the changes made and wait for the request to be approved for merging into the main branch.

For any questions regarding contributing to the project or general concerns about the codebase, contact Joel Jose (Room 326).
