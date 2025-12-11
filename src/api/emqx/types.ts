export interface MonitorCurrentVO  {

    live_connections:number;
    connections:number;
    topics:number | string | undefined;
    subscriptions:number | string | undefined;
}


export interface ClientVO  {

    clientid:string | undefined;
    connected_at:string | undefined;
    created_at:string | undefined;
    ip_address:string | undefined;
    port:number | undefined;
    connected: boolean | undefined;
}