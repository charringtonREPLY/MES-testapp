import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

/*
---------------------------------------
Define the structure of a User object
---------------------------------------
This tells TypeScript what each user
coming from the API should look like.
*/
type singleMachine = {
  timestamp : string;
  temperature: number;
  machineSpeedRPM: number;
  qualityScore : number;
  vibrationLevel: number;
  energyConsumption: number;
};

/*
---------------------------------------
Define the structure of the API response
---------------------------------------
Our API returns:
{
  users: [...]
}
*/
type ApiResponse = {
  timestamp: singleMachine[];
};

export default function App() {

  /*
  ---------------------------------------
  State Variables
  ---------------------------------------
  users: stores the user list from the API
  loading: indicates if the request is still running
  message: displays API success or failure info
  */
  const [users, setUsers] = useState<singleMachine[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {

    /*
    ---------------------------------------
    Fetch data from the API
    ---------------------------------------
    Replace the URL with your Postman mock URL
    */
    fetch("https://21c3ca59-a04c-44bd-a459-db2081f93c52.mock.pstmn.io/singleMachine")

      .then(async (response) => {

        /*
        ---------------------------------------
        Capture the HTTP status code
        Example:
        200 = success
        404 = not found
        500 = server error
        */
        const statusCode = response.status;

        /*
        Convert response to JSON
        */
        const data: ApiResponse = await response.json();

        /*
        ---------------------------------------
        Handle successful request
        ---------------------------------------
        */
        if (response.ok) {

          setUsers(data.timestamp);

          setMessage(
            `✅ API WORKING\nStatus Code: ${statusCode}\nUsers loaded: ${data.timestamp.length}`
          );

        } else {

          /*
          ---------------------------------------
          Handle HTTP errors
          ---------------------------------------
          */
          setMessage(
            `❌ API ERROR\nStatus Code: ${statusCode}\nServer responded with an error.`
          );

        }

        setLoading(false);

      })

      .catch((error) => {

        /*
        ---------------------------------------
        Handle network errors
        Example:
        - No internet
        - Server unreachable
        - Invalid URL
        ---------------------------------------
        */
        setMessage(
          `🚨 NETWORK ERROR\n${error.message}`
        );

        setLoading(false);
      });

  }, []);

  /*
  ---------------------------------------
  Loading Screen
  ---------------------------------------
  */
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading API...</Text>
      </View>
    );
  }

  /*
  ---------------------------------------
  Main UI
  ---------------------------------------
  */
  return (
    <View style={{ marginTop: 60, padding: 20 }}>

      {/* API status message */}
      <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
        {message}
      </Text>

      {/* Display the users returned from the API */}
      {users.map((timestamp) => (
        <Text key={timestamp.qualityScore}>
            {timestamp.temperature} ({timestamp.vibrationLevel})
        </Text>
      ))}

    </View>
  );
}