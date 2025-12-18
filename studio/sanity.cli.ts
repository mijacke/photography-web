import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'm42prcjy',
    dataset: 'production'
  },
  deployment: {
    appId: 'lhp7m7fe9ecno9kggkgswm6o',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
