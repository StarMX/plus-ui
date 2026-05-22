
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { GatewayVO, GatewayForm, GatewayQuery } from '@/api/Metro/Gateway/types';

/**
 * 查询Gateway列表
 * @param query
 * @returns {*}
 */

export const listGateway = (query?: GatewayQuery): AxiosPromise<GatewayVO[]> => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroGateway/list',
    headers: {
      isEncrypt: true
    },
    method: 'get',
    params: query
  });
};

/**
 * 查询Gateway详细
 * @param Id
 */
export const getGateway = (Id: string | number): AxiosPromise<GatewayVO> => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroGateway/' + Id,
    method: 'get'
  });
};

/**
 * 新增Gateway
 * @param data
 */
export const addGateway = (data: GatewayForm) => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroGateway',
    method: 'post',
    data: data
  });
};

/**
 * 修改Gateway
 * @param data
 */
export const updateGateway = (data: GatewayForm) => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroGateway',
    method: 'put',
    data: data
  });
};

/**
 * 删除Gateway
 * @param Id
 */
export const delGateway = (Id: string | number | Array<string | number>) => {
  return request({
    baseURL: "/api",
    url: '/Metro/MetroGateway/' + Id,
    method: 'delete'
  });
};
