const { getTask } = require('../src/todo');

test.skip('REAL API: returns the first task as completed', async () => {

    const endpoint = { url: 'https://5b71e6c7586eb5001463a7a0.mockapi.io', id: 1}
    const data = await getTask(endpoint); 
    expect(data._id).toEqual('1'); 
    expect(data.task_status).toEqual('completed'); 
  });