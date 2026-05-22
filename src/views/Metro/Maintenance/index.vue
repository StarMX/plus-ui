
<template>
	<div class="app-container">
		<transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
			<div v-show="showSearch" class="mb-[10px]">
				<el-card shadow="hover">
					<el-form ref="queryFormRef" :model="queryParams" :inline="true">
			<el-form-item label="所属站点" prop="stationId">
				<el-input
				  v-model="queryParams.stationId"
				  placeholder="请输入所属站点"
				  clearable=""
				  @keyup.enter="handleQuery"/>
			</el-form-item>
			<el-form-item label="所属设备" prop="deviceId">
				<el-input
				  v-model="queryParams.deviceId"
				  placeholder="请输入所属设备"
				  clearable=""
				  @keyup.enter="handleQuery"/>
			</el-form-item>
			<el-form-item label="维护类型" prop="maintenanceType">
				<el-select v-model="queryParams.maintenanceType" placeholder="请选择维护类型">
					<el-option v-for="dict in sys_device_type" :key="dict.value" :label="dict.label" :value="dict.value" ></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="维护日期" prop="maintenanceDate">
				<el-date-picker clearable=""
				  v-model="queryParams.maintenanceDate"
				  type="date"
				  value-format="YYYY-MM-DD"
				  placeholder="请选择维护日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="维护人员" prop="maintenancePerson">
				<el-input
				  v-model="queryParams.maintenancePerson"
				  placeholder="请输入维护人员"
				  clearable=""
				  @keyup.enter="handleQuery"/>
			</el-form-item>
			<el-form-item label="设备状态" prop="deviceStatus">
				<el-select v-model="queryParams.deviceStatus" placeholder="请选择设备状态">
					<el-option v-for="dict in sys_common_status" :key="dict.value" :label="dict.label" :value="dict.value" ></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="维护结果" prop="maintenanceResult">
				<el-select v-model="queryParams.maintenanceResult" placeholder="请选择维护结果">
					<el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" ></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="下次维护时间" prop="nextMaintenanceTime">
				<el-date-picker clearable=""
				  v-model="queryParams.nextMaintenanceTime"
				  type="date"
				  value-format="YYYY-MM-DD"
				  placeholder="请选择下次维护时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="维护费用" prop="maintenanceCost">
				<el-input
				  v-model="queryParams.maintenanceCost"
				  placeholder="请输入维护费用"
				  clearable=""
				  @keyup.enter="handleQuery"/>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input
				  v-model="queryParams.remark"
				  placeholder="请输入备注"
				  clearable=""
				  @keyup.enter="handleQuery"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
				<el-button icon="Refresh" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>
		</el-card>
	</div>
	</transition>
		
		<el-card shadow="hover">
			<template #header="">
			<el-row :gutter="10" class="mb8">
				<el-col :span="1.5">
					<el-button type="primary" plain="" icon="Plus" @click="handleAdd" v-hasPermi="['metro:metromaintenance:add']">新增</el-button>
				</el-col>
				<el-col :span="1.5">
					<el-button type="success" plain="" icon="Edit" :disabled="single" @click="handleUpdate" v-hasPermi="['metro:metromaintenance:edit']" >修改</el-button>
				</el-col>
				<el-col :span="1.5">
					<el-button type="danger" plain="" icon="Delete" :disabled="multiple" @click="handleDelete" v-hasPermi="['metro:metromaintenance:remove']" >删除</el-button>
				</el-col>
				<el-col :span="1.5">
					<el-button type="warning" plain="" icon="Download" @click="handleExport" v-hasPermi="['metro:metromaintenance:export']" >导出</el-button>
				</el-col>
				<right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
			</el-row>
			</template>

			<el-table v-loading="loading" :data="MetroMaintenanceList" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column label="主键ID" align="center" prop="id" />
				<el-table-column label="维护类型" align="center" prop="maintenanceType">
					<template #default="scope">
						<dict-tag :options="sys_device_type" :value="scope.row.maintenanceType"/>
					</template>
				</el-table-column>
				<el-table-column label="维护日期" align="center" prop="maintenanceDate" width="180">
					<template #default="scope">
						<span> {{  parseTime(scope.row.maintenanceDate, '{y}-{m}-{d}')  }} </span>
					</template>
				</el-table-column>
				<el-table-column label="维护人员" align="center" prop="maintenancePerson" />
				<el-table-column label="维护内容" align="center" prop="maintenanceContent" />
				<el-table-column label="设备状态" align="center" prop="deviceStatus">
					<template #default="scope">
						<dict-tag :options="sys_common_status" :value="scope.row.deviceStatus"/>
					</template>
				</el-table-column>
				<el-table-column label="维护结果" align="center" prop="maintenanceResult">
					<template #default="scope">
						<dict-tag :options="sys_yes_no" :value="scope.row.maintenanceResult"/>
					</template>
				</el-table-column>
				<el-table-column label="下次维护时间" align="center" prop="nextMaintenanceTime" width="180">
					<template #default="scope">
						<span> {{  parseTime(scope.row.nextMaintenanceTime, '{y}-{m}-{d}')  }} </span>
					</template>
				</el-table-column>
				<el-table-column label="维护费用" align="center" prop="maintenanceCost" />
				<el-table-column label="备注" align="center" prop="remark" />
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
					<template #default="scope">
						<el-button link="" type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['metro:metromaintenance:edit']">修改</el-button>
						<el-button link="" type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['metro:metromaintenance:remove']">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
		</el-card>
		
		<!-- 添加或修改设备维护记录表对话框 -->
		<el-dialog v-model="dialog.visible" :title="dialog.title" width="780px" append-to-body="">
			<!-- SubTable -->
			<el-form ref="MetroMaintenanceFormRef" :model="form" :rules="rules" label-width="80px">
				<el-form-item label="所属站点ID" prop="stationId">
					<el-input v-model="form.stationId" placeholder="请输入所属站点ID" />
				</el-form-item>
				
				<el-form-item label="所属设备ID" prop="deviceId">
					<el-input v-model="form.deviceId" placeholder="请输入所属设备ID" />
				</el-form-item>
				
				<el-form-item label="维护类型" prop="maintenanceType">
					<el-select v-model="form.maintenanceType" placeholder="请选择维护类型">
						<el-option v-for="dict in sys_device_type" :key="dict.value" :label="dict.label" :value="dict.value" ></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="维护日期" prop="maintenanceDate">
					<el-date-picker clearable=""
					  v-model="form.maintenanceDate"
					  type="date"
					  value-format="YYYY-MM-DD"
					  placeholder="请选择维护日期">
					</el-date-picker>
				</el-form-item>
				
				<el-form-item label="维护人员" prop="maintenancePerson">
					<el-input v-model="form.maintenancePerson" placeholder="请输入维护人员" />
				</el-form-item>
				
				<el-form-item label="维护内容">
					<editor v-model="form.maintenanceContent" :min-height="192"/>
				</el-form-item>
				
				<el-form-item label="设备状态" prop="deviceStatus">
					<el-select v-model="form.deviceStatus" placeholder="请选择设备状态">
						<el-option v-for="dict in sys_common_status" :key="dict.value" :label="dict.label" :value="dict.value" ></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="维护结果" prop="maintenanceResult">
					<el-radio-group v-model="form.maintenanceResult">
						<el-radio
						  v-for="dict in sys_yes_no"
						  :key="dict.value"
						  :label="dict.label">
						</el-radio>
					</el-radio-group>
				</el-form-item>
				
				<el-form-item label="下次维护时间" prop="nextMaintenanceTime">
					<el-date-picker clearable=""
					  v-model="form.nextMaintenanceTime"
					  type="date"
					  value-format="YYYY-MM-DD"
					  placeholder="请选择下次维护时间">
					</el-date-picker>
				</el-form-item>
				
				<el-form-item label="维护费用" prop="maintenanceCost">
					<el-input v-model="form.maintenanceCost" placeholder="请输入维护费用" />
				</el-form-item>
				
				<el-form-item label="备注" prop="remark">
					<el-input v-model="form.remark" placeholder="请输入备注" />
				</el-form-item>
				
			</el-form>
			<template #footer="">
				<div class="dialog-footer">
					<el-button type="primary" @click="submitForm">确 定</el-button>
					<el-button @click="cancel">取 消</el-button>
				</div>
			</template>
			<!-- SubTable -->
		</el-dialog>
	</div>
</template>

<script setup="" name="Maintenance" lang="ts">
	import { listMetroMaintenance, getMetroMaintenance, delMetroMaintenance, addMetroMaintenance, updateMetroMaintenance } from "@/api/Metro/Maintenance";
	import { MetroMaintenanceVO, MetroMaintenanceForm, MetroMaintenanceQuery } from '@/api/Metro/Maintenance/types';

	const { proxy } = getCurrentInstance() as ComponentInternalInstance;
	const { sys_device_type } = toRefs<any>(proxy?.useDict('sys_device_type'));
	const { sys_common_status } = toRefs<any>(proxy?.useDict('sys_common_status'));
	const { sys_yes_no } = toRefs<any>(proxy?.useDict('sys_yes_no'));
	
	const MetroMaintenanceList = ref<MetroMaintenanceVO[]>([]);
	
	const open = ref(false);
	const loading = ref(true);
	const showSearch = ref(true);
    const ids = ref<Array<string | number>>([]);
	const single = ref(true);
	const multiple = ref(true);
	const total = ref(0);


	const queryFormRef = ref<ElFormInstance>();
	const MetroMaintenanceFormRef = ref<ElFormInstance>();

    const dialog = reactive<DialogOption>({
        visible: false,
        title: ''
    });

	
	const initFormData: MetroMaintenanceForm = {
		stationId: null,
		deviceId: null,
		maintenanceType: null,
		maintenanceDate: null,
		maintenancePerson: null,
		maintenanceContent: null,
		deviceStatus: null,
		maintenanceResult: null,
		nextMaintenanceTime: null,
		maintenanceCost: null,
		remark: null,
	};

	const data = reactive({
        form: {...initFormData},
		queryParams: {
			pageNum: 1,
			pageSize: 10,
			stationId: null,
			deviceId: null,
			maintenanceType: null,
			maintenanceDate: null,
			maintenancePerson: null,
			maintenanceContent: null,
			deviceStatus: null,
			maintenanceResult: null,
			nextMaintenanceTime: null,
			maintenanceCost: null,
			remark: null,
		},
		rules: {
			stationId: [{ required: true, message: "所属站点ID不能为空", trigger:"blur" }],
			deviceId: [{ required: true, message: "所属设备ID不能为空", trigger:"blur" }],
			maintenanceType: [{ required: true, message: "维护类型不能为空", trigger: "change"  }],
			maintenanceDate: [{ required: true, message: "维护日期不能为空", trigger:"blur" }],
			maintenancePerson: [{ required: true, message: "维护人员不能为空", trigger:"blur" }],
			maintenanceContent: [{ required: true, message: "维护内容不能为空", trigger:"blur" }],
			deviceStatus: [{ required: true, message: "设备状态不能为空", trigger: "change"  }],
			maintenanceResult: [{ required: true, message: "维护结果不能为空", trigger: "change"  }],
		}
	});

	const { queryParams, form, rules } = toRefs(data);

	/** 查询$设备维护记录表列表 */
	 const getList= async() => {
		loading.value = true;
		const res = await listMetroMaintenance(queryParams.value);
		MetroMaintenanceList.value = res.rows;
		total.value = res.total;
		loading.value = false;
	}

	/** 取消按钮  */
	function cancel() {
		open.value = false;
		reset();
	}
	/** 表单重置 */
	const reset = () => {
		form.value = { ...initFormData };
		MetroMaintenanceFormRef.value?.resetFields();
	};
	/** 搜索按钮操作 */
	const handleQuery = () => {
		queryParams.value.pageNum = 1;
		getList();
	};
	/** 重置按钮操作 */
	const resetQuery = () => {
		queryFormRef.value?.resetFields();
		queryParams.value.stationId = undefined;
		queryParams.value.deviceId = undefined;
		queryParams.value.maintenanceType = undefined;
		queryParams.value.maintenanceDate = undefined;
		queryParams.value.maintenancePerson = undefined;
		queryParams.value.maintenanceContent = undefined;
		queryParams.value.deviceStatus = undefined;
		queryParams.value.maintenanceResult = undefined;
		queryParams.value.nextMaintenanceTime = undefined;
		queryParams.value.maintenanceCost = undefined;
		queryParams.value.remark = undefined;
		handleQuery();
	};
	/** 多选框选中数据 */
	const handleSelectionChange = (selection: MetroMaintenanceVO[]) => {
		ids.value = selection.map((item) => item.id);
		single.value = selection.length != 1;
		multiple.value = !selection.length;
	};
	/** 新增按钮操作 */
	const handleAdd = () => {
		reset();
		dialog.visible = true;
		dialog.title = '添加';
	};
	/**修改按钮操作 */
	const handleUpdate = async (row?: MetroMaintenanceVO) => {
		reset();
		const Id = row?.id || ids.value[0];
		const { data } = await getMetroMaintenance(Id);
		Object.assign(form.value, data);
		dialog.visible = true;
		dialog.title = '修改';
	};
	/** 提交按钮 */
	const submitForm = () => {
	  MetroMaintenanceFormRef.value?.validate(async (valid: boolean) => {
		if (valid) {
		  form.value.id ? await updateMetroMaintenance(form.value) : await addMetroMaintenance(form.value);
		  proxy?.$modal.msgSuccess('操作成功');
		  dialog.visible = false;
		  await getList();
		}
	  });
	};
	/** 删除按钮操作 */
	const handleDelete = async (row?: MetroMaintenanceVO) => {
	  const Ids = row?.id || ids.value;
	  await proxy?.$modal.confirm('是否确认删除编号为"' + Ids + '"的数据项？');
	  await delMetroMaintenance(Ids);
	  await getList();
	  proxy?.$modal.msgSuccess('删除成功');
	};

	onMounted(() => {
	  getList();
	});
</script>
