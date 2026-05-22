
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DeviceVO, DeviceForm, DeviceQuery } from '@/api/Metro/Device/types';

/**
 * 查询Device列表
 * @param query
 * @returns {*}
 */

export const listDevice = (query?: DeviceQuery): AxiosPromise<DeviceVO[]> => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDevice/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询Device详细
 * @param Id
 */
export const getDevice = (Id: string | number): AxiosPromise<DeviceVO> => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDevice/' + Id,
    method: 'get'
  });
};

/**
 * 新增Device
 * @param data
 */
export const addDevice = (data: DeviceForm) => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDevice',
    method: 'post',
    data: data
  });
};

/**
 * 修改Device
 * @param data
 */
export const updateDevice = (data: DeviceForm) => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDevice',
    method: 'put',
    data: data
  });
};

/**
 * 删除Device
 * @param Id
 */
export const delDevice = (Id: string | number | Array<string | number>) => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDevice/' + Id,
    method: 'delete'
  });
};
