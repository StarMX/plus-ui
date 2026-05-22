export interface MonitorDataVO {
    create_time: any;        // ISO 格式时间字符串
    o3: number;                 // 臭氧值
    pm10chu: number;            // PM10 出值
    pm10hui: number;            // PM10 回值
    pm25chu: number;            // PM2.5 出值
    pm25hui: number;            // PM2.5 回值
    wind_spe: number;           // 风速
    yacha: number;              // 气压
    StationId: string;          // 站点ID
    Category: string;           // 设备类别
    DeviceName: string;         // 设备名称
    DeviceCode: string;         // 设备编码
    NodeId: number;             // 节点ID
    City: string;               // 城市
    StationName: string;        // 站点名称
    Status: 'on' | 'off';       // 设备状态
    Code: string;               // 设备代码
    Location: string | null;    // 位置信息（可能为null）
}
