anytris


Notes
=====

Controls - Left and right have keyboard like repeat, up(rotate) has no repeat, down(drop1) has continous repeat, A(droptotal) does not repeat


Ticker({ repeatEvery : 1, initialRepeatDelay : 0, onValue : true, offValue : false })

Ticker is not time dependent, rather call dependent - next repeat value obtained by Ticker.value()

set repeatEvery to 0 to get just 1, with no repeats

use repeatEvery to get sequences like (example with 2)

x-x-x-x-x-x-x-x-x-

use combination of repeatEvery and initialRepeatDelay to get sequences like (example with 3, 6)

x------x--x--x--x--x--x--x--x--x--x--


Use in game - when a new controller press is made, make a new ticker with that controller key's repeat settings
if no keys pressed - destroy the repeater
if Ticker value is true, do the action represented by last controller button down


-----------------------

newAction = lastkeydown && keyOn(lastKeyDown)

if !newAction 

	gameaction = gamerepeater = false

else if newAction != gameAction

	gameaction = newaction
	gamerepater = repeaters(gameaction

endif


https://codepen.io/olam/pen/zcqea - css pulsing (speed indicator)