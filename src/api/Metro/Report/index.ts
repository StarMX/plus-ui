import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MonitorDataVO } from '@/api/Metro/Report/types';


export const MonitorRecordOfLatest = (): AxiosPromise<MonitorDataVO[]> => {
  return request({
    baseURL: "/api",
    url: '/Metro/Report/RecordOfLatest',
    method: 'get'
  });
};
