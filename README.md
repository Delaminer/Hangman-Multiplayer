# Hangman Multiplayer

This is the client for the multiplayer version of Hangman I made. Players receive points based on the lives they have left and how fast they can correctly guess.

This was made in React, and the client and server communicate through Socket.io.

You can play this on my website at [https://projects.alexanderdelaiglesia.com/Hangman-Multiplayer/](https://projects.alexanderdelaiglesia.com/Hangman-Multiplayer/).

### Possible Changes

There are several things that can be improved with this or added:
 - Refactor player joining. Currently, players just join the first game in the list with space, not considering how many people there are (other than that it's not full) or how many rounds have already passed. As a result, a player might be put into a game already at round 5, and they will have little to no chance to catch up with the competition.
 - Adding private games. This is fairly straightforward, default to finding a public match while giving the player to join a private game or create one. Private games could also allow for custom rules, changing round times, difficulty/word set, maximum players, etc.
 - Show word after you lose: In the original game I created, whenever you lose, the whole word is shown so you know what you missed. This version does not have that. This could be done so that either when you lose, you are shown the word, or when time runs out, everyone is shown the word (so early losers can't help out other players).
 - Better word set, more hints: Right now, the words used are from lists of nouns, adjectives, and animals I found on the internet. There are tons of words missing, many of the ones I have may be confusing (I have not went over every word used), and most of them are boring. Other Hangman games have genres, and pop culture references, which make the game more fun and possibly easier. An extra hint could also be given, telling the player what genre the word is from, like "Famous People" or "Foods." This also connects to the idea of custom rules and custom word sets.
