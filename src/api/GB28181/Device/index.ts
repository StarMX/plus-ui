import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DeviceVO, DeviceQuery, ChannelVO, ChannelQuery } from '@/api/GB28181/Device/types';


/**
 * 查询Device列表
 * @param query
 * @returns {*}
 */

export const listDevices = (query?: DeviceQuery): AxiosPromise<DeviceVO[]> => {
  return request({
    baseURL:'/api/Tools',
    url: '/GB28181/devices',
    method: 'get',
    params: query
  });
};

export const listChannels = (query?: ChannelQuery): AxiosPromise<ChannelVO[]> => {
  return request({
    baseURL:'/api/Tools',
    url: '/GB28181/channels',
    method: 'get',
    params: query
  });
};
