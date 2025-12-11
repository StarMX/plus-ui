export interface StationVO  extends BaseEntity {
    /**
     * 主键
     */
    id:string;
    /**
     * 国家
     */
    country:string;
    /**
     * 城市
     */
    city:string;
    /**
     * 站点名称
     */
    fullName:string;
  }
  
  export interface StationForm {
    /**
     * 主键
     */
    id:number | string | undefined;
    /**
     * 站点照片
     */
    imageUrl:string;
    /**
     * 国家
     */
    country:string;
    /**
     * 城市
     */
    city:string;
    /**
     * 纬度
     */
    lat:string;
    /**
     * 经度
     */
    lon:string;
    /**
     * 站点名称
     */
    fullName:string;
  }
  
  
  
  export interface StationQuery extends PageQuery {
      /**
      * 站点名称
      */
      fullName:string;
      /**
      * 日期范围参数
      */
      params?: any;
  }
  