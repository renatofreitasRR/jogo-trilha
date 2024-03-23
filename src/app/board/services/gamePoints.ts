import combinations_json from "../../../../data/combinations.json";
import { LayerCombinationsType } from "../interfaces/dotCombinationType";
import { DotType } from "../interfaces/dotType";

export class GamePoints {

    private _combinations: LayerCombinationsType;

    constructor() {
        this._combinations = combinations_json as LayerCombinationsType;
    }

    private getDotMatchingLayers(dot: DotType): number[][] {
        const matchingArrays: number[][] = [];

        dot.layers.forEach((layer) => {
            const layerIndex = layer as 1 | 2 | 3 | 4;

            const dotsCombination = this._combinations.layers[layerIndex]

            if (layer) {
                matchingArrays.push(...dotsCombination.filter(arr => arr.includes(parseInt(dot.id))));
            }

        });

        return matchingArrays;
    }

    private getAllMatchingLayers(): number[][] {
        const matchingArrays: number[][] = [];

        const dotsCombinationLayerOne = this._combinations.layers[1]
        const dotsCombinationLayerTwo = this._combinations.layers[2]
        const dotsCombinationLayerThree = this._combinations.layers[3]
        const dotsCombinationLayerFour = this._combinations.layers[4]

        matchingArrays.push(...dotsCombinationLayerOne);
        matchingArrays.push(...dotsCombinationLayerTwo);
        matchingArrays.push(...dotsCombinationLayerThree);
        matchingArrays.push(...dotsCombinationLayerFour);


        return matchingArrays;
    }

    hasPlayerEnemyDotsToEat(eatTime: boolean, boardDots: DotType[], playerTurn: 1 | 2): boolean {
        const playerEnemy = playerTurn === 1 ? 2 : 1;
        let hasEnemyDotsToEat = false;

        boardDots.forEach(dot => {
            if (dot.has_piece === true && dot.blink_dot === true && dot.player === playerEnemy)
                hasEnemyDotsToEat = true;
        });

        return hasEnemyDotsToEat;
    }

    dotToEatIsInARowCombination(dot_clicked: DotType, getDot: (dot_id: string) => DotType): boolean {
        const combinationsMatched = this.getDotMatchingLayers(dot_clicked);
        let dotIsInARow = false;

        combinationsMatched.forEach(combinations => {
            const dots: DotType[] = [];

            combinations.filter(id => String(id) != dot_clicked.id).forEach(dot_id => {
                const dot = getDot(String(dot_id));

                dots.push(dot);
            });

            if (
                dots.every(
                    dot =>
                        (dot.hasOwnProperty('has_piece') || dot?.has_piece) && dot_clicked.player == dot.player)
            )
                dotIsInARow = true;

        });

        return dotIsInARow;
    }

    rowCombined(dot_clicked: DotType, playerTurn: 1 | 2, getDot: (dot_id: string) => DotType): boolean {
        const combinationsMatched = this.getDotMatchingLayers(dot_clicked);
        let rowMaked = false;

        combinationsMatched.forEach(combinations => {
            const dots: DotType[] = [];

            combinations.filter(id => String(id) != dot_clicked.id).forEach(dot_id => {
                const dot = getDot(String(dot_id));

                dots.push(dot);
            });

            if (
                dots.every(
                    dot =>
                        (dot.hasOwnProperty('has_piece') || dot?.has_piece) && dot.player === playerTurn) && dot_clicked.player == undefined
            )
                rowMaked = true;

        });

        return rowMaked;
    }

}