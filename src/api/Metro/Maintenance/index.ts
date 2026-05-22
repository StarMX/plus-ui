
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MetroMaintenanceVO, MetroMaintenanceForm, MetroMaintenanceQuery } from '@/api/Metro/Maintenance/types';

/**
 * 查询设备维护记录表列表
 * @param query
 * @returns {*}
 */

export const listMetroMaintenance = (query?: MetroMaintenanceQuery): AxiosPromise<MetroMaintenanceVO[]> => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDeviceMaintenance/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询设备维护记录表详细
 * @param Id
 */
export const getMetroMaintenance = (Id: string | number): AxiosPromise<MetroMaintenanceVO> => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDeviceMaintenance/' + Id,
    method: 'get'
  });
};

/**
 * 新增设备维护记录表
 * @param data
 */
export const addMetroMaintenance = (data: MetroMaintenanceForm) => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDeviceMaintenance',
    method: 'post',
    data: data
  });
};

/**
 * 修改设备维护记录表
 * @param data
 */
export const updateMetroMaintenance = (data: MetroMaintenanceForm) => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDeviceMaintenance',
    method: 'put',
    data: data
  });
};

/**
 * 删除设备维护记录表
 * @param Id
 */
export const delMetroMaintenance = (Id: string | number | Array<string | number>) => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroDeviceMaintenance/' + Id,
    method: 'delete'
  });
};
