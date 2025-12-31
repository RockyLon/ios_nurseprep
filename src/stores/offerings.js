// src/stores/offerings.js
import { defineStore } from 'pinia';
import { Glassfy } from 'capacitor-plugin-glassfy';

export const useOfferingsStore = defineStore('offerings', {
  state: () => ({
    offerings: [] // Initialize as an empty array
  }),
  actions: {
    async fetchOfferings() {
      try {
        const offerings = await Glassfy.offerings();
        this.offerings = offerings.all;
      } catch (error) {
        console.error('Error fetching offerings:', error);
      }
    }
  }
});
