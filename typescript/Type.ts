// 定义一个pick函数，生成从任意某个类型上取出指定的属性的值
const pick = <T, K extends keyof T>(obj: T, props: K[]): T[K][] => {
  return props.map((key) => obj[key]);
};

type MyPick<T, K extends keyof T> = { [P in K]: T[P] };

type Filter<T, U> = T extends U ? T : never;
type A = Filter<'a' | 'b', 'b' | 'c'>;
type B = Filter<'a', 'b' | 'c'> | Filter<'b', 'b' | 'c'>;

type ParamType<T> = T extends (param: infer P) => any ? P : T;
type C = ParamType<(param: number) => void>;

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type T0 = Unpacked<string>; // string
type T1 = Unpacked<string[]>; // string
type T2 = Unpacked<() => string>; // string
type T3 = Unpacked<Promise<string>>; // string
type T4 = Unpacked<Promise<string>[]>; // Promise<string>
type T5 = Unpacked<Unpacked<Promise<string>[]>>; // string
