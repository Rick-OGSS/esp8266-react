export const setupDeviceParameters = {
  "overview": [
    {
      "id": 0,
      "text": "Device Setup introduction goes here"
    }
  ],
  "parameter": [
    {
      "id": 1,
      "type": "bool",
      "question": "Question 1 from setupParameters array... more info here and here and here more info here and here and here",
      "help": "Question 1 help area...  more info here and here and here more info here and here and here",
      "onText": "go",
      "offText": "stop",
      "units": "",
      "min": 0,
      "max": 0,
      "steps": 0,
      "value": true
    },
    
    {
      "id": 3,
      "type": "number",
      "question": "Question 3 from setupParameters array",
      "help": "Question 3 help area",
      "onText": "",
      "offText": "",
      "units": "°C",
      "min": 5,
      "max": 25,
      "steps": 1,
      "value": 12
    },


  ]
};

export default setupDeviceParameters;
