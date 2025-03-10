// Utilities
import { defineStore } from 'pinia'
import axios from "axios"

export const useAppStore = defineStore('app', {
  state: () => ({
    devices: [],
    deviceAttributes: [], // Store attributes for each device
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
        this.devices = response.data.devices.map(deviceId => ({
          id: deviceId,
        }))
      }
      catch (error) {
        console.log(error)
      }
    },
    async writeLevel(id, position, level) {
      console.log(`writeLevel for ${id} at position ${position} with value ${level}`)
      axios.post(`http://${id}.local/HALLevel`, {
        position,
        level
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.deviceAttributes[id].level = level
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async writeMode(id, mode) {
      console.log(`writeMode for ${id} with value ${mode}`)
      axios.post(`http://${id}.local/HALMode`, {
        mode,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.deviceAttributes[id].mode = mode
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async writeOnOff(id, position, power) {
      console.log(`writeOnOff for ${id} at position ${position} with value ${power}`)
      axios.post(`http://${id}.local/HALOnOff`, {
        position,
        power: this.deviceAttributes[id].power ? 0 : 1
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.deviceAttributes[id].power = power
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async writeColor(id, position, red, green, blue) {
      console.log(`writeColor for ${id} at position ${position} with value ${red}, ${green}, ${blue}`)
      axios.post(`http://${id}.local/HALColor`, {
        position,
        red, green, blue
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.deviceAttributes[id].red = red
          this.deviceAttributes[id].green = green
          this.deviceAttributes[id].blue = blue
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async fetchLog(id) {
      try {
        const response = await axios.get(`http://${id}.local/HALLog`, { timeout: 10000 })
        if (!this.deviceAttributes[id]) {
          this.deviceAttributes[id] = {}
        }
        if (!this.deviceAttributes[id].log) {
          this.deviceAttributes[id].log = ""
        }
        this.deviceAttributes[id].log += response.data
      }
      catch (error) {
        console.log(error)
      }
    },
    async fetchCurrent(id) {
      try {
        const response = await axios.get(`http://${id}.local/HALCurrent`, { timeout: 10000 })
        if (!this.deviceAttributes[id]) {
          this.deviceAttributes[id] = {}
        }
        if (!this.deviceAttributes[id].current) {
          this.deviceAttributes[id].current = []
        }
        if (this.deviceAttributes[id].currentStamp != response.data.stamp) {
          this.deviceAttributes[id].current = response.data.current
          this.deviceAttributes[id].currentStamp = response.data.stamp
        }
      }
      catch (error) {
        console.log(error)
      }
    },
    async fetchTemperature(id) {
      try {
        const response = await axios.get(`http://${id}.local/HALTemperature`, { timeout: 10000 })
        if (!this.deviceAttributes[id]) {
          this.deviceAttributes[id] = {}
        }
        if (!this.deviceAttributes[id].log) {
          this.deviceAttributes[id].temperature = []
        }
        if (this.deviceAttributes[id].temperatureStamp != response.data.stamp) {
          this.deviceAttributes[id].temperature = response.data.temperature
          this.deviceAttributes[id].temperatureStamp = response.data.stamp
        }
      }
      catch (error) {
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
          console.log(response.data)
          var dt;
          switch (response.data.deviceType) {
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
          console.log(error)
        }
      }
    }
  },
})
