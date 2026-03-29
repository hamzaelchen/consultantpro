import api from './client'

export const getMissions = (params) => api.get('/missions', { params })
export const getMission  = (id)     => api.get(`/missions/${id}`)
export const createMission = (data) => api.post('/missions', data)
export const updateMission = (id, data) => api.put(`/missions/${id}`, data)
export const deleteMission = (id)   => api.delete(`/missions/${id}`)
