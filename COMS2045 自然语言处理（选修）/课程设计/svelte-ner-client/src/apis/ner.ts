import request from '@/utils/request';

export type NERTag =
  | 'E_ns'
  | 'M_nr'
  | 'B_ns'
  | 'E_nt'
  | 'M_nt'
  | 'B_nt'
  | 'M_ns'
  | 'E_nr'
  | 'O'
  | 'B_nr';

const nerApi = {
  async predict(sentence: string) {
    return request<Array<[string, NERTag]>>('/api/ner', {
      method: 'GET',
      params: {
        sentence,
      },
    });
  },
};

export default nerApi;
