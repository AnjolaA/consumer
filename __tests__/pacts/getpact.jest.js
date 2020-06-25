"use strict";

const { pactWith } = require("jest-pact");
const { Matchers } = require("@pact-foundation/pact");

const { getTask } = require("../../src/todo");

pactWith({ consumer: "MyConsumer", provider: "MyProvider" }, (provider) => {
  describe("GET API", () => {
    const GET_DATA = 
      {
        task_status: "completed",
        _id: "1",
        name: "Scrub Toilet",
        Created_date: "2018-06-15T12:46:08.494Z",
        __v: 0,
      };

    const taskSuccessResponse = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: GET_DATA,
    };

    const aTaskRequest = {
      uponReceiving: "a request for task 1",
      withRequest: {
        method: "GET",
        path: "/tasks/1",
        headers: {
          Accept: "application/json",
        },
      },
    };

    beforeEach(() => {
      const interaction = {
        state: "i have a task",
        ...aTaskRequest,
        willRespondWith: taskSuccessResponse,
      };
      return provider.addInteraction(interaction);
    });

    // add expectations
    it("returns a sucessful body", () => {
      return getTask({
        url: provider.mockService.baseUrl,
        id: 1
      }).then((tasks) => {
        expect(tasks).toEqual(GET_DATA);
      });
    });

    it("play returns a sucessful body", () => {
      return getTask({
        url: provider.mockService.baseUrl,
        id: 1
      }).then((tasks) => {
        expect(tasks).toEqual(GET_DATA);
      });
    });
  });
});
