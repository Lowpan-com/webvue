// Utilities
import { defineStore } from 'pinia'
import axios from "axios"

export const useAppStore = defineStore('app', {
  state: () => ({
    devices: [],
    deviceAttributes: {}, // Store attributes for each device
  }),
  getters: {
    getDevices: (state) => state.devices,
    getDeviceById: (state) => (id) => state.devices.find(device => device.id === id),
    getDeviceAttributes: (state) => (id) => state.deviceAttributes[id] || {},
  },
  actions: {
    async fetchDevices() {
      console.log('fetchDevices')
      try {
        const response = await axios.get('http://lowpan.local/HALDevices', { timeout: 10000 })
        this.devices = response.data.map(device => ({
          id: device,
        }))
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async fetchDeviceType(id) {
      console.log(`fetchDeviceType for ${id}`)
      if (!this.deviceAttributes[id] || !this.deviceAttributes[id].deviceType) {
        try {
          const response = await axios.get(`http://${id}.local/HALDeviceType`, { timeout: 10000 })
          if (!this.deviceAttributes[id]) {
            this.deviceAttributes[id] = {}
          }
          var dt;
          switch (response.data.type) {
            case 1:
              dt = "Rocker";
              break;
            case 2:
              dt = "Touch";
              break;
            case 3:
              dt = "Keypad";
              break;
            case 4:
              dt = "Screen";
              break;
            case 5:
              dt = "Thermostat";
              break;
            default:
              dt = "eUnknown";
          }
          this.deviceAttributes[id].deviceType = dt
        }
        catch (error) {
          alert(error)
          console.log(error)
        }
      }
    }
  },
})
