
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { RecordVO, RecordForm, RecordQuery } from '@/api/Metro/Record/types';

/**
 * 查询Record列表
 * @param query
 * @returns {*}
 */

export const listRecord = (query?: RecordQuery): AxiosPromise<RecordVO[]> => {
  return request({
    url: '/Metro/MetroDeviceRecord/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询Record详细
 * @param Id
 */
export const getRecord = (Id: string | number): AxiosPromise<RecordVO> => {
  return request({
    url: '/Metro/MetroDeviceRecord/' + Id,
    method: 'get'
  });
};

/**
 * 新增Record
 * @param data
 */
export const addRecord = (data: RecordForm) => {
  return request({
    url: '/Metro/MetroDeviceRecord',
    method: 'post',
    data: data
  });
};

/**
 * 修改Record
 * @param data
 */
export const updateRecord = (data: RecordForm) => {
  return request({
    url: '/Metro/MetroDeviceRecord',
    method: 'put',
    data: data
  });
};

/**
 * 删除Record
 * @param Id
 */
export const delRecord = (Id: string | number | Array<string | number>) => {
  return request({
    url: '/Metro/MetroDeviceRecord/' + Id,
    method: 'delete'
  });
};