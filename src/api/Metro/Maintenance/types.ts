
export interface MetroMaintenanceVO {
  /**
   * 维护类型
   */
  maintenanceType:string;
  /**
   * 维护日期
   */
  maintenanceDate:string;
  /**
   * 维护人员
   */
  maintenancePerson:string;
  /**
   * 维护内容
   */
  maintenanceContent:string;
  /**
   * 设备状态
   */
  deviceStatus:string;
  /**
   * 维护结果
   */
  maintenanceResult:string;
  /**
   * 下次维护时间
   */
  nextMaintenanceTime:string;
  /**
   * 维护费用
   */
  maintenanceCost:string;
  /**
   * 备注
   */
  remark:string;
}

export interface MetroMaintenanceForm extends BaseEntity {
  /**
   * 所属站点ID
   */
  stationId:string;
  /**
   * 所属设备ID
   */
  deviceId:string;
  /**
   * 维护类型
   */
  maintenanceType:string;
  /**
   * 维护日期
   */
  maintenanceDate:string;
  /**
   * 维护人员
   */
  maintenancePerson:string;
  /**
   * 维护内容
   */
  maintenanceContent:string;
  /**
   * 设备状态
   */
  deviceStatus:string;
  /**
   * 维护结果
   */
  maintenanceResult:string;
  /**
   * 下次维护时间
   */
  nextMaintenanceTime:string;
  /**
   * 维护费用
   */
  maintenanceCost:string;
  /**
   * 备注
   */
  remark:string;
}



export interface MetroMaintenanceQuery extends PageQuery {
    /**
    * 所属站点ID
    */
    stationId:string;
    /**
    * 所属设备ID
    */
    deviceId:string;
    /**
    * 维护类型
    */
    maintenanceType:string;
    /**
    * 维护日期
    */
    maintenanceDate:string;
    /**
    * 维护人员
    */
    maintenancePerson:string;
    /**
    * 维护内容
    */
    maintenanceContent:string;
    /**
    * 设备状态
    */
    deviceStatus:string;
    /**
    * 维护结果
    */
    maintenanceResult:string;
    /**
    * 下次维护时间
    */
    nextMaintenanceTime:string;
    /**
    * 维护费用
    */
    maintenanceCost:string;
    /**
    * 备注
    */
    remark:string;
    /**
    * 日期范围参数
    */
    params?: any;
}
