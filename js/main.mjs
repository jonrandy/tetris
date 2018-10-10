
import CFG from './config.mjs';
import { Board, PieceQueue, PlayStates as PS } from './anytris.mjs';
import Tetrominos from './tetrominos.mjs';
import TetrisHTMLView from './tetrisHTML.mjs';
import { GC, SingleActionGameController, KeyboardDriver } from './gamecontroller.mjs';
import Ticker from './ticker.mjs';


const
	GAME_CONTROLLER = SingleActionGameController( KeyboardDriver(CFG.KEYBOARD_CONTROLS), CFG.CONTROL_REPEAT),
	VISUALISER = TetrisHTMLView({ document, debugMode: true })
;



let GAME = ((controller, gameVisualiser)=>{

	let

		action,
		score,
		state = PS.PASSIVE,
		board = Board(),
		piece,
		level,
		nextPieces,
		_fellOrDropped,
		_dropTicker,
		_moveDown = _movePiece(0, -1),
		_winners,

		_moveActionHandlers = {
			[GC.UP]: _rotate,
			[GC.BUTTON_A]: _rotate,
			[GC.BUTTON_B]: _drop,
			[GC.LEFT]: _movePiece(-1,0),
			[GC.RIGHT]: _movePiece(1,0),
			[GC.DOWN]: _moveDown
		},

		_stateHandlers = {

			// Game not active - waiting for user to initiate game
			[PS.PASSIVE] () {
				if (action==GC.BUTTON_START) _start();
			},

			// Game is active
			[PS.ACTIVE] () {

				_fellOrDropped = false;

				_winners = board.winningBlocks();
				if (_winners.length) {
					board.killBlocks(_winners);
					score += _winners.length / board.width;
					-_setLevel(1+(score/10)|0)
				}

				if (!piece) {
					piece = nextPieces.grabNext();
					if (!board.pieceFits(piece)) return _gameOver();
				}

				if (action==GC.BUTTON_SELECT) return _togglePause(true);
				if (action==GC.BUTTON_QUIT) return _quit();

				if (_dropTicker.value()) {
					_fellOrDropped = _moveDown();
				} else {
					_handleMove(action);
				}

				if (!board.pieceFits(piece)) {
					piece.undo();
					if (_fellOrDropped) {
						board.freeze([piece]);
						piece = false;
					}
				}

			},

			// Game is active, but paused
			[PS.PAUSED] () {
				if (action==GC.BUTTON_SELECT) _togglePause(false);
				if (action==GC.BUTTON_QUIT) _quit();
			}

		}



	;

	function _start() {
		_reset();
		state = PS.ACTIVE;
	}

	function _togglePause(paused) {
		state = paused ? PS.PAUSED : PS.ACTIVE;
	}

	function _quit() {
		state = PS.PASSIVE;
	}

	function _gameOver() {
		alert('Game over');
		state = PS.PASSIVE;
	}

	function _reset() {
		board.clear();
		score = 0;
		nextPieces = PieceQueue({ tileSet: Tetrominos, initialPos: CFG.PIECE_STARTPOS });
		piece = false;
		_setLevel(1);
	}

	function _setLevel(l) {
		if (level!==l) _dropTicker = _makeDropTicker(l);
		level = l;
	}

	function _makeDropTicker(level) {
		const
			loops = 22 - level*2,
			t = Ticker({ repeatEvery: loops })
		;
		t.value(); // move past initial tick
		return t;
	}

	function _handleMove(act) {
		if ((act==GC.BUTTON_B||act==GC.DOWN) && _fellOrDropped) return;
		_moveActionHandlers[act] && _moveActionHandlers[act]();
	}

	function _movePiece(dx, dy) {
		return ()=>{
			piece.moveRel(dx,dy);
			return true;
		};
	}

	function _rotate() {
		piece.rotate();
	}

	function _drop() {
		while (board.pieceFits(piece)) _moveDown();
		_fellOrDropped = true;
	}

	function step() {
		action = controller.getAction();
		_stateHandlers[state]();
	}

	function draw() {
		gameVisualiser.update({
			score,
			state,
			board,
			piece,
			nextPieces,
			level,
			action
		});
	}


	return {
		step,
		draw
	};

})(GAME_CONTROLLER, VISUALISER);

const GAMELOOP = () => {
	GAME.draw();
	GAME.step();
};

const gameId = window.setInterval(GAMELOOP, 50);
