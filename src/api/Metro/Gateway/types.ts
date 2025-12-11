export interface GatewayVO {
      /**
   * 主键
   */
  Id:string;
  /**
   * 名称
   */
  Name:string;
  /**
   * SN
   */
  Sn:string;
  /**
   * 纬度
   */
  Lat:string;
  /**
   * 经度
   */
  Lon:string;
  /**
   * ICCID
   */
  Iccid:string;
}

export interface GatewayForm extends BaseEntity {
  /**
   * 主键
   */
  Id:string;
  /**
   * 名称
   */
  Name:string;
  /**
   * SN
   */
  Sn:string;
  /**
   * 纬度
   */
  Lat:string;
  /**
   * 经度
   */
  Lon:string;
  /**
   * ICCID
   */
  Iccid:string;
}



export interface GatewayQuery extends PageQuery {
    /**
    * 日期范围参数
    */
    params?: any;

    name:string;
    iccid:string;
    sn:string;
}
