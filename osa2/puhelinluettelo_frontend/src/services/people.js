import axios from 'axios'
const baseurl = 'api/persons'

const getAll = () => {
  const req = axios.get(baseurl)
  return req.then(res => res.data)
}

const create = newObject => {
  const request = axios.post(baseurl, newObject)
  return request.then(res => res.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseurl}/${id}`, newObject)
  return request.then(res => res.data)
}

const remove = (id) => {
  const req = axios.delete(`${baseurl}/${id}`)
  return req.then(res => res.data)
}

export default { getAll, create, update, remove }
