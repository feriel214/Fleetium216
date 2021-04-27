<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

export default {
  name: 'Trips',
  components: { Layout, PageHeader},
  data(){
    return {
    
    }
  },
  mounted() {
    this.drawMap()
  },
  methods: {
   
  }
}

</script>

<style>

</style>

<template>
  <Layout>
    <PageHeader   />
      <div id="trips">
         
      </div>
  </Layout>
</template>
