type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

function toVal(mix: any) {
  let k,
    y,
    str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      const len = mix.length;
      for (k = 0; k < len; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            str && (str += " ");
            str += y;
          }
        }
      }
    } else {
      for (y in mix) {
        if (mix[y]) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          str && (str += " ");
          str += y;
        }
      }
    }
  }
  return str;
}

export function clsx(...inputs: ClassValue[]): string {
  let i = 0,
    tmp,
    x,
    str = "";
  const len = inputs.length;

  for (; i < len; i++) {
    if ((tmp = inputs[i])) {
      if ((x = toVal(tmp))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        str && (str += " ");
        str += x;
      }
    }
  }
  return str;
}
