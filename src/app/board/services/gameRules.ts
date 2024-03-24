import { DotType } from "../interfaces/dotType";

export class GameRules {

    static canMove(dotClicked: DotType, gameLevel: 1 | 2 | 3): boolean {
        if (gameLevel == 1) return false;

        if ((dotClicked.hasOwnProperty('has_piece') === false || dotClicked?.has_piece === false) && dotClicked.blink_dot === true)
            return true;

        return false;
    }

    static canBlink(dotClicked: DotType, playerTurn: 1 | 2): boolean {

        if (dotClicked?.has_piece && dotClicked.player == playerTurn)
            return true;

        return false;
    }

    static canPutDot(playerTurn: 1 | 2, dotClicked: DotType, playerOneChipsAvailable: number, playerTwoChipsAvailable: number, eatTime: boolean): boolean {
        const isPlayerOne = playerTurn === 1;

        if (eatTime === true)
            return false;

        if (dotClicked?.has_piece === true)
            return false;

        if (isPlayerOne && playerOneChipsAvailable == 0)
            return false;

        if (isPlayerOne === false && playerTwoChipsAvailable == 0)
            return false;

        return true;
    }

    static canChangeToLevelTwo(playerOneChipsAvailable: number, playerTwoChipsAvailable: number, gameLevel: 1 | 2 | 3): boolean {
        return gameLevel == 1 && (playerOneChipsAvailable == 0 || playerTwoChipsAvailable == 0);
    }

    static canEat(eatTime: boolean, playerTurn: 1 | 2, dotClicked: DotType): boolean {

        if (eatTime === true && dotClicked.has_piece === true && dotClicked.player != playerTurn && dotClicked.blink_dot === true)
            return true;

        return false;
    }

    static canChangeToLevelThree(gameLevel: 1 | 2 | 3, playerTurn: 1 | 2,): boolean {

        if (gameLevel == 2)
            return true;
        else
            return false;
    }
}