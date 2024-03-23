export interface DotType {
    id: string;
    positions: string[];
    main_layer: number;
    layers: number[];
    can_join: number[];
    has_piece?: boolean;
    player?: 1 | 2;
    blink_dot?: boolean;
}