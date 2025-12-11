<template>
  <div class="app-container home">
    <el-row >

      <el-col :sm="24" :lg="6" v-if="Number(userStore.userId)<=2"  class="card-box">
        <el-card shadow="hover">
          <template #header>
            <Odometer style="width: 1em; height: 1em; vertical-align: middle" /> <span style="vertical-align: middle"> MQTT连接状态</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="mqttstats" style="height: 420px" />
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="6" v-if="Number(userStore.userId)<=2"  class="card-box">
        <el-card shadow="hover">
          <template #header>
            <Odometer style="width: 1em; height: 1em; vertical-align: middle" /> <span style="vertical-align: middle"> MQTT</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div style="height: 420px" />
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12" v-if="Number(userStore.userId)<=2" class="card-box">
        <el-card shadow="hover">
          <template #header>
            <PieChart style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle"> MQTT客户端</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div style="height: 420px; overflow-y:scroll;"> 
              <ul v-for="(item, index) in mqtt_clients" :key="index">
                <li>
                  ClientID: <span class="el-tag el-tag--primary el-tag--default el-tag--light">{{ item.clientid.indexOf('|')>0? item.clientid.substring(0,item.clientid.indexOf('|')): item.clientid}} </span> 
                  IP: <span class="el-tag el-tag--primary el-tag--default el-tag--light">{{ item.ip_address + ':' + item.port }}</span>
                  Status: <span class="el-tag el-tag--success el-tag--default el-tag--light">{{ item.connected?"Online":"Offline" }}</span>
                </li>
              </ul>
            </div>
            <!-- <div ref="commandstats" style="height: 420px" /> -->
          </div>
        </el-card>
      </el-col>


    </el-row>
    <!-- <el-divider /> -->
  </div>
</template>

<script setup name="Index" lang="ts">
import * as echarts from 'echarts';
import { getMonitorCurrent, getClients } from '@/api/emqx';
import { MonitorCurrentVO, ClientVO } from '@/api/emqx/types';
import { useUserStore } from '@/store/modules/user';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const userStore = useUserStore();
const mqttstats = ref();
// const monitor_current = ref<Partial<MonitorCurrentVO>>();
const monitor_current = ref<MonitorCurrentVO>();
const mqtt_clients = ref<ClientVO[]>([]);
const device_counts = 50;
const goTarget = (url: string) => {
  window.open(url, '__blank');
};
let intervalID = null;
const getList = async (usedmemoryInstance) => {
  const r = await getClients();
  mqtt_clients.value = r.data;
  // r.data.forEach(e => {
  //   console.log(e.clientid.indexOf('|')>0? e.clientid.substring(0,e.clientid.indexOf('|')): e.clientid);
  // }); 
  const res = await getMonitorCurrent();
  // console.log('轮询操作', res);
  monitor_current.value = res;
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
          formatter: '{value} / '+ (monitor_current.value.connections),
        },
        data: [
          {
            value: (monitor_current.value.live_connections),
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

onMounted(() => {
  if (Number(userStore.userId)>2) return;
  proxy?.$modal.loading('正在加载监控数据，请稍候！');
  const usedmemoryInstance = echarts.init(mqttstats.value, 'macarons');
  getList(usedmemoryInstance);
  proxy?.$modal.closeLoading();
  intervalID = window.setInterval(() => {
    //setTimeout(() => {
      getList(usedmemoryInstance);
    //}, 0);
  }, 1000 *30);
});

onUnmounted(() => {
  if (Number(userStore.userId)>2) return;
  window.clearInterval(intervalID);
});

</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  li {
    padding-top: 15px;
  }


  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
.card-box { 
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 10px;
}
</style>
