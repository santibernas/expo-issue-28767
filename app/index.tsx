import { Button, Text, View } from "react-native";
import {
  RegisterLocationTrackService,
  UnregisterLocationTrackService,
} from "../services/background-location-track-service";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ display: "flex" }}>
        <Button
          title="Enable Background Location Track Service"
          onPress={RegisterLocationTrackService}
        />
        <Button
          color={"red"}
          title="Disable Background Location Track Service"
          onPress={UnregisterLocationTrackService}
        />
      </View>
    </View>
  );
}
