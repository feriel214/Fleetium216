<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'

import { widgetData, projectActivity } from './data-projectdetail'

export default {
  page: {
    title: 'Basic Tables',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      widgetData: widgetData,
      projectActivity: projectActivity,
      title: 'Basic Tables',
      items: [
        {
          text: 'Shreyu',
          href: '/',
        },
        {
          text: 'Tables',
          href: '/',
        },
        {
          text: 'Basic',
          active: true,
        },
      ],
    }
  },
}
</script>

<template>
  <Layout>
   
  </Layout>
</template>
