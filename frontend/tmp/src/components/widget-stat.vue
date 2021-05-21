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
  <div class="card m-0">
    <div class="card-body m-0 p-0">
      <div class="media p-1">
        <div class="media-body">
                  <img   :src="icon" style="height:15px;width;15px">
                  <span
                    class="text-muted text-uppercase font-size-12 font-weight-bold"
                    ><b>{{ title }}</b></span
                  >
                <p  v-if="title=='Mainpower'" class="mb-0">
                  <feather v-if="value == 1" type="key" class="icon-dual Ign-on" ></feather>
                  <feather v-else type="key" class="icon-dual Ign-off" ></feather>
                </p>
              <span>
          </span> <br>
        {{value}}
        
        </div>
        <!--<div class="align-self-center">
          <span>
            <img :src="icon" style="height:40px;width;40px">
          
          </span> 
        </div>-->
      </div>
    </div>
  </div>
</template>
<style >
.p-3 {
    padding: 1rem !important;
    height: 130px;
}
.Ign-on>.feather{
    color: #31a24c!important;
}
.Ign-off>.feather{
    color: #ed1c25!important;
}
</style>