"use client"

export class GameAudio {
    private _clickAudio: any;
    private _blockAudio: any;
    private _eatAudio: any;
    private _winAudio: any;
    private _loseAudio: any;
    private _moveAudio: any;

    constructor() {
        this._clickAudio = new Audio('/sounds/click.wav');
        this._blockAudio = new Audio('/sounds/block.mp3');
        this._eatAudio = new Audio('/sounds/eat.mp3');
        this._winAudio = new Audio('/sounds/win.mp3');
        this._loseAudio = new Audio('/sounds/lose.mp3');
        this._moveAudio = new Audio('/sounds/move.mp3');
    }



    clickAudio() {
        this._clickAudio.play()
    }

    blockAudio() {
        this._blockAudio.play()
    }

    eatAudio() {
        this._eatAudio.play()
    }

    winAudio() {
        this._winAudio.play()
    }

    loseAudio() {
        this._loseAudio.play()
    }

    moveAudio() {
        this._moveAudio.play()
    }

}

