import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ZeroTierVO } from '@/api/tool/zerotier/types';

export const listMember = (): AxiosPromise<ZeroTierVO[]>  => {
    return request({
      baseURL: "/api",
      url: '/Tools/ZeroTier/Member',
      method: 'get'
    });
};
