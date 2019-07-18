<template>
  <div class="page1">
    145469847
   <div class="font">{{ msg }}</div>
   <button @click="add">a5454</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 0
    }
  },
  methods: {
    add () {
      this.msg++
      console.log(this.msg)
    }
  }
}
</script>
<style lang="less" scoped>
.page1 {
  color: red;
}
</style>


