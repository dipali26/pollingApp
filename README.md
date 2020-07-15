Prerequisite:
1. Node js (https://nodejs.org/en/download/)
How to run the application:-
1. Download the project from git hub
   Path: https://github.com/dipali26/pollingApp
2. Extract the project
3. You can run the application locally using the below steps:-
   * Open CMD and run the below command
   * npm install -g http-server
   * npm install -g json-server
   * Open CMD directly in WebContent folder and run the below command to start the server
   * http-server ./ -p 8080
   * Open CMD directly in WebContent folder and run the below command to start the json-server
   * json-server --watch poll.json
4. Open browser and browse http://127.0.0.1:8080 (localhost:8080)

Due to time constraint: 
1. I have used fake api to fetch/store data instead of java and db code implementation.
2. I have used Json-server to fetch poll.json data and store results in the same json.

I have implemented one user can vote multiple times to test the application.
This can be prevented by implementing  user's IP address or Browser Cookies or Session Management feature.
