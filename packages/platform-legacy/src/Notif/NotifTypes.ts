export interface DeviceNotificationSendStatus {
  /**Token for target device*/
  deviceToken?: string;
  /**Endpoint for target device*/
  endpoint?: string;
  /**Whether the message was sent*/
  success?: boolean;
}
export interface NotifiableApplication {
  /**Vendor-specific credential : 'private key' for APNS, 'API key' for GCM*/
  credential: string;
  /**Application name, as registered in your vendor-specific management console*/
  applicationName: string;
  /**Platform type*/
  platform: NotificationPlatform;
  /**Your vendor-specific principal : 'SSL certificate' (PEM format) for APNS, N/A for GCM*/
  principal?: string;
  /**Application primary key, that you choose arbitrarily. If absent, it will default to the value of applicationName*/
  appId?: string;
}
export interface NotifiableDeviceRegistration {
  /**Device-specific and app-specific opaque token. The format and meaning is vendor (Apple, Android...) specific. The value is generated by some vendor API on the device for a particular app and will be used by zetapush for notifications.*/
  deviceToken: string;
  /**Application primary key (as defined in 'createApp')*/
  appId: string;
}
export interface NotificationMessage {
  /**Resource of the target device (optional. if not given, will notify all devices of the user)*/
  resource?: string;
  /**Target user key (as in __userKey)*/
  target: string;
  /**Data to be sent (map or string). Top-level fields to be included in the message. If data is a string, data will be put in the right, vendor-specific, location in the data structure sent to the device.*/
  data?: any;
}
export enum NotificationPlatform {
  /**Apple*/
  APNS = 'APNS',
  /**Apple sandbox*/
  APNS_VOIP_SANDBOX = 'APNS_VOIP_SANDBOX',
  /**Apple VOIP sandbox*/
  APNS_SANDBOX = 'APNS_SANDBOX',
  /**Google Cloud Messaging*/
  GCM = 'GCM'
}
export interface NotificationSendStatus {
  /**List of statuses for each target device*/
  report?: DeviceNotificationSendStatus[];
  /**Source message*/
  message?: NotificationMessage;
}