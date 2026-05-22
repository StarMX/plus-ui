
export type DeviceVO = {
    channels: number;
    created_at: string;
    device_id: number | string | undefined;
    expires: number;
    ext: Ext;
    id: string;
    ip: string;
    is_online: boolean;
    keepalive_at: string;
    keepalives: number;
    name: string;
    password: string;
    port?: number;
    registered_at?: string;
    stream_mode?: number;
    transport?: string;
    updated_at?: string;
    address?: string;
    type?: string;
    username?: string;
};
export type Ext = {
    firmware: string;
    manufacturer: string;
    model: string;
    name: string;
    gb_version: string;
};


export interface DeviceQuery extends PageQuery {
    key: string;
    size: number;
    page: number;
}



export type ChannelVO = {
    channel_id: number | string | undefined;
    device_id: number | string | undefined;
    did: string;
    ext: Ext;
    id: string;
    is_online: boolean;
    name: string;
    ptztype: number;
};

export interface ChannelQuery extends PageQuery {
    device_id: number | string | undefined;
    key: string;
    size: number;
    page: number;
}


