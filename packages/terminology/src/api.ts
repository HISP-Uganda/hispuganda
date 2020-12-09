import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000
});

export async function searchConcepts(key: string, query: string) {
  let { data } = await api.get('concepts', {
    params: { q: query }
  });
  return data;
}

export async function searchConcept(key: string, { id }) {
  let { data } = await api.get(`concepts/${id}`);
  return data;
}


export async function indexConcept(concept: any) {
  return await api.post('index', concept, { params: { index: 'concepts' } })
}
