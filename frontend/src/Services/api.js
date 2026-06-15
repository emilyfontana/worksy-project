// camada de comunicação entre o frontend e o backend
// todas as chamadas http passam por aqui

const BASE_URL = '/api'

// monta o header com o token jwt se existir
const headers = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

// faz a requisição e lança erro se o status não for 2xx
const request = async (method, path, body = null) => {
  const options = { method, headers: headers() }
  if (body) options.body = JSON.stringify(body)
  const res = await fetch(`${BASE_URL}${path}`, options)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'erro na requisição')
  return data
}

// auth
export const login = async (email, password) => {
  const data = await request('POST', '/auth/login', { email, password })
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data
}
export const register = async (userData) => request('POST', '/auth/register', userData)
export const getMe = async () => request('GET', '/auth/me')
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
export const getLocalUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

// usuários
export const getAllUsers = async () => request('GET', '/users')
export const getUserById = async (id) => request('GET', `/users/${id}`)
export const updateUser = async (id, userData) => request('PUT', `/users/${id}`, userData)

// vagas
export const getAllJobs = async () => request('GET', '/jobs')
export const getJobById = async (id) => request('GET', `/jobs/${id}`)
export const createJob = async (jobData) => request('POST', '/jobs', jobData)
export const updateJob = async (id, jobData) => request('PUT', `/jobs/${id}`, jobData)
export const deleteJob = async (id) => request('DELETE', `/jobs/${id}`)

// candidaturas
export const createApplication = async (jobId, freelancerId, coverLetter) =>
  request('POST', '/applications', { job_id: jobId, freelancer_id: freelancerId, cover_letter: coverLetter })
export const getApplicationsByJob = async (jobId) => request('GET', `/applications/job/${jobId}`)
export const updateApplicationStatus = async (id, status) =>
  request('PUT', `/applications/${id}`, { application_status: status })

// chats
export const createOrGetChat = async (jobId, companyId, freelancerId) =>
  request('POST', '/chats', { job_id: jobId, company_id: companyId, freelancer_id: freelancerId })
export const getChatsByUser = async (userId) => request('GET', `/chats/user/${userId}`)

// mensagens
export const getMessagesByChat = async (chatId) => request('GET', `/messages/chat/${chatId}`)

export const deleteJob = async (id) => request('DELETE', `/jobs/${id}`)

// vagas da empresa logada (filtra no front pois o backend nao tem endpoint especifico)
export const getJobsByCompany = async (companyId) => {
  const jobs = await getAllJobs()
  return jobs.filter(job => job.company_id === companyId)
}