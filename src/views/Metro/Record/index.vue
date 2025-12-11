<template>
  <div class="app-container">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="设备号" prop="DeviceCode">
              <el-input
                v-model="queryParams.deviceCode"
                placeholder="请输入设备号"
                clearable=""
                readonly="readonly"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item label="节点" prop="NodeId">
              <el-input
                v-model="queryParams.nodeId"
                placeholder="请输入节点"
                clearable="" 
                readonly="readonly"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item label="创建时间" style="width: 308px">
              <el-date-picker
                v-model="dateRange"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
              ></el-date-picker>
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
        <template #header>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button v-hasPermi="['metro:record:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button v-hasPermi="['metro:record:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()">修改</el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button v-hasPermi="['metro:record:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()">删除</el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button v-hasPermi="['metro:record:export']" type="default" plain icon="Download" @click="handleExport()">导出数据</el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="warning" plain icon="Close" @click="handleClose">返回</el-button>
            </el-col>
            <right-toolbar v-model:show-search="showSearch" :columns="columns" @query-table="getList"></right-toolbar>
        </el-row>
        </template>

        <el-table v-loading="loading" :data="RecordList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="columns[0].visible" :label="columns[0].label" align="center" prop="id" />
        <el-table-column v-if="columns[1].visible" :label="columns[1].label" align="center" prop="nodeId" />
        <el-table-column v-if="columns[2].visible" :label="columns[2].label" align="center" prop="o3" />
        <el-table-column v-if="columns[3].visible" :label="columns[3].label" align="center" prop="pm10chu" />
        <el-table-column v-if="columns[4].visible" :label="columns[4].label" align="center" prop="pm10hui" />
        <el-table-column v-if="columns[5].visible" :label="columns[5].label" align="center" prop="pm25chu" />
        <el-table-column v-if="columns[6].visible" :label="columns[6].label" align="center" prop="pm25hui" />
        <el-table-column v-if="columns[7].visible" :label="columns[7].label" align="center" prop="windSpe" />
        <el-table-column v-if="columns[8].visible" :label="columns[8].label" align="center" prop="yacha" />
        <el-table-column v-if="columns[9].visible" :label="columns[9].label" align="center" prop="temp" />
        <el-table-column v-if="columns[10].visible" :label="columns[10].label" align="center" prop="humi" />
        <el-table-column v-if="columns[11].visible" :label="columns[11].label" align="center" prop="createTime" width="160">
          <template #default="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width"  width="150">
            <template #default="scope">
            <el-button link="" type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['metro:record:edit']">修改</el-button>
            <el-button link="" type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['metro:record:remove']">删除</el-button>
            </template>
        </el-table-column>
        </el-table>

        <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改Record对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="780px" append-to-body>
      <el-form ref="RecordFormRef" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="节点" prop="NodeId">
          <el-input v-model="form.nodeId" placeholder="请输入节点" />
        </el-form-item>
        
        <!-- <el-form-item label="设备名称" prop="DeviceName">
          <el-input v-model="form.deviceName" placeholder="请输入设备名称" />
        </el-form-item> -->
        
        <el-form-item label="臭氧" prop="O3">
          <el-input v-model="form.o3" placeholder="请输入臭氧" />
        </el-form-item>
        
        <el-form-item label="前风口(PM10)" prop="Pm10chu">
          <el-input v-model="form.pm10chu" placeholder="请输入出风口(PM10)" />
        </el-form-item>
        
        <el-form-item label="后风口(PM10)" prop="Pm10hui">
          <el-input v-model="form.pm10hui" placeholder="请输入回风口(PM10)" />
        </el-form-item>
        
        <el-form-item label="前风口(PM2.5)" prop="Pm25chu">
          <el-input v-model="form.pm25chu" placeholder="请输入出风口(PM2.5)" />
        </el-form-item>
        
        <el-form-item label="后风口(PM2.5)" prop="Pm25hui">
          <el-input v-model="form.pm25hui" placeholder="请输入回风口(PM2.5)" />
        </el-form-item>
        
        <el-form-item label="风速" prop="WindSpe">
          <el-input v-model="form.windSpe" placeholder="请输入风速" />
        </el-form-item>
        
        <el-form-item label="压差" prop="Yacha">
          <el-input v-model="form.yacha" placeholder="请输入压差" />
        </el-form-item>

        <el-form-item label="温度" prop="Temp">
          <el-input v-model="form.temp" placeholder="请输入温度" />
        </el-form-item>

        <el-form-item label="湿度" prop="Humi">
          <el-input v-model="form.humi" placeholder="请输入湿度" />
        </el-form-item>
      </el-form>
      <template #footer="">
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Record" lang="ts">
  import { listRecord, getRecord, delRecord, addRecord, updateRecord } from "@/api/Metro/Record";
  import { RecordVO, RecordForm, RecordQuery } from '@/api/Metro/Record/types';
  import router from '@/router';

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const RecordList = ref<RecordVO[]>([]);
    const loading = ref(true);
    const showSearch = ref(true);
    const ids = ref<Array<string | number>>([]);
    const single = ref(true);
    const multiple = ref(true);
    const total = ref(0);
    
    const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
    const route = useRoute();

    const queryFormRef = ref<ElFormInstance>();
    const RecordFormRef = ref<ElFormInstance>();

    const dialog = reactive<DialogOption>({
        visible: false,
        title: ''
    });

    // 列显隐信息
    const columns = ref<FieldOption[]>([
      { key: 0, label: `主键`, visible: false},
      { key: 1, label: `节点`, visible: false},
      { key: 2, label: `臭氧`, visible: true},
      { key: 3, label: `前风口(PM10)`, visible: true},
      { key: 4, label: `后风口(PM10)`, visible: true},
      { key: 5, label: `前风口(PM2.5)`, visible: true},
      { key: 6, label: `后风口(PM2.5)`, visible: true},
      { key: 7, label: `风速`, visible: true},
      { key: 8, label: `压差`, visible: true},
      { key: 9, label: `温度`, visible: true},
      { key: 10, label: `湿度`, visible: true},
      { key: 11, label: `创建时间`, visible: true}
    ]);

    const initFormData: RecordForm = {
      id: undefined,
      nodeId: undefined,
      deviceName: undefined,
      o3: undefined,
      pm10chu: undefined,
      pm10hui: undefined,
      pm25chu: undefined,
      pm25hui: undefined,
      windSpe: undefined,
      yacha: undefined,
      temp: undefined,
      humi: undefined
    };
    const data = reactive({
        form: {...initFormData},
        queryParams: {
            pageNum: 1,
            pageSize: 10,
            deviceCode:null,
            nodeId:0
        },
        rules: {
            id: [{ required: true, message: "主键不能为空", trigger:"blur" }],
        }
    });

  const { form,queryParams, rules } = toRefs(data);




/** 导出按钮操作 */
const handleExport = () => {
  if (dateRange.value[0]=='' || dateRange.value[1] ==''){
      proxy?.$modal.msgError('请选择开始时间及结束时间');
  }else{
    proxy?.download(
      '/Metro/MetroDeviceRecord/Export',
      {
        ...proxy?.addDateRange(queryParams.value, dateRange.value)
      },
      `record_${new Date().getTime()}.xlsx`
    );
  }
};


/** 返回按钮操作 */
const handleClose = () => {
  const obj: RouteLocationNormalized = {
    fullPath: '',
    hash: '',
    matched: [],
    meta: undefined,
    name: undefined,
    params: undefined,
    query: undefined,
    redirectedFrom: undefined,
    path: '/metro/device'
  };
  proxy?.$tab.closeOpenPage(obj);
};

/** 查询$Record列表 */
const getList = async () => {
  loading.value = true;
  if (route.query.deviceCode==='866193054464348') {
    columns.value=[
        { key: 0, label: `主键`, visible: false},
        { key: 1, label: `节点`, visible: false},
        { key: 2, label: `臭氧`, visible: false},
        { key: 3, label: `室内(PM10)`, visible: true},
        { key: 4, label: `后风口(PM10)`, visible: false},
        { key: 5, label: `室内(PM2.5)`, visible: true},
        { key: 6, label: `后风口(PM2.5)`, visible: false},
        { key: 7, label: `风速`, visible: false},
        { key: 8, label: `压差`, visible: false},
        { key: 9, label: `温度`, visible: false},
        { key: 10, label: `湿度`, visible: false},
        { key: 11, label: `创建时间`, visible: true}
      ];
  }
  const res = await listRecord(proxy?.addDateRange(queryParams.value, dateRange.value));
  RecordList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};
/** 取消按钮  */
const cancel = () => {
  reset();
  dialog.visible = false;
};
/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  RecordFormRef.value?.resetFields();
};
/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
/** 重置按钮操作 */
const resetQuery = () => {
  dateRange.value = ['', ''];
  queryFormRef.value?.resetFields();
  /* 
  queryParams.value.deviceCode = undefined;
  queryParams.value.nodeId = undefined;
  */
  handleQuery();
};
/** 多选框选中数据 */
const handleSelectionChange = (selection: RecordVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};
/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加设备';
};
/**修改按钮操作 */
const handleUpdate = async (row?: RecordVO) => {
  reset();
  const Id = row?.id || ids.value[0];
  const { data } = await getRecord(Id);
  Object.assign(form.value, data);
  dialog.visible = true;
  dialog.title = '修改设备';
};
/** 提交按钮 */
const submitForm = () => {
  RecordFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      form.value.id ? await updateRecord(form.value) : await addRecord(form.value);
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};
/** 删除按钮操作 */
const handleDelete = async (row?: RecordVO) => {
  const Ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除编号为"' + Ids + '"的数据项？');
  await delRecord(Ids);
  await getList();
  proxy?.$modal.msgSuccess('删除成功');
};

onMounted(() => {
  const deviceCode = route.query.deviceCode;
  if (deviceCode != null) {
    queryParams.value.deviceCode=deviceCode;
    queryParams.value.nodeId = route.query.nodeId;
  }
  getList();
});

</script>