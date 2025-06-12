import { parse, stringify } from 'devalue';

export const devalueTransformer = {
  serialize: (data: any) => stringify(data),
  deserialize: (data: any) => parse(data)
};
