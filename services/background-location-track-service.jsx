import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const TASKNAME = "LOCATION-TRACKING-SERVICE";

TaskManager.defineTask(TASKNAME, async ({ data, error }) => {
  if (error) {
    console.error(`Location collection error: ${error.message}`);
    return;
  }
  const { locations } = data;
  if (locations) {
    console.log("Locations =>", locations);
  }
});
export const RegisterLocationTrackService = async () => {
  const isServiceRunning = await CheckLocationTrackService();
  if (isServiceRunning) return;
  try {
    const foregroundPermission =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundPermission.granted) {
      if (!foregroundPermission.granted) return;
      const backgroundPermission =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundPermission.status === "granted") {
        await Location.startLocationUpdatesAsync(TASKNAME, {
          accuracy: Location.Accuracy.BestForNavigation,
          deferredUpdatesInterval: 10000,
          timeInterval: 5000,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: "Expo Issue 28767",
            notificationBody: "This app is watching your location",
            notificationColor: "#fff",
            killServiceOnDestroy: false,
          },
        });
        console.log(
          `${new Date().toISOString()} Location track service registered`
        );
      } else {
        console.log("Unable to register location track services");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
export const UnregisterLocationTrackService = async () => {
  const isServiceRunnint = await CheckLocationTrackService();
  if (!isServiceRunnint) return;
  await Location.stopLocationUpdatesAsync(TASKNAME);
};
export async function CheckLocationTrackService() {
  return await TaskManager.isTaskRegisteredAsync(TASKNAME);
}
