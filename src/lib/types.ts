export type Component = 'in use' | 'modified' | 'standby' | 'free' | 'user' | 'kernal' | 'sent' | 'recieved';
export type GlobalDescription = 'memory' | 'cpu' | 'network';
export type SymbolId = 'triangle' | 'square' | 'circle' | 'cross';

export type Boundaries = number[];

export type Metric = {
    group: number;
    start: number;
    end: number;
    component: Component;
    data: Array<number>;
}

export type Group =
  | { id: number; kind: 'global'; description: GlobalDescription; start: number; end: number }
  | { id: number; kind: 'process'; description: string; start: number; end: number };

export type BoundariesFormatted = Date[];

export type Point = {
  boundary: Date;
  value: number;
  label: string;
};