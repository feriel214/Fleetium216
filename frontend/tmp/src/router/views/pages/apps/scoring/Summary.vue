<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

export default {
  name: 'Summary',
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
      <div id="summary">
          <h1>Hello in Summary </h1>
      </div>
  </Layout>
</template>
