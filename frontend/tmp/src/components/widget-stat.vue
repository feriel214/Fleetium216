<script>
/**
 * A simple stat widget
 */
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#5369f8',
    },
  },
}
</script>

<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="media p-3">
        <div class="media-body">
          <span
            class="text-muted text-uppercase font-size-12 font-weight-bold"
            >{{ title }}</span
          >
          <h6 class="mb-0">{{ value }}</h6>
        </div>
        <div class="align-self-center">
          <span>
            <feather
              :type="`${icon}`"
              :style="`color:${color}`"
            ></feather>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.p-3 {
    padding: 1rem !important;
    height: 130px;
}
</style>