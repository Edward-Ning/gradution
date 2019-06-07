<template>
  <div>
    <component :is="this.$store.state.company.bgKey"></component>
  </div>
</template>

<script>
import CompanyMessage from './contentComponents/companyMessage'
import CompanyProduct from './contentComponents/companyProduct'
import StaffInformation from './contentComponents/staffInformation'
import StaffDailyProduction from './contentComponents/staffDailyProduction'
import ProductionReport from './contentComponents/productionReport'
import SemiProductionReport from './contentComponents/semiProductionReport'
import DeviceInformation from './contentComponents/deviceInformation'
import UserInformation from './contentComponents/userInformation'
import UserOrderInformation from './contentComponents/userOrderInformation'
import SemiProductionProcess from './contentComponents/semiProductionProcess'
import ProductionProcess from './contentComponents/productionProcess'
import StaffProductionReport from './contentComponents/staffProductionReport'

export default {
  name: 'BgContent',
  components: {
    CompanyMessage,
    CompanyProduct,
    StaffInformation,
    StaffDailyProduction,
    ProductionReport,
    SemiProductionReport,
    DeviceInformation,
    UserInformation,
    UserOrderInformation,
    SemiProductionProcess,
    ProductionProcess,
    StaffProductionReport
  }
}
</script>

<style scoped>

</style>
