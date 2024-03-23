import combinations_json from "../../../../data/combinations.json";
import { LayerCombinationsType } from "../interfaces/dotCombinationType";
import { DotType } from "../interfaces/dotType";

export class GamePoints {

    private _combinations: LayerCombinationsType;

    constructor() {
        this._combinations = combinations_json as LayerCombinationsType;
    }

    private getMatchingLayers(dot: DotType): number[][] {
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

    makeARow(dot_clicked: DotType, playerTurn: 1 | 2, getDot: (dot_id: string) => DotType): boolean {
        const combinationsMatched = this.getMatchingLayers(dot_clicked);
        let rowMaked = false;

        combinationsMatched.forEach(combinations => {
            const dots: DotType[] = [];

            combinations.filter(id => String(id) != dot_clicked.id).forEach(dot_id => {
                const dot = getDot(String(dot_id));

                dots.push(dot);
            });

            console.log("DOTS", dots);
            console.log("DOTS EVERY", dots.every(dot => (dot.hasOwnProperty('has_piece') || dot?.has_piece) && dot.player === playerTurn));

            if (
                dots.every(
                    dot =>
                        (dot.hasOwnProperty('has_piece') || dot?.has_piece) && dot.player === playerTurn) && dot_clicked.player == undefined
            )
                rowMaked = true;

        });

        console.log("RETURNED", rowMaked);
        return rowMaked;
    }

}