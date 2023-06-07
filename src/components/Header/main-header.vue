<template>
    <div class="header" >
      <h1 class="text">
        <span class="icon"></span>
        Chicken Music
      </h1>
      <router-link class="mine" to="/user">
        <i class="icon-mine"></i>
      </router-link>
    </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
  .header {
    height: 44px;
    text-align: center;
    color: @color-theme;
    font-size: 20px;
    .text {
      display: flex;
      vertical-align: middle;
      justify-content: center;
      align-items: center;
      // line-height: 2.5143rem;
      font-size: @font-size-large;
      // align-items: center;
      .icon {
        display: inline-block;
        vertical-align: top;
        margin-top: .3429rem;
        width: 1.7143rem;
        height: 1.8286rem;
        margin-right: .5143rem;
        .bg-image('logo');
        background-size: 1.7143rem 1.8286rem;
      }
    }
    .mine {
      position: absolute;
      top: 0;
      right: 0;
      .icon-mine {
        display: block;
        padding: .6857rem;
        font-size: @font-size-large-x;
        color: @color-theme;
      }
    }
  }
</style>
  