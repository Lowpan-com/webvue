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
    async writeOnOff(id, position, power) {
      console.log(`writeOnOff for ${id} at position ${position} with value ${power}`)
      axios.post(`http://${id}.local/HALOnOff`, {
        position,
        power
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        this.deviceAttributes[id].power = power
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    async fetchLog(id) {
      console.log(`fetchLog for ${id}`)
      if (!this.deviceAttributes[id] || !this.deviceAttributes[id].deviceType) {
        try {
          const response = await axios.get(`http://${id}.local/log`, { timeout: 10000 })
          if (!this.deviceAttributes[id]) {
            this.deviceAttributes[id] = {}
          }
          this.deviceAttributes[id].log += response.data
        }
        catch (error) {
          alert(error)
          console.log(error)
        }
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
