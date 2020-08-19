<template>
  <div style="display: inline-block;margin-left: 5px;">
    {{label}}【 <span @click="changeVal(1)" :class="{'active' : value === 1}">有</span>
    <span @click="changeVal(2)" :class="{'active' : value === 2}">无</span> 】
  </div>
</template>

<script>
export default {
  name: 'YesOrNo',
  props: ['value', 'label'],
  methods: {
    changeVal (number) {
      this.$emit('update:value', number)
    }
  }
}
</script>

<style scoped>
  span {
    border: 1px solid transparent;
    border-radius: 50%;
    cursor: pointer;
  }
  span.active {
    border-color: red;
  }
</style>
