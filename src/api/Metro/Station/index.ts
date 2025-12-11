
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StationVO, StationForm, StationQuery } from '@/api/Metro/Station/types';

/**
 * 查询Station列表
 * @param query
 * @returns {*}
 */

export const listStation = (query?: StationQuery): AxiosPromise<StationVO[]> => {
  return request({
    url: '/Metro/MetroStation/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询Station详细
 * @param Id
 */
export const getStation = (Id: string | number): AxiosPromise<StationVO> => {
  return request({
    url: '/Metro/MetroStation/' + Id,
    method: 'get'
  });
};

/**
 * 新增Station
 * @param data
 */
export const addStation = (data: StationForm) => {
  return request({
    url: '/Metro/MetroStation',
    method: 'post',
    data: data
  });
};

/**
 * 修改Station
 * @param data
 */
export const updateStation = (data: StationForm) => {
  return request({
    url: '/Metro/MetroStation',
    method: 'put',
    data: data
  });
};

/**
 * 删除Station
 * @param Id
 */
export const delStation = (Id: string | number | Array<string | number>) => {
  return request({
    url: '/Metro/MetroStation/' + Id,
    method: 'delete'
  });
};