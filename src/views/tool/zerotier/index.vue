<template>
  <div class="app-container">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
    </transition>

    <el-card shadow="hover">
        <template #header>
        
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                客户端
            </el-col>
            <right-toolbar v-model:show-search="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
        </template>

        <el-table v-loading="loading" :data="ZeroTierList" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="55" align="center" />-->
            <el-table-column v-if="false" label="主键" align="center" prop="id" />
            <el-table-column label="节点编号" align="center" prop="nodeId" />
            <el-table-column label="名称" align="center" prop="name" />
            <el-table-column label="备注" align="center" prop="description" />
            <el-table-column label="认证" align="center" prop="config.authorized"">
              <template #default="scope">
                <dict-tag :options="sys_yes_no" :value="(scope.row.config.authorized?'Y':'N')" />
              </template>
            </el-table-column>
            <el-table-column label="最后在线时间" align="center" prop="lastOnline">
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.lastOnline) }}</span>
            </template>
            </el-table-column>
            <el-table-column label="私有IP" align="center" prop="config.ipAssignments" />
            <el-table-column label="公网IP" align="center" prop="physicalAddress" />
            <el-table-column label="Version" align="center" prop="clientVersion" />
            
        </el-table>
    </el-card>
  </div>
</template>

<script setup="" name="Gateway" lang="ts">
    import { listMember } from "@/api/tool/zerotier";
    import { ZeroTierVO } from '@/api/tool/zerotier/types';
    import router from '@/router';

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const { sys_yes_no } = toRefs<any>(proxy?.useDict('sys_yes_no'));

    const ZeroTierList = ref<ZeroTierVO[]>([]);
    const loading = ref(true);
    const showSearch = ref(false);
    const ids = ref<Array<string | number>>([]);
    const single = ref(true);
    const multiple = ref(true);
    
    const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
    const route = useRoute();

    const data = reactive({
        queryParams: {
            pageNum: 1,
            pageSize: 10
        }
    });

  const { queryParams } = toRefs(data);



/** 查询$Gateway列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMember(proxy?.addDateRange(queryParams.value, dateRange.value));
  ZeroTierList.value = res;
  loading.value = false;
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: GatewayVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};


onMounted(() => {
  getList();
});
</script>
