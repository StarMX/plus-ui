<template>
  <div class="app-container home">

    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :md="8" class="mb-4">
        <div class="statistic-card">
          <el-statistic :value="98500">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Daily active users
                <el-tooltip
                  effect="dark"
                  content="Number of users who logged into the product in one day"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
                24%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" class="mb-4">
        <div class="statistic-card">
          <el-statistic :value="693700">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Monthly Active Users
                <el-tooltip
                  effect="dark"
                  content="Number of users who logged into the product in one month"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>month on month</span>
              <span class="red">
                12%
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" class="mb-4">
        <div class="statistic-card">
          <el-statistic :value="72000" title="New transactions today">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                New transactions today
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
                16%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>


    <el-divider />
    <el-row :gutter="16">
      <el-col :sm="24" :lg="4">
        <el-card style="background:#F56C6C">
          <template #header>Warning Message</template>
          <div style="height:100px" />
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="4">
        <el-card style="background:#E6A23C">
          <el-skeleton
          style="height:140px"
            animated
            :throttle="{ leading: 500, initVal: true }" />
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="8">
        <el-card style="background:#409EFF">
          <template #header>
          <UploadFilled style="width: 1em; height: 1em; vertical-align: middle" />
          <span style="vertical-align: middle;padding-left:5px;">Online</span>
          </template>
          <div class=" gap-2" style="height:100px;overflow-y:scroll;"  v-if="last_data">
              <el-tag effect="light" style="margin-right:5px; margin-bottom:5px;"
               v-for="(item, key, index) in last_data.filter(e => e.Status == 'on')" :key="key" 
               :v-if="item.Status=='off'"
               :type="item.Status=='on'?'primary':'danger'">{{ item.DeviceName }}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="8">
        <el-card style="background:#909399">
          <template #header>
          <WarnTriangleFilled style="width: 1em; height: 1em; vertical-align: middle" />
          <span style="vertical-align: middle;padding-left:5px;">Offline</span>
          </template>
          <div class=" gap-2" style="height:100px;overflow-y:scroll;"  v-if="last_data">
              <el-tag effect="dark" style="margin-right:5px; margin-bottom:5px;"
               v-for="(item, key, index) in last_data.filter(e => e.Status == 'off')" :key="key" 
               :v-if="item.Status=='off'"
               :type="item.Status=='on'?'success':'danger'">{{ item.DeviceName }}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />

    <el-row :gutter="20">
      <el-col :sm="24" :lg="6" v-if="Number(userStore.userId)<=2">
        <el-card shadow="hover">
          <template #header>
            <Odometer style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle;padding-left:5px;">Gateway Connected</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="mqttstats" style="height: 300px" />
          </div>
        </el-card>
      </el-col>


      <el-col :sm="24" :lg="18" v-if="Number(userStore.userId)<=2">
        <el-card shadow="hover">
          <template #header>
            <Monitor style="width: 1em; height: 1em; vertical-align: middle;" /> 
            <span style="vertical-align: middle;padding-left:5px;">Gateway Clients</span>
          </template>

          <div class="el-table el-table--enable-row-hover el-table--medium" style="overflow-y: scroll;max-height: 300px;">
            <table cellspacing="0" style="width: 100%;">
              <thead>
                <tr>
                  <th class="el-table__cell el-table__cell is-leaf"><div class="cell">SN</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">IP</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">Status</div></th>
                </tr>
              </thead>
              <tbody v-if="mqtt_clients">
                <tr v-for="(item, index) in mqtt_clients" :key="index">
                  <td class="el-table__cell is-leaf"><div class="cell">{{ item.clientid.indexOf('|')>0? item.clientid.substring(0,item.clientid.indexOf('|')): item.clientid}}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">{{ item.ip_address + ':' + item.port }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell"><el-tag effect="dark" :type="item.connected?'success':'danger'">{{ item.connected?"Online":"Offline" }}</el-tag></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script setup name="Index" lang="ts">
import * as echarts from 'echarts';
import { getMonitorCurrent, getClients } from '@/api/emqx';
import { MonitorCurrentVO, ClientVO } from '@/api/emqx/types';

import { MonitorRecordOfLatest } from '@/api/Metro/Report';
import { MonitorDataVO } from '@/api/Metro/Report/types';

import { useUserStore } from '@/store/modules/user';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const userStore = useUserStore();
const mqttstats = ref();
// const monitor_current = ref<Partial<MonitorCurrentVO>>();
const monitor_current = ref<MonitorCurrentVO>();
const mqtt_clients = ref<ClientVO[]>([]);
const last_data = ref<MonitorDataVO[]>([]);
const device_counts = 50;
const goTarget = (url: string) => {
  window.open(url, '__blank');
};
let intervalID = null;
const getList = async (usedmemoryInstance) => {


  const r = await getClients();
  mqtt_clients.value = r.data.filter(e=> e.clientid.indexOf('FuShi-Production')!=0);
  monitor_current.value = await getMonitorCurrent();
  usedmemoryInstance.setOption({
    tooltip: {
      formatter: '{a} <br/>{b} : {c}'
    },
    series: [
      {
        name: '设备状态',
        type: 'gauge',
        min: 0,
        max: device_counts,
        detail: {
          valueAnimation: true,
          formatter: '{value} / '+ (monitor_current.value.connections -1),
        },
        progress: {
          show: true
        },
        data: [
          {
            value: (monitor_current.value.live_connections -1),
            name: '已连接'
          }
        ]
      }
    ]
  });
  window.addEventListener('resize', () => {
    usedmemoryInstance.resize();
  });
};

const getLastData = async()=>{
  const m = await MonitorRecordOfLatest();
  last_data.value = m.data.sort(s=> parseInt(s.StationId));
}

onMounted(() => {
  getLastData();
  if (Number(userStore.userId)>2) return;
  proxy?.$modal.loading('正在加载监控数据，请稍候！');
  const usedmemoryInstance = echarts.init(mqttstats.value, 'macarons');
  getList(usedmemoryInstance);
  proxy?.$modal.closeLoading();
  intervalID = window.setInterval(() => {
      getList(usedmemoryInstance);
  }, 1000 *30);
});

onUnmounted(() => {
  if (Number(userStore.userId)>2) return;
  window.clearInterval(intervalID);
});

</script>

<style scoped lang="scss">
.home {
  font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .scrollbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
