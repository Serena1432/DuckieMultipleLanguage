## 🔒 ARCHIVED / PAUSED

This plugin has been archived since July 2022.

**Why?**

I created this plugin during a difficult time in my life, when my parents were much stricter than they are now, and I was also dealing with the emotional fallout of losing someone I deeply loved and drew inspiration from. So eventually, I lost the motivation to continue working on it.

The plugin remains incomplete and may never be finished. However, I've recently discovered that some people are **actually** using it in their game development, which was kind of unexpected to me. Maybe, if I ever regain interest or inspiration, I’ll return to it someday. But as of now, it has been paused - or rather, **archived** - for over three years.

That said, thank you sincerely for your interest; it truly means a lot to me.

Also, I just realized I hadn’t included a license before, so I’ve now added an **MIT License**. That means you're completely free to use, modify, and distribute this plugin for any purpose - personal or commercial!

With gratitude,<br>
**Serena1432**

-----

```
============================================================================
 __  __       _ _   _ _                                              
|  \/  |     | | | (_) |                                             
| \  / |_   _| | |_ _| |     __ _ _ __   __ _ _   _  __ _  __ _  ___ 
| |\/| | | | | | __| | |    / _` | '_ \ / _` | | | |/ _` |/ _` |/ _ \
| |  | | |_| | | |_| | |___| (_| | | | | (_| | |_| | (_| | (_| |  __/
|_|  |_|\__,_|_|\__|_|______\__,_|_| |_|\__, |\__,_|\__,_|\__, |\___|
                                         __/ |             __/ |     
                                        |___/             |___/      
============================================================================
```

Version 1.0 beta - 2022/06/14

Author: Serena1432 - #DuckieHVNisthebest

## Important Notice

You should ONLY use this plugin to generate language files after your game has been finished. Changing the game data after generating and translating can lead to a SERIOUS error!

Also, the `Default.json` file mentioned in this plugin is NOT automatically updated each time you run the game or after changing the game data, so you NEED TO do it manually by deleting this file in the `languages` folder.

## Intro

This plugin will add the multiple language support for games made using the RPG Maker MV engine.

It has only been tested in RPGMV 1.6.1. Older or newer versions may not work properly.

## Instructions

* Copy the code to a text editor and save it as DuckieMultipleLanguage.js to the `plugins` folder of your game.
* Turn this plugin on in the Plugin Manager and run the game for the first time.
* A folder called `languages` will be added to your game folder containing a file called `Default.json` containing almost strings that should be translated.
* Now you just copy the JSON and save it as a new file with the name of your language (i.e. `Vietnamese.json`) and translate all of the strings in your newly saved file.

Notice that you can ONLY translate strings, NOT numbers. Changing the numbers in the JSON file may lead to an error.

## Features

* You can switch between languages while playing by changing the Language option in the Options part.
* You can also create a translated picture by saving the translated picture as `(original name)_(language name).png`. For example, if you have an original picture called `bruh.png` and the translated language is Vietnamese, you should save the translated picture as `bruh_Vietnamese.png` to the same folder as the original file.
* You can also add some custom language variables that can be used in the game if the plugin doesn't collect it automatically by using the Custom Language Variables in the Parameters part. Then these custom language strings will be added to the Default.json file and you can begin translating it.

You can use these custom variables anywhere by using this script command:

```js
    Language.custom.(customVariableName)
```

or:

```js
    Language.custom["(customVariableName)"]
```
if your custom variable name has spaces or special characters.

(customVariableName) is one of the defined custom variables in the Parameters part.

* After you has done all these things, you can translate all of the strings in the JSON file and all of the needed pictures directly without opening the game or you can send them to the translator if you want, without sending the entire project data.

## Known bugs/errors/missing features

* Translating strings and commands that were made by plugins are not yet implemented.
* If your text message or scrolling text contain two or more lines, each line of that message will be seperated into an object. This is RPGMV's fault and I don't know how to fix it yet.
* Some text may not be translated/changed after changing languages in the Options part. If this happens, just restart the game or return back to the Title Screen.

---

Good luck for using this plugin!
By the way, you can follow me on the GitHub account called "LilShieru":
https://www.github.com/LilShieru
