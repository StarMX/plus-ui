<template>
  <div class="app-container">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="站点名称" prop="fullName">
              <el-input v-model="queryParams.fullName" placeholder="请输入站点名称" clearable @keyup.enter="handleQuery" />
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
                <el-button v-hasPermi="['metro:station:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button v-hasPermi="['metro:station:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()">修改</el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button v-hasPermi="['metro:station:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()">删除</el-button>
            </el-col>
            <right-toolbar v-model:show-search="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
        </template>

        <el-table v-loading="loading" :data="StationList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="false" label="主键" align="center" prop="id" />
        <el-table-column label="国家" align="center" prop="country" />
        <el-table-column label="城市" align="center" prop="city" />
        <el-table-column label="站点名称" align="center" prop="fullName" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="160">
            <template #default="scope">
            <el-button link="" type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['metro:station:edit']">修改</el-button>
            <el-button link="" type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['metro:station:remove']">删除</el-button>
            </template>
        </el-table-column>
        </el-table>

        <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改Station对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="780px" append-to-body>
      <el-form ref="StationFormRef" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="站点名称" prop="FullName">
          <el-input v-model="form.fullName" placeholder="请输入站点名称" />
        </el-form-item>  
        <el-form-item label="国家" prop="Country">
          <el-input v-model="form.country" placeholder="请输入国家" />
        </el-form-item>
        
        <el-form-item label="城市" prop="City">
          <el-input v-model="form.city" placeholder="请输入城市" />
        </el-form-item>
        
        <el-form-item label="纬度" prop="Lat">
          <el-input v-model="form.lat" placeholder="请输入纬度" />
        </el-form-item>
        
        <el-form-item label="经度" prop="Lon">
          <el-input v-model="form.lon" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="站点照片" prop="ImageUrl">
          <el-input v-model="form.imageUrl" placeholder="请输入站点照片" />
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

<script setup name="Station" lang="ts">
  import { listStation, getStation, delStation, addStation, updateStation } from "@/api/Metro/Station";
  import { StationVO, StationForm, StationQuery } from '@/api/Metro/Station/types';


    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const StationList = ref<StationVO[]>([]);
    const loading = ref(true);
    const showSearch = ref(true);
    const ids = ref<Array<string | number>>([]);
    const single = ref(true);
    const multiple = ref(true);
    const total = ref(0);

    const queryFormRef = ref<ElFormInstance>();
    const StationFormRef = ref<ElFormInstance>();

    const dialog = reactive<DialogOption>({
        visible: false,
        title: ''
    });

    const initFormData: StationForm = {
        id: undefined,

    };
    const data = reactive({
        form: {...initFormData},
        queryParams: {
            pageNum: 1,
            pageSize: 10,
            fullName: null,
        },
        rules: {
            id: [{ required: true, message: "主键不能为空", trigger:"blur" }],
            fullName: [{ required: true, message: "站点名称不能为空", trigger:"blur" }],
        }
    });

  const { queryParams, form, rules } = toRefs(data);

/** 查询$Station列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStation(queryParams.value);
  StationList.value = res.rows;
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
  StationFormRef.value?.resetFields();
};
/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  queryParams.value.fullName = undefined;
  handleQuery();
};
/** 多选框选中数据 */
const handleSelectionChange = (selection: StationVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};
/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加站点';
};
/**修改按钮操作 */
const handleUpdate = async (row?: StationVO) => {
  reset();
  const Id = row?.id || ids.value[0];
  const { data } = await getStation(Id);
  Object.assign(form.value, data);
  dialog.visible = true;
  dialog.title = '修改站点';
};
/** 提交按钮 */
const submitForm = () => {
  StationFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      form.value.id ? await updateStation(form.value) : await addStation(form.value);
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};
/** 删除按钮操作 */
const handleDelete = async (row?: StationVO) => {
  const Ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除编号为"' + Ids + '"的数据项？');
  await delStation(Ids);
  await getList();
  proxy?.$modal.msgSuccess('删除成功');
};

onMounted(() => {
  getList();
});

</script>