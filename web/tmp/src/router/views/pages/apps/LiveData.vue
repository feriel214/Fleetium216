<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

export default {
  name: 'LiveData',
  components: { Layout, PageHeader},
  data(){},
  mounted() {},
  methods: {}
}
</script>

<style>

</style>

<template>
  <Layout>
    <PageHeader   />
      <div id="livedata">
          <h1>Helo in Live Data Component </h1>
      </div>
  </Layout>
</template>
