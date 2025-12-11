export interface RecordVO extends BaseEntity {
    /**
     * 主键
     */
    id:number | string | undefined;
    /**
     * 节点
     */
    nodeId:string;
    /**
     * 设备号
     */
    deviceCode:string;
    /**
     * 设备名称
     */
    deviceName:string;
    /**
     * 臭氧
     */
    o3:string;
    /**
     * 出风口(PM10)
     */
    pm10chu:string;
    /**
     * 回风口(PM10)
     */
    pm10hui:string;
    /**
     * 出风口(PM2.5)
     */
    pm25chu:string;
    /**
     * 回风口(PM2.5)
     */
    pm25hui:string;
    /**
     * 风速
     */
    windSpe:string;
    /**
     * 压差
     */
    yacha:string;
  }
  
  export interface RecordForm {
    /**
     * 主键
     */
    id:number | string | undefined;
    /**
     * 节点
     */
    nodeId:string;
    /**
     * 设备号
     */
    deviceCode:string;
    /**
     * 设备名称
     */
    deviceName:string;
    /**
     * 臭氧
     */
    o3:string;
    /**
     * 出风口(PM10)
     */
    pm10chu:string;
    /**
     * 回风口(PM10)
     */
    pm10hui:string;
    /**
     * 出风口(PM2.5)
     */
    pm25chu:string;
    /**
     * 回风口(PM2.5)
     */
    pm25hui:string;
    /**
     * 风速
     */
    windSpe:string;
    /**
     * 压差
     */
    yacha:string;
  }
  
  
  
  export interface RecordQuery extends PageQuery {
    /**
     * 节点
     */
    nodeId:string;
    /**
     * 设备号
     */
    deviceCode:string;
    /**
     * 日期范围参数
     */
    params?: any;
  }
  