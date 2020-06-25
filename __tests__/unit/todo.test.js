const { getTask } = require('../../src/todo');

const axios = require('axios');

jest.mock('axios');

test('returns the first task as completed', async () => {
  axios.request.mockResolvedValue({
    data: 
        {
            "task_status": "completed",
            "_id": "1",
            "name": "Scrub Toilet",
            "Created_date": "2018-06-15T12:46:08.494Z",
            "__v": 0
          }
    
  }
);
  const endpoint = { url: '123', id: 1}
  const data = await getTask(endpoint); 
  expect(data._id).toEqual('1'); 
  expect(data.task_status).toEqual('completed'); 
});