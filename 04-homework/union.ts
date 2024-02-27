
// Аналог Union - Mapped types
type MapToOptional<T> = {
    [K in keyof T]?: T[K];
};


interface MyObject {
    name: string;
    age: number;
}
type OptionalMyObject = MapToOptional<MyObject>;

// Union кастомный:
type UniqueValues<T extends any[]> = {
    [K in keyof T as T[K] extends T[number] ? `${T[K]}` : never]: T[K];
}[keyof T];


type Colors = 'red' | 'green' | 'blue' | 'red' | 'green' | 'yellow';
type UniqueColors = UniqueValues<[Colors]>;

