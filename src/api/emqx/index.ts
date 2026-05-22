import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MonitorCurrentVO,ClientVO } from '@/api/emqx/types';


export const getMonitorCurrent = (): MonitorCurrentVO => {
    return request({
      baseURL:"/api/tools",
      url: '/emqx/MonitorCurrent',
      method: 'get'
    }) as unknown as MonitorCurrentVO;
};

// 获取数据源名称
export const getClients = (): AxiosPromise<ClientVO[]>  => {
  return request({
    baseURL:"/api/tools",
    url: '/emqx/Clients',
    method: 'get'
  });
};
