export const setupDeviceParameters = {
  "overview": [
    {
      "id": 0,
      "text": "Configure your WiFi network to be either an Access Point (AP) which allows you to connect directly to it with a borwser, or if you already have a local WiFi router you can add it to your local network as an (sta) and access it through your local sub-net."
    }
  ],
  "parameter": [
    {
      "id": 1,
      "type": "bool",
      "question": "Question 1 from configParameters array",
      "help": "Question 1 help area",
      "onText": "go",
      "offText": "stop",
      "lastValue": true
    },
    {
      "id": 2,
      "type": "bool",
      "question": "Question 2 from configParameters array",
      "help": "Question 2 help area",
      "onText": "on",
      "offText": "off",
      "lastValue": true
    },
    {
      "id": 3,
      "type": "string",
      "question": "",
      "help": "",
      "onText": "",
      "offText": "",
      "lastValue": "nothing"
    },
  ]
};

export default setupDeviceParameters;
