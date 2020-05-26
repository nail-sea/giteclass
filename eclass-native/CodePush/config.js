import codePush from 'react-native-code-push'

const checkUpdateOptions = {
	/**
   * 检查更新频率
   * Specifies when you would like to synchronize updates with the codePush server.
   * Defaults to codePush.CheckFrequency.ON_APP_START.
   * options:
   * codePush.CheckFrequency.ON_APP_START -
   * codePush.CheckFrequency.ON_APP_RESUME
   * codePush.CheckFrequency.MANUAL
   */
	checkFrequency: codePush.CheckFrequency.ON_APP_START,

	/**
   * 部署key 可以覆盖原生代码中的设置
   * Specifies the deployment key you want to query for an update against.
   * By default, this value is derived from the Info.plist file (iOS) and MainActivity.java file (Android),
   * but this option allows you to override it from the script-side if you need to dynamically use a different deployment for a specific call to sync.
   * @notice 不在js中配置deploymentKey，而是在android和iOS中根据打包配置不同使用不同的key  
   */
	deploymentKey: null,

   /**
    * Specifies when you would like to install optional updates (i.e. those that 
    * aren't marked as mandatory). Defaults to codePush.InstallMode.ON_NEXT_RESTART. 
    * Refer to the InstallMode enum reference for a description of the available options 
    * and what they do.
    */
   installMode:codePush.InstallMode.ON_NEXT_RESTART,

   /**
    * Specifies when you would like to install updates which are marked as mandatory. 
    * Defaults to codePush.InstallMode.IMMEDIATE. Refer to the InstallMode enum reference 
    * for a description of the available options and what they do.
    */
   mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,

   /**
    * Specifies the minimum number of seconds that the app needs to have been in the 
    * background before restarting the app. This property only applies to updates which 
    * are installed using InstallMode.ON_NEXT_RESUME or InstallMode.ON_NEXT_SUSPEND, 
    * and can be useful for getting your update in front of end users sooner, without 
    * being too obtrusive. Defaults to 0, which has the effect of applying the update 
    * immediately after a resume or unless the app suspension is long enough to not 
    * matter, regardless how long it was in the background.
    */
   minimumBackgroundDuration:0,
   
   /**
    * An "options" object used to determine whether a confirmation dialog should be 
    * displayed to the end user when an update is available, and if so, 
    * what strings to use. Defaults to null, which has the effect of disabling the 
    * dialog completely. Setting this to any truthy value will enable the dialog with 
    * the default strings, and passing an object to this parameter allows enabling the 
    * dialog as well as overriding one or more of the default strings.
    */
   /**
    * The following list represents the available options and their defaults:
    * @param appendReleaseDescription (Boolean) - Indicates whether you would like to append the description of an available release to the notification message which is displayed to the end user. Defaults to false.
    * @param descriptionPrefix (String) - Indicates the string you would like to prefix the release description with, if any, when displaying the update notification to the end user. Defaults to " Description: "
    * @param mandatoryContinueButtonLabel (String) - The text to use for the button the end user must press in order to install a mandatory update. Defaults to "Continue".
    * @param mandatoryUpdateMessage (String) - The text used as the body of an update notification, when the update is specified as mandatory. Defaults to "An update is available that must be installed.".
    * @param optionalIgnoreButtonLabel (String) - The text to use for the button the end user can press in order to ignore an optional update that is available. Defaults to "Ignore".
    * @param optionalInstallButtonLabel (String) - The text to use for the button the end user can press in order to install an optional update. Defaults to "Install".
    * @param optionalUpdateMessage (String) - The text used as the body of an update notification, when the update is optional. Defaults to "An update is available. Would you like to install it?".
    * @param title (String) - The text used as the header of an update notification that is displayed to the end user. Defaults to "Update available".
    */
   updateDialog:null,

   /**
    * The rollback retry mechanism allows the application to attempt to reinstall 
    * an update that was previously rolled back (with the restrictions specified 
    * in the options). It is an "options" object used to determine whether a rollback 
    * retry should occur, and if so, what settings to use for the rollback retry. 
    * This defaults to null, which has the effect of disabling the retry mechanism. 
    * Setting this to any truthy value will enable the retry mechanism with the default settings, 
    * and passing an object to this parameter allows enabling the rollback retry as 
    * well as overriding one or more of the default values.
    */
   /**
    * The following list represents the available options and their defaults:
    * @param delayInHours (Number) - Specifies the minimum time in hours that the app will wait after the latest rollback before attempting to reinstall the same rolled-back package. Defaults to 24.
    * @param maxRetryAttempts (Number) - Specifies the maximum number of retry attempts that the app can make before it stops trying. Cannot be less than 1. Defaults to 1.
    */
   rollbackRetryOptions:null
}

export { checkUpdateOptions }
