export type Theme = 'light' | 'dark';
export type Component = 'in use' | 'modified' | 'standby' | 'free' | 'user' | 'kernel' | 'sent' | 'received';
export type GlobalDescription = 'memory' | 'cpu' | 'network';
export type Kind = 'global' | 'process';
export type SymbolId = 'triangle' | 'square' | 'circle' | 'cross';
export type OKLCHFormat = `oklch(${number}% ${number} ${number})`;
export type FormattedDate = string & { __brand: "FormattedDate" };

export type Boundaries = number[];
export type BoundariesFormatted = Date[];

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

export type GroupsMap = Map<Group['id'], Group>;

// Colors must have the properties of the global descriptions + process
export type Colors = Record<GlobalDescription | Extract<Kind, 'process'>, OKLCHFormat>;

export type Point = {
  boundary: Date;
  value: number;
  label: string;
  component: Component;
  groupId: number;
};

export type FilterOption = {
  value: string;
  label: string;
}

export type Filters = {
  kind: Kind[];
  component: Component[];
  description: GlobalDescription[];
  processDescription: string[];
}

export type MetaData = {
  group: Group,
  value: number,
  component: Component,
  time: FormattedDate
}