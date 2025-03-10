<template>
    <v-card class="ma-4 pa-4">
      <v-card-title>Firmware Update</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="file"
          :loading="uploading"
          accept=".bin"
          label="Select firmware file"
          prepend-icon="mdi-flash"
          @change="handleFileChange"
        ></v-file-input>
        
        <v-btn
          :loading="uploading"
          :disabled="!file"
          color="primary"
          @click="uploadFile"
        >
          Upload Firmware
        </v-btn>
  
        <v-alert
          v-if="uploadStatus"
          :type="uploadStatus.type"
          class="mt-4"
        >
          {{ uploadStatus.message }}
        </v-alert>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['id'])

const file = ref(null)
const uploading = ref(false)
const uploadStatus = ref(null)

function handleFileChange(event) {
  uploadStatus.value = null
  // Get the file from the input event
  file.value = event.target.files[0]
  console.log('File changed:', file.value)
}

async function uploadFile() {
  if (!file.value) return

  uploading.value = true
  uploadStatus.value = null

  try {
    // Read file as ArrayBuffer using FileReader
    const arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsArrayBuffer(file.value)
    })
    
    // Send raw binary data
    await axios.post(`http://${props.id}.local/HALOTA`, arrayBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      timeout: 60000,
      transformRequest: [(data) => data]
    })

    uploadStatus.value = {
      type: 'success',
      message: 'Firmware uploaded successfully'
    }
  } catch (error) {
    console.error('Upload error:', error)
    uploadStatus.value = {
      type: 'error',
      message: `Upload failed: ${error.message}`
    }
  } finally {
    uploading.value = false
  }
}
</script>