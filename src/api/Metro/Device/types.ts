export interface DeviceVO  extends BaseEntity  {
    /**
     * 名称
     */
    fullName:string;
    /**
     * 地铁线路
     */
    lineName:string;
    /**
     * 设备类型
     */
    category:string;
    /**
     * 设备号
     */
    serial:string;
    /**
     * 所在位置
     */
    location:string;
    /**
     * 设备编码
     */
    code:string;
  }
  
  export interface DeviceForm {
    /**
     * 
     */
    id:number | string | undefined;
    /**
     * 地铁站
     */
    stationId:number | string | undefined;
    /**
     * 名称
     */
    fullName:string;
    /**
     * 地铁线路
     */
    lineName:string;
    /**
     * 设备类型
     */
    category:string;
    /**
     * 设备号
     */
    serial:string;
    /**
     * 所在位置
     */
    location:string;
    /**
     * 设备编码
     */
    code:string;
  }
  
  
  
  export interface DeviceQuery extends PageQuery {
      /**
      * 设备类型
      */
      id:number | string | undefined;
      /**
       * 地铁站
       */
      stationId:number | string | undefined;
      /**
       * 名称
       */
      fullName:string;
      /**
      * 设备类型
      */
      Category:string;
      /**
      * 设备编码
      */
      Code:string;
      /**
      * 日期范围参数
      */
      params?: any;
  }
  