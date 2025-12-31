import { Purchases } from '@revenuecat/purchases-capacitor'

export default () => {
  Purchases.configure({
    apiKey: process.env.VUE_APP_GLASSFY_API_KEY
  })
   console.log('✅ RevenueCat configured (legacy boot format)')
}
