<template>
  <div class="app-container">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="名称" prop="name">
              <el-input v-model="queryParams.name" placeholder="请输入名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>

            <el-form-item label="SN" prop="sn">
              <el-input v-model="queryParams.sn" placeholder="请输入SN" clearable @keyup.enter="handleQuery" />
            </el-form-item>

            <el-form-item label="ICCID" prop="iccid">
              <el-input v-model="queryParams.iccid" placeholder="请输入ICCID" clearable @keyup.enter="handleQuery" />
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
            <right-toolbar v-model:show-search="showSearch" :columns="columns" @query-table="getList"></right-toolbar>
        </el-row>
        </template>

        <el-table v-loading="loading" :data="GatewayList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />

        <!-- 
         <el-table-column v-for="(column,index) in columns" :key="index" :prop="column.key" :label="column.visible" :v-if="column.visible" />
        -->
        <el-table-column v-if="columns[0].visible" label="主键" align="center" prop="id" />
        <el-table-column v-if="columns[1].visible"  label="名称" align="center" prop="name" />
        <el-table-column v-if="columns[2].visible"  label="SN" align="center" prop="sn" />
        <el-table-column v-if="columns[3].visible"  label="纬度" align="center" prop="lat" />
        <el-table-column v-if="columns[4].visible"  label="经度" align="center" prop="lon" />
        <el-table-column v-if="columns[5].visible"  label="ICCID" align="center" prop="iccid" />
        
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="210">
            <template #default="scope">
            <el-button link="" type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['metro:device:edit']">修改</el-button>
            <el-button link="" type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['metro:device:remove']">删除</el-button>
            </template>
        </el-table-column>
        </el-table>

        <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>


    <!-- 添加或修改Gateway对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="780px" append-to-body>
      <el-form ref="GatewayFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        
        <el-form-item label="SN" prop="sn">
          <el-input v-model="form.sn" placeholder="请输入SN" />
        </el-form-item>
        
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入纬度" />
        </el-form-item>
        
        <el-form-item label="经度" prop="lon">
          <el-input v-model="form.lon" placeholder="请输入经度" />
        </el-form-item>
  
        <el-form-item label="ICCID" prop="iccid">
          <el-input v-model="form.iccid" placeholder="请输入ICCID" />
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

<script setup="" name="Gateway" lang="ts">
    import { listGateway, getGateway, delGateway, addGateway, updateGateway } from "@/api/Metro/Gateway";
    import { GatewayVO, GatewayForm, GatewayQuery } from '@/api/Metro/Gateway/types';
    import router from '@/router';

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const GatewayList = ref<GatewayVO[]>([]);
    const loading = ref(true);
    const showSearch = ref(true);
    const ids = ref<Array<string | number>>([]);
    const single = ref(true);
    const multiple = ref(true);
    const total = ref(0);
    
    const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
    const route = useRoute();

    const queryFormRef = ref<ElFormInstance>();
    const GatewayFormRef = ref<ElFormInstance>();

    const dialog = reactive<DialogOption>({
        visible: false,
        title: ''
    });

    const columns = ref<FieldOption[]>([
      { key: 'id', label: `主键`, visible: false},
      { key: 'name', label: `名称`, visible: true},
      { key: 'sn', label: `SN`, visible: true},
      { key: 'lon', label: `纬度`, visible: true},
      { key: 'lat', label: `经度`, visible: true},
      { key: 'iccid', label: `ICCID`, visible: true}
    ]);

    const initFormData: GatewayForm = {
      id: undefined
    };
    const data = reactive({
        form: {...initFormData},
        queryParams: {
            pageNum: 1,
            pageSize: 10
        },
        rules: {
            id: [{ required: true, message: "主键不能为空", trigger:"blur" }],
            sn: [{ required: true, message: "名称不能为空", trigger:"blur" }],
        }
    });

  const { form,queryParams, rules } = toRefs(data);



/** 查询$Gateway列表 */
const getList = async () => {
  loading.value = true;
  const res = await listGateway(proxy?.addDateRange(queryParams.value, dateRange.value));
  GatewayList.value = res.rows;
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
  GatewayFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: GatewayVO[]) => {
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
const handleUpdate = async (row?: GatewayVO) => {
  reset();
  const Id = row?.id || ids.value[0];
  const { data } = await getGateway(Id);
  Object.assign(form.value, data);
  dialog.visible = true;
  dialog.title = '修改设备';
};
/** 提交按钮 */
const submitForm = () => {
  console.log('submit!',form.value.id );
  GatewayFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      form.value.id ? await updateGateway(form.value) : await addGateway(form.value);
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};
/** 删除按钮操作 */
const handleDelete = async (row?: GatewayVO) => {
  const Ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除编号为"' + Ids + '"的数据项？');
  await delGateway(Ids);
  await getList();
  proxy?.$modal.msgSuccess('删除成功');
};


onMounted(() => {
  getList();
});
</script>