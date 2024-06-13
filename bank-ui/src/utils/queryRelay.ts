import { Environment, Network, RecordSource, Store } from 'relay-runtime'
//backend.codeinterviewstep.com
async function fetchQueryGraphql(query: any): Promise<any> {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch('http://backend.codeinterviewstep.com:3000/graphql', {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${localStorage.getItem('token')}`  : ''
      },
      body: JSON.stringify({
        query
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer a solicitação GraphQL');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na solicitação GraphQL:', error);
    throw error;
  }
}

const environment = new Environment({
  network: Network.create(fetchQueryGraphql),
  store: new Store(new RecordSource())
})

export {
  fetchQueryGraphql, environment
}