<template>
  <div class="app-container">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="设备编码" prop="key">
              <el-input
                v-model="queryParams.key"
                placeholder="请输入设备编码"
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
            <right-toolbar v-model:show-search="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
        </template>

        <el-table v-loading="loading" :data="DeviceList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="false" label="主键" align="center" prop="id" />
        <el-table-column label="名称" align="center" prop="ext.name" />
        <el-table-column label="设备编号" align="center" prop="device_id" />
        <el-table-column label="厂家" align="center" prop="ext.manufacturer" />
        <el-table-column label="通道数" align="center" prop="channels" width="80px" />
        <el-table-column label="状态" align="center" prop="is_online">
          <template #default="scope">
            <dict-tag :options="sys_notice_status" :value="(scope.row.is_online?1:0)" />
          </template>
        </el-table-column>
        <el-table-column label="最近心跳" align="center" prop="keepalive_at" />
        <el-table-column label="最近注册" align="center" prop="registered_at" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-button link="" @click="handleShow(scope.row)" type="primary" icon="Search">通道</el-button>
            </template>
        </el-table-column>
        </el-table>

        <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改Device对话框 -->
  </div>
</template>

<script setup name="Device" lang="ts">
  import { listDevices } from "@/api/GB28181/Device";
  import { DeviceVO, DeviceQuery } from '@/api/Metro/Device/types';
  import router from '@/router';

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const { sys_notice_status } = toRefs<any>(proxy?.useDict('sys_notice_status'));
    const DeviceList = ref<DeviceVO[]>([]);
    const loading = ref(true);
    const showSearch = ref(true);
    const ids = ref<Array<string | number>>([]);
    const single = ref(true);
    const multiple = ref(true);
    const total = ref(0);

    const route = useRoute();

    const queryFormRef = ref<ElFormInstance>();

    const data = reactive({
        queryParams: {
            pageNum: 1,
            pageSize: 10
        }
    });

  const { queryParams } = toRefs(data);

/** 查询$Device列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.size = queryParams.value.pageSize;
  queryParams.value.page = queryParams.value.pageNum;
  const res = await listDevices(queryParams.value);
  DeviceList.value = res.items;
  total.value = res.total;
  loading.value = false;
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
};
/** 多选框选中数据 */
const handleSelectionChange = (selection: DeviceVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

const handleShow=(row?:DeviceVO)=>{
  const device_id = row?.device_id;
  router.push({ path: `${route.path.replace('/device','')}/channel` , query: { deviceId:device_id } });
};

onMounted(() => {
  getList();
});

</script>
