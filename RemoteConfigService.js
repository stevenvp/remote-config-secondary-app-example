import firebase from '@react-native-firebase/app';
import remoteConfig from '@react-native-firebase/remote-config';
import {Platform} from 'react-native';

const defaultValue = 'DEFAULT VALUE USED';

class RemoteConfigBaseService {
  // You can switch to the secondary firebase by setting this to true
  // useDev = false -> Primary Firebase app will be used for remote config
  // useDev = true -> Secondary Firebase app will be used for remote config
  useDev = false;

  get appRemoteConfig() {
    const firebaseEnvironment = this.useDev ? 'DEV' : '[DEFAULT]';

    return firebase.app(firebaseEnvironment).remoteConfig();
  }

  async init() {
    try {
      if (!firebase.apps.some(app => app.name === 'DEV')) {
        // Your secondary Firebase project credentials for Android...
        const androidCredentials = {
          clientId:
            '500562642442-c290654k8tikbdqpif85cgfn7pbf0db7.apps.googleusercontent.com',
          appId: '1:500562642442:android:8f26b289d41d3feb19c1f3',
          apiKey: 'AIzaSyAF0PFR85p6hDizr5Xt39FKzER3CFj3wQU',
          databaseURL: '',
          storageBucket: 'remote-project-2.appspot.com',
          messagingSenderId: '500562642442',
          projectId: 'remote-project-2',
        };

        // Your secondary Firebase project credentials for iOS...
        const iosCredentials = {
          clientId:
            '500562642442-lkmv8dit0mjoo131tgds0emo232tbi2u.apps.googleusercontent.com',
          appId: '1:500562642442:ios:38df4666d932f4d819c1f3',
          apiKey: 'AIzaSyCUiBN5sIQ75D7JasqESjsz_er5eoU5aMI',
          databaseURL: '',
          storageBucket: 'remote-project-2.appspot.com',
          messagingSenderId: '500562642442',
          projectId: 'remote-project-2',
        };

        const credentials = Platform.select({
          android: androidCredentials,
          ios: iosCredentials,
        });

        await firebase.initializeApp(credentials, {name: 'DEV'});
      }

      console.log(firebase.apps);

      // necessary to enable the remoteConfig module inside the firebase app
      remoteConfig();

      console.log('REMOTE CONFIG', this.appRemoteConfig.app);

      await this.appRemoteConfig.setConfigSettings({
        minimumFetchIntervalMillis: 60 * 1000,
        fetchTimeMillis: 8 * 1000, // Timeout fetching after 8s
      });

      await this.appRemoteConfig.setDefaults({
        params: defaultValue,
      });

      await this.appRemoteConfig.fetch();
      await this.appRemoteConfig.activate();

      const printStatus = `
          === Remote config initialized ===
          - fetchTimeMillis: ${this.appRemoteConfig.fetchTimeMillis}
          - lastFetchStatus: ${this.appRemoteConfig.lastFetchStatus}
          - settings: ${JSON.stringify(this.appRemoteConfig.settings)}
        `;

      console.log(printStatus);
    } catch (e) {
      console.log('Remote config - Error occurred while initializing ', e);
    }
  }

  /*
   * This will fetch the params with remote config
   * DEFAULT -> DEFAULT VALUE USED
   * PRIMARY APP -> PRIMARY VALUE USED
   * SECONDARY APP -> DEV VALUE USED
   * */
  async getParams() {
    try {
      console.log(this.appRemoteConfig.getAll());

      const params = this.appRemoteConfig.getValue('params').asString();

      console.log('params ', params);

      return params || defaultValue;
    } catch (e) {
      console.log(
        'Remote config - Error occurred while parsing topics from remote config ',
        e,
      );

      return defaultValue;
    }
  }
}

export const RemoteConfigService = new RemoteConfigBaseService();
