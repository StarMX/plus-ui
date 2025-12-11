<template>
  <div class="app-container">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
          <el-form-item label="站点名称" prop="StationId">
            <el-select v-model="queryParams.stationId" placeholder="站点名称" clearable>
              <el-option v-for="station in StationList" :key="station.id" :label="station.city +' - '+ station.fullName" :value="station.id" />
            </el-select>
          </el-form-item>

          <el-form-item label="设备类型" prop="category">
            <el-select v-model="queryParams.category" placeholder="设备类型" clearable>
              <el-option v-for="dict in sys_device_category" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="设备编码" prop="code">
            <el-input
              v-model="queryParams.code"
              placeholder="请输入设备编码"
              clearable=""
              @keyup.enter="handleQuery"
            />
          </el-form-item>

          <el-form-item label="设备号" prop="serial">
            <el-input
              v-model="queryParams.serial"
              placeholder="请输入设备号"
              clearable=""
              @keyup.enter="handleQuery"
            />
          </el-form-item>

          <el-form-item label="设备名称" prop="fullName">
            <el-input
              v-model="queryParams.fullName"
              placeholder="请输入设备名称"
              clearable=""
              @keyup.enter="handleQuery"
            />
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
                <el-button v-hasPermi="['metro:device:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button v-hasPermi="['metro:device:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()">修改</el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button v-hasPermi="['metro:device:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()">删除</el-button>
            </el-col>
            <right-toolbar v-model:show-search="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
        </template>

        <el-table v-loading="loading" :data="DeviceList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="false" label="主键" align="center" prop="id" />
        <!--el-table-column label="设备编码" align="center" prop="code" /-->
        <el-table-column label="站点名称" align="center">
          <template #default="scope">
            <template v-for="(item, index) in StationList">
              <template v-if="scope.row.stationId==item.id">
                <span :key="item.id" :index="index">
                  {{ item.fullName + ' ' }}
                </span>
              </template>
            </template>
            <!--el-select v-model="scope.row.stationId" placeholder="站点名称" disabled clearable>
              <el-option v-for="station in StationList" :key="station.id" :label="station.fullName" :value="station.id" />
            </el-select-->
          </template>
        </el-table-column>
        <el-table-column label="地铁线路" align="center" prop="lineName" />
        <el-table-column label="设备名称" align="center" prop="fullName" />
        <el-table-column label="设备类型" align="center" prop="category" />
        <el-table-column label="设备号" align="center" prop="serial"  width="200" />
        <el-table-column label="所在位置" align="center" prop="location" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="210">
            <template #default="scope">
            <el-button link="" @click="handleShow(scope.row)" type="primary" icon="View">查看</el-button>
            <el-button link="" type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['metro:device:edit']">修改</el-button>
            <el-button link="" type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['metro:device:remove']">删除</el-button>
            </template>
        </el-table-column>
        </el-table>

        <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改Device对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="780px" append-to-body>
      <el-form ref="DeviceFormRef" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="地铁站" prop="stationId">
          <el-select v-model="form.stationId" placeholder="站点名称" clearable>
            <el-option v-for="station in StationList" :key="station.id" :label="station.fullName" :value="station.id" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="地铁线路" prop="lineName">
          <el-input v-model="form.lineName" placeholder="请输入地铁线路" />
        </el-form-item>
        
        <el-form-item label="设备类型" prop="category">
          <el-select v-model="form.category" placeholder="设备类型" clearable>
            <el-option v-for="dict in sys_device_category" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="设备名称" prop="fullName">
          <el-input v-model="form.fullName" placeholder="请输入设备名称" />
        </el-form-item>

        <el-form-item label="设备号" prop="serial">
          <el-input v-model="form.serial" placeholder="请输入设备号" />
        </el-form-item>

        <el-form-item label="节点号" prop="serial">
          <el-input v-model="form.nodeId" placeholder="请输入节点号" />
        </el-form-item>

        <el-form-item label="所在位置" prop="location">
          <el-input v-model="form.location" placeholder="请输入所在位置" />
        </el-form-item>
        
        <el-form-item label="设备编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入设备编码" />
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

<script setup name="Device" lang="ts">
  import { listDevice, getDevice, delDevice, addDevice, updateDevice } from "@/api/Metro/Device";
  import { DeviceVO, DeviceForm, DeviceQuery } from '@/api/Metro/Device/types';
  import { listStation } from "@/api/Metro/Station";
  import { StationVO } from "@/api/Metro/Station/types";
  import router from '@/router';

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const { sys_device_category } = toRefs<any>(proxy?.useDict('sys_device_category'));

    const StationList = ref<StationVO[]>([]);
    const DeviceList = ref<DeviceVO[]>([]);
    const loading = ref(true);
    const showSearch = ref(true);
    const ids = ref<Array<string | number>>([]);
    const single = ref(true);
    const multiple = ref(true);
    const total = ref(0);

    const queryFormRef = ref<ElFormInstance>();
    const DeviceFormRef = ref<ElFormInstance>();

    const dialog = reactive<DialogOption>({
        visible: false,
        title: ''
    });

    const initFormData: DeviceForm = {
        id: undefined,

    };
    const data = reactive({
        form: {...initFormData},
        queryParams: {
            pageNum: 1,
            pageSize: 10,
            category: null,
            code: null,
            serial: null
        },
        rules: {
            id: [{ required: true, message: "主键不能为空", trigger:"blur" }],
            stationId: [{ required: true, message: "地铁站不能为空", trigger:"blur" }],
            fullName: [{ required: true, message: "设备名称不能为空", trigger:"blur" }],
            category: [{ required: true, message: "设备类型不能为空", trigger:"blur" }],
            serial: [{ required: true, message: "设备号不能为空", trigger:"blur" }],
            nodeId: [{ required: true, message: "节点号不能为空", trigger:"blur" }],
        }
    });

  const { queryParams, form, rules } = toRefs(data);

const getStationList = async()=>{
  loading.value = true;
  const res = await listStation({'pageSize':10000,'pageNum': 1});
  StationList.value = res.rows;
};

/** 查询$Device列表 */
const getList = async () => {
  loading.value = true;
  const res = await listDevice(queryParams.value);
  DeviceList.value = res.rows;
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
  DeviceFormRef.value?.resetFields();
};
/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  queryParams.value.category = undefined;
  queryParams.value.code = undefined;
  queryParams.value.serial = undefined;
  handleQuery();
};
const handleShow=(row?:DeviceVO)=>{
  //const id = row?.id || ids.value[0];
  const serial = row?.serial;
  const nodeId = row?.nodeId;
  router.push({ path: '/Metro/Record/', query: { deviceCode: serial,nodeId: nodeId } });
};
/** 多选框选中数据 */
const handleSelectionChange = (selection: DeviceVO[]) => {
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
const handleUpdate = async (row?: DeviceVO) => {
  reset();
  const Id = row?.id || ids.value[0];
  const { data } = await getDevice(Id);
  Object.assign(form.value, data);
  dialog.visible = true;
  dialog.title = '修改设备';
};
/** 提交按钮 */
const submitForm = () => {
  DeviceFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      form.value.id ? await updateDevice(form.value) : await addDevice(form.value);
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};
/** 删除按钮操作 */
const handleDelete = async (row?: DeviceVO) => {
  const Ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除编号为"' + Ids + '"的数据项？');
  await delDevice(Ids);
  await getList();
  proxy?.$modal.msgSuccess('删除成功');
};

onMounted(() => {
  getStationList();
  getList();
});

</script>