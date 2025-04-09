export interface Move {
    id: number;
    name: string;
    name_es: string;
    type: string;
    damage_class: string;
    power: number | null;
    accuracy: number | null;
    pp: number | null;
    //priority: number;
    effect: string;
    effect_es: string;
}