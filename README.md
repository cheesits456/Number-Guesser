# Number-Guesser
A duo of Discord bots that play a number-guessing game with each other

_This was made just for fun because I was bored - it is not intended to serve any practical purpose apart from entertainment_

## Setup
1. Open a terminal in this project's root directory and run `npm i`
2. Open `src/config.ts` in a text editor and enter 2 valid Discord bot tokens in the appropriate places

## Usage
To start the bots, simply run `npm start` in the project's root directory. This will automatically compile and then run the TypeScript bot code.

Once the bots are online, you'll be able to use the `/start` command in a Discord channel to begin the game. Below is a detailed overview of the start command and the arguments you can give it:

    Usage: /start [min [max]]
    
    [] is used to mark optional input - brackets are not
       included in the actual command (see examples below)

    Options:
        min:    The minimum number that can be chosen
                type: number
                minimum: 0
                maximum: 1000000
                default: 0
        max:    The maximum number that can be chosen
                type: number
                minimum: 10
                maximum: 1000000000000
                default: 5000
                
    If an option is set outside of its valid range, it will
    set itself as close as it can to the number you specified
    while staying within its valid range (see examples below).
    
    If an option is set to something other than a number, it
    will set itself to that field's "default" value.
    
    If the value for "max" is less than the value for "min",
    the values will trade places.
    
    Examples:
        Command                Range for Random Number
        /start . . . . . . . . 0   -  5000
        /start 100 . . . . . . 100  - 5000
        /start 10000 . . . . . 5000 - 10000
        /start -20 1200  . . . 0   -  1200
        /start 10000 50  . . . 50  -  10000
        /start hello world . . 0   -  5000

## Samples
Here's a couple screenshots to show examples of what the bots look like in action:

<img alt="/start 0 100" src="https://cdn.discordapp.com/attachments/446968021492432900/753166525086564352/unknown.png" align="left">
<img alt="/start 0 100" src="https://cdn.discordapp.com/attachments/446968021492432900/753166963953500170/unknown.png" align="left">

