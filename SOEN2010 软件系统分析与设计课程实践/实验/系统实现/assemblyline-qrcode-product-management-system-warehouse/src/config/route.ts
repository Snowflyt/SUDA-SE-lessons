import WarehouseDispatch from '../pages/WarehouseDispatch.vue'
import Login from '../pages/Login.vue'
import Warehouse from '../pages/Warehouse.vue'
import WarehouseConcrete from '../pages/WarehouseConcrete.vue'
import PENDING from '../pages/PENDING.vue'
import Defect from '../pages/Defect.vue'
import AssemblyLine from '../pages/AssemblyLine.vue'
import Analysis from '../pages/Analysis.vue'

const routes = [
  { path: '/', title: 's', name: 'login', component: Login },
  {
    path: '/dispatch',
    title: 'a',
    name: 'dispatch',
    component: WarehouseDispatch
  },
  { path: '/warehouse', title: 'c', name: 'Warehouse', component: Warehouse },
  {
    path: '/warehouseConcrete',
    title: 'WarehouseConcrete',
    name: 'WarehouseConcrete',
    component: WarehouseConcrete
  },
  {
    path: '/PENDING',
    title: 'PENDING',
    name: 'PENDING',
    component: PENDING
  },
  {
    path: '/defect',
    title: 'Defect',
    name: 'Defect',
    component: Defect
  },
  {
    path: '/assemblyLine',
    title: 'AssemblyLine',
    name: 'AssemblyLine',
    component: AssemblyLine
  },
  {
    path: '/Analysis',
    title: 'Analysis',
    name: 'Analysis',
    component: Analysis
  }

]

export default routes
