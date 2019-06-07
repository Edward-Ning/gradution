<template>
  <div>
    <component :is="this.$store.state.user.bgKey"></component>
  </div>
</template>

<script>
import UserMessage from './contentComponents/UserMessage'
import UserOrder from './contentComponents/UserOrder'
export default {
  name: 'UserContent',
  components: {
    UserMessage,
    UserOrder
  }
}
</script>

<style scoped>

</style>
