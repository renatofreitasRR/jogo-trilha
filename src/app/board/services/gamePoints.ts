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

    makeARow(dot: DotType, playerTurn: 1 | 2, getDot: (dot_id: string) => DotType) {
        console.log("DOT CLICKED", dot);

        const combinationsMatched = this.getMatchingLayers(dot);

        combinationsMatched.forEach(combinations => {
            const dots: DotType[] = [];

            combinations.forEach(dot_id => {
                const dot = getDot(String(dot_id));

                dots.push(dot);
            });

            if (
                dots.every(
                    dot =>
                        (dot.hasOwnProperty('has_piece') || dot?.has_piece) &&
                        dot.player === playerTurn)
            )
                console.log("TEM TODAS");

            console.log("dots", dots);
        });
    }

}