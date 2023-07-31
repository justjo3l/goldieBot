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
    
    Acceptable inputs for meal_type are "breakfast", "brunch", "lunch" and "dinner". Any other input will automatically result in the return of dinner menu (as it is the most searched for menu).
    
    Usage example:
    ```
    dino 30/07/2023 breakfast
    ```
