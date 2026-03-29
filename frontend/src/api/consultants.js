import api from './client'

export const getConsultants = (params) => api.get('/consultants', { params })
export const getConsultant  = (id)     => api.get(`/consultants/${id}`)
export const createConsultant = (data) => api.post('/consultants', data)
export const updateConsultant = (id, data) => api.put(`/consultants/${id}`, data)
export const deleteConsultant = (id)   => api.delete(`/consultants/${id}`)
